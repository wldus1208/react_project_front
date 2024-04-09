import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { calculateDiscountedPrice, numberCommas } from 'components/commonUtils';

const CateDetail = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [dynamicText, setDynamicText] = useState("");

    const ImageStyle = () => ({
        width: '530px', 
        height: '710px', 
    });

    const ImageStyle2 = () => ({
        width: '78px', 
        height: '100px', 
    });

    const [isVisible, setIsVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsSelected(!isSelected);
    };

    const loginId = sessionStorage.getItem('loginId');
    const { detailId } = useParams();
    const [isLiked, setIsLiked] = useState(false);

    const [brand, setBrand] = useState("");
    const [img, setImg] = useState("");
    const [detailName, setDetailName] = useState("");
    const [discountPer, setDiscountPer] = useState("");
    const [price, setPrice] = useState("");
    const [rewardPoints, setRewardPoints] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // console.log("detailId", detailId);
        let params = new URLSearchParams()
        params.append('detailId', detailId)

        axios.post("/product/detail/", params)
          .then(res => {
            // console.log(res);
            setBrand(res.data.result.brand);
            setImg(res.data.result.img);
            setDetailName(res.data.result.detailName)
            setDiscountPer(res.data.result.discountPer)
            setPrice(res.data.result.price)

            const calculatedRewardPoints = Math.min(calculateDiscountedPrice(price,discountPer) * 0.01, 10000).toFixed(0);
            setRewardPoints(calculatedRewardPoints);
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    });

    const discountedPrice = calculateDiscountedPrice(price, discountPer).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const discountedPrice2 = calculateDiscountedPrice(price, discountPer);

    const totalPrice = (discountedPrice2 * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const toggleLike = () => {
        setIsLiked(!isLiked);
        // console.log("isLiked", isLiked);
        // axios.post('/like', { liked: !isLiked })
        // .then(response => {
        //     console.log(response.data); 
        // })
        // .catch(error => {
        //     console.error('There has been a problem with your axios operation:', error);
        // });
    };

    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(4);

    const handleChange = (event) => {
        setComment(event.target.value);
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setReviews([...reviews, comment]);
        setComment('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          handleSubmit(event);
        }
    };

    const handleLoadMore = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
    };

    // 수량 증가
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // 수량 감소
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    // 장바구니
    const cart = () => {
        if(!loginId) {
            navigate("/auth/login")
        } else if(isSelected) {
            let params = new URLSearchParams()
            params.append('loginId', loginId)
            params.append('detailId', detailId)
            params.append('amount', quantity)

            axios.post("/cart/insert/", params)
            .then(res => {
                console.log(res);
                if(res.data.resultMsg === "SUCCESS") {
                    setDynamicText("상품을 쇼핑백에 담았습니다.");
                    setShowModal(true);
                } else if(res.data.resultMsg === "DUP") {
                    setDynamicText("쇼핑백에 이미 해당 제품이 있습니다.");
                    setShowModal(true);
                }
            })
            .catch(error => {
                console.error('Error fetching store name:', error);
            });
        } else {
            alert("수량을 선택하세요.");
        }
    };

    // 바로구매
    const buy = () => {
        if(!loginId) {
            navigate("/auth/login")
        }
    };

    const close = () => {
        setShowModal(false);
    }

    const cartGo = () => {
        navigate("/admin/cart")
    }
    
    return (
        <div className="container marketing">
            <br />
            <div className="row" style={{marginTop: "50px"}}>
                <button type="button" className="btn" onClick={toggleLike}>
                    {isLiked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                        </svg>
                    )}
                </button>
            </div>
            <hr className="featurette-divider" />
            <div className="row featurette">
                <div className="col-md-6">
                    {img ? <img
                      alt="..."
                      src={require(`../../assets/img/product/${img}`)}
                      style={ImageStyle()}
                    /> : ""}
                </div>
                <div className="col-md-6">
                    <h3 className="featurette-heading fw-normal lh-1">{brand}</h3>
                    <h1 className="featurette-heading fw-normal lh-1">{detailName}</h1>
                    <h2 className="featurette-heading fw-normal lh-1">
                        <span style={{ color:"red",marginRight: "10px" }}>{discountPer}%</span>
                        <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>{numberCommas(price)}</span>
                        <span style={{ fontWeight: "bold", marginRight: "10px" }}>{discountedPrice}</span>
                    </h2>
                    <p className="lead">
                        <span><i className="ni ni-air-baloon" /> 최대 {rewardPoints}M 적립예정적립예정</span>
                        <hr />
                        <span><i className="ni ni-spaceship" /> 지금 결제 시 오늘 출발<br />무료배송 / CJ 대한통운<br /><span style={{color:"red"}}>04/06(토)</span>이내 도착확률 98%<br />전국 평균 기준</span>
                        <hr />
                        <span><i className="ni ni-credit-card" /> LFmall 신용카드 결제시 5% 추가할인</span> <br/>
                        <span><i className="ni ni-credit-card" /> LFPay KB국민카드 최대 9,000원 즉시할인</span> 
                        {/* <spnn><i className="ni ni-credit-card" /> LFPay KB국민카드 최대 9,000원 즉시할인                                                                                                                                                                                                         / 카드별 무이자</spnn> */}
                    </p>
                    <hr />
                    <div>
                        <p>수량</p>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" className="btn btn-outline-primary" onClick={decreaseQuantity}><i className='ni ni-fat-delete'></i></button>
                            <span className="btn btn-outline-primary disabled" style={{width:"60px"}}>{quantity}</span>
                            <button type="button" className="btn btn-outline-primary" onClick={increaseQuantity}><i className='ni ni-fat-add'></i></button>
                        </div>
                        <button type="button" className="btn btn-outline-primary btn-sm" style={{marginLeft: "15px"}} onClick={toggleVisibility}>선택</button>
                    </div>
                    {isVisible && (
                    <div>
                        <div className='d-flex mt-4 px-3 py-3 bg-light'>
                            {img && (
                                <div>
                                    <img
                                        alt="..."
                                        src={require(`../../assets/img/product/${img}`)}
                                        style={ImageStyle2()}
                                    />
                                </div>
                            )}
                            <div>
                                <div style={{width:"430px", textAlign:"right", fontSize:"15px"}}>
                                    <i className='ni ni-fat-remove' onClick={toggleVisibility}></i>
                                </div>
                                <p className="fw-normal lh-1 px-3">{detailName}</p>
                                <div className="d-flex flex-column px-3" style={{width:"35%"}}>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                        <button type="button" className="btn btn-outline-primary" onClick={decreaseQuantity}><i className='ni ni-fat-delete'></i></button>
                                        <span className="btn btn-outline-primary disabled" style={{width:"60px"}}>{quantity}</span>
                                        <button type="button" className="btn btn-outline-primary" onClick={increaseQuantity}><i className='ni ni-fat-add'></i></button>
                                    </div>
                                </div>
                                <div style={{fontSize:"15px", fontWeight:"bold", textAlign: "right"}}>
                                    <span>{totalPrice}원</span>
                                </div>
                            </div>
                        </div>
                        <div className='py-4' style={{textAlign:"right" }}>
                            <span className='py-2' style={{ marginRight: "10px" }}>
                                <span style={{fontSize:"20px"}}>총 상품금액</span>
                                <span style={{fontSize:"25px", color:"red", fontWeight:"bold"}} className='px-2'>{totalPrice}원</span>
                            </span>
                        </div>
                    </div>
                    )}
                    <div className='mt-3'>
                        <button type="button" style={{width:"250px"}} className="btn btn-outline-danger btn-lg" onClick={cart}>쇼핑백</button>
                        <button type="button" style={{width:"250px"}} className="btn btn-danger btn-lg" onClick={buy}>바로구매</button>
                    </div>
                </div>
            </div>
            {showModal && (
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none'}} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow " style={{width:"380px", height:"250px", backgroundColor:"#e0e0e0"}}>
                        <div className="modal-header border-bottom-0">
                            <h1 className="modal-title fs-5">쇼핑백</h1>
                            <button type="button" className="ni ni-fat-remove" onClick={close}></button>
                        </div>
                        <div className="modal-body py-0" style={{textAlign:"center"}}>
                            <p>{dynamicText}</p>
                            <p style={{fontWeight:"bold"}}>쇼핑백으로 가시겠습니까?</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-center border-top-0">
                            <button type="button" className="btn btn-lg btn-secondary" style={{width:"120px"}} onClick={cartGo}>쇼핑백 가기</button>
                            <button type="button" className="btn btn-lg btn-dark" style={{width:"120px"}} onClick={close}>쇼핑 계속하기</button>
                        </div>
                    </div>
                </div>
            </div>
            )}
            <hr className="featurette-divider" />

            <div className="row g-3">
                <div className="col-md-10">
                    <label htmlFor="comment" className="form-label">Reviw</label>
                    <textarea
                    className="form-control"
                    id="comment"
                    rows="1"
                    value={comment}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                    ></textarea>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                    </button>
                </div>

                <div className="mt-4">
                    <ul className="list-group list-group-flush">
                    {reviews.slice(0, visibleReviews).map((review, index) => (
                        <li key={index} className="list-group-item" style={{ marginBottom: '10px' }}>{review}</li>
                    ))}
                    </ul>   

                    {visibleReviews < reviews.length && (
                        <button className="btn btn-outline-primary mt-3" onClick={handleLoadMore}>
                        Load More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CateDetail;