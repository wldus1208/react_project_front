import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CateDetail = () => {
    const navigate = useNavigate();

    const ImageStyle = () => ({
        width: '510px', 
        height: '710px', 
      });

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
        console.log("detailId", detailId);
        let params = new URLSearchParams()
        params.append('detailId', detailId)

        axios.post("/product/detail/", params)
          .then(res => {
            console.log(res);
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

    const calculateDiscountedPrice = (price, discountPer) => {
        const discountedPrice = price - (price * (discountPer / 100));
        return discountedPrice.toFixed(0);
    };
  
    const numberCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        console.log("isLiked", isLiked);
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
        }
    };

    // 바로구매
    const buy = () => {
        if(!loginId) {
            navigate("/auth/login")
        }
    };
    
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
                        <span style={{ fontWeight: "bold", marginRight: "10px" }}>{calculateDiscountedPrice(price, discountPer).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </h2>
                    <p className="lead">
                        <spnn><i className="ni ni-air-baloon" /> 최대 {rewardPoints}M 적립예정적립예정</spnn>
                        <hr />
                        <span><i className="ni ni-spaceship" /> 지금 결제 시 오늘 출발<br />무료배송 / CJ 대한통운<br /><span style={{color:"red"}}>04/06(토)</span>이내 도착확률 98%<br />전국 평균 기준</span>
                        <hr />
                        <spnn><i className="ni ni-credit-card" /> LFmall 신용카드 결제시 5% 추가할인</spnn> <br/>
                        <spnn><i className="ni ni-credit-card" /> LFPay KB국민카드 최대 9,000원 즉시할인                                                                                                                                                                                                         / 카드별 무이자</spnn>
                    </p>
                    <hr />
                    <div>
                        <p>수량</p>
                        <div>
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={cart}>장바구니</button>
                        <button onClick={buy}>바로구매</button>
                    </div>
                </div>
            </div>

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
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