import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { calculateDiscountedPrice, numberCommas } from 'components/commonUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToRecentlyViewed } from '../../redux/actions';

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginId = sessionStorage.getItem('loginId');
    const [isVisible, setIsVisible] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [count, setCount] = useState(0);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [detailId, setDetailId] = useState("");
    const [Data, setData] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [disPrice, setDisPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        list();
    }, []);

    const list = () => {
        axios.post("/cart/list/")
          .then(res => {
            // console.log(res.data.cart);
            setData(res.data.cart)
            // const calculatedRewardPoints = Math.min(calculateDiscountedPrice(price,discountPer) * 0.01, 10000).toFixed(0);
            // setRewardPoints(calculatedRewardPoints);
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const ImageStyle = () => ({
        width: '90px', 
        height: '114px', 
    });

    const ellipsisStyle = () => ({
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '13px'
    });    

    const order = () => {
        // console.log("productPrice", productPrice);
        if(productPrice === 0) {
            alert("주문하실 상품을 선택해주세요");
            return false;
        } else {
            alert("주문!!!");
        }
    };

    const addToRecentlyViewedProducts = (product) => {
        dispatch(addToRecentlyViewed(product));
    };
    

    const detail = (detailId, product) => {
        // console.log("detailId", detailId);
        // console.log("product", product);
        
        addToRecentlyViewedProducts(product);
        navigate(`/admin/productdetail/${detailId}`)
    };

    const buttonClick = (type) => {
        setPaymentType(type);
        setIsVisible(true);
    };


  return (
    <div className="container marketing">
        <br />
        <div className="row border-top" style={{marginTop: "60px"}}>
        </div>
        <main className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="pb-3 mb-3 mt-2">
                        주문서
                    </h2>
                    <div className=""> 
                        <span style={{fontSize:"18px"}}>주문상품({count})</span>
                        <span className='text-danger fs-5 ml-2'>최대 할인 가격이 적용되어 있습니다.</span>
                    </div>
                    <div className="mt-4 border-top">
                        <table className="table" style={{tableLayout:"fixed", width:"100%"}}>
                            <colgroup>
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "45%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "10%" }} />
                            </colgroup>
                            <thead>
                                <tr style={{textAlign:"center"}}>
                                    <th colSpan="2">상품정보</th>
                                    <th>상품금액</th>
                                    <th>쿠폰할인</th>
                                    <th>배송비</th> 
                                </tr>
                            </thead>
                            {Data.map((data, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <img
                                            alt="..."
                                            src={require(`../../assets/img/product/${data.img}`)}
                                            style={ImageStyle()}
                                        />
                                    </td>
                                    <td>
                                        <p>{data.brand}</p>
                                        <p style={ellipsisStyle()} onClick={() => detail(data.detailId, data)}>{data.detailName}</p>
                                        <p>{data.amount}개</p>
                                    </td>
                                    <td style={{textAlign:"center"}}>
                                        <p style={{ textDecoration: "line-through", color: "gray" }}>{numberCommas(data.price * data.amount)}</p>
                                        <p style={{ fontWeight: "bold" }}>
                                            {numberCommas(calculateDiscountedPrice(data.price * data.amount, data.discountPer))}
                                        </p>
                                        <p style={{ fontSize:"10px" }}>
                                            {numberCommas(Math.min(calculateDiscountedPrice(data.price * data.amount, data.discountPer) * 0.01, 10000).toFixed(0))}M 적립예정
                                        </p>
                                    </td>
                                    <td>fdghfgj</td>
                                    <td rowSpan="2" style={{textAlign:"center"}}>무료</td>
                                </tr>
                            </tbody>
                            ))}
                        </table>
                    </div>
                    <div className="mt-3"> 
                        <span style={{fontSize:"18px"}}>배송정보</span><br />
                        <button type='button' className='btn btn-sm btn-light'>직접입력</button>
                    </div>
                    <div className="mt-4 border-top">
                        <table className="table border-bottom" style={{tableLayout:"fixed", width:"100%"}}>
                            <colgroup>
                                <col style={{ width: "15%" }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>받는 분</td>
                                    <td>
                                        <input type='text' placeholder='받는 분의 이름을 입력해주세요' style={{width:"200px"}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>연락처</td>
                                    <td>
                                        <input type='text' maxLength="4" style={{width:"150px"}}/> - 
                                        <input type='text' maxLength="4" style={{width:"150px"}}/> - 
                                        <input type='text' maxLength="4" style={{width:"150px"}}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>주소</td>
                                    <td>
                                        <input type='text' style={{width:"90px"}}/>
                                        <button type='button' className='btn btn-sm border ml-1' style={{width:"90px"}}>우편번호 찾기</button> <br />
                                        <input type='text' style={{width:"300px"}}/> <br />
                                        <input type='text' className='mt-1' style={{width:"300px"}} placeholder='상세주소를 입력해주세요'/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>배송장소</td>
                                    <td>
                                        <select style={{ width: "300px" }}>
                                            <option value="">배송 장소를 선택해주세요(선택)</option>
                                            <option value="">직접 받고 부재 시 문 앞에 놓아주세요</option>
                                            <option value="">문 앞에 놓아주세요</option>
                                            <option value="">경비실에 맡겨주세요</option>
                                            <option value="">택배함에 넣어주세요</option>
                                            <option value="">직접 입력하기</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <span>발송처가 다를 경우, 빨리 준비된 상품부터 배송될 수 있습니다.</span> <br />
                        <span style={{fontSize:"16px"}}><input type='checkbox' style={{width:"20px", height:"20px"}} className='mt-1'/> 기본 배송지로 저장</span>
                    </div>
                    <div className="mt-5 border-bottom"> 
                        <span style={{fontSize:"18px"}}>결제수단</span><br />
                    </div>
                    <div className="mt-3">
                        <span style={{fontSize:"16px"}}><input type='radio' checked style={{width:"20px", height:"20px"}} /> 일반결제</span><br />
                        <div className='mt-2'>
                            <button type="button" className="btn btn-outline-dark" onClick={() => buttonClick('creditCard')}>
                                신용카드
                            </button>
                            <button type="button" className="btn btn-outline-dark" onClick={() => buttonClick('bankTransfer')}>
                                계좌이체
                            </button>
                            <button type="button" className="btn btn-outline-warning" onClick={() => buttonClick('kakaoPay')}>
                                카카오페이
                            </button>
                            <button type="button" className="btn btn-outline-success" onClick={() => buttonClick('naverPay')}>
                                네이버페이
                            </button>
                            <button type="button" className="btn btn-outline-primary" onClick={() => buttonClick('toss')}>
                                Toss
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => buttonClick('payco')}>
                                PAYCO
                            </button>
                        </div>
                        {isVisible && (
                        <div className='mt-2'>
                            {paymentType === 'creditCard' && (
                                <div>
                                    신용카드
                                </div>
                            )}
                            {paymentType === 'bankTransfer' && (
                                <div></div>
                            )}
                            {paymentType === 'kakaoPay' && (
                                <div>
                                    <p>카카오톡에 신용/체크 카드, 카카오머니를 등록한 후 비밀번호 및 지문인증만으로 결제할 수 있습니다.</p>
                                </div>
                            )}
                            {paymentType === 'naverPay' && (
                                <div>
                                    <p>네이버페이는 네이버ID로 신용카드 또는 은행계좌 정보를 등록하여 결제할 수 있는 간편결제 서비스입니다.</p>
                                    <p>주문 변경 시 카드사 혜택 및 할부 적용 여부는 해당 카드사 정책에 따라 변경될 수 있습니다.</p>
                                    <p>지원 가능 결제수단 : 네이버페이 결제창 내 노출되는 모든 카드/계좌</p>
                                </div>
                            )}
                            {paymentType === 'toss' && (
                                <div>
                                    <p>토스에 신용/체크카드, 토스머니를 등록한 후 비밀번호 및 생체 인증으로 결제할 수 있습니다.</p>
                                </div>
                            )}
                            {paymentType === 'payco' && (
                                <div>
                                    <p>별도의 앱 설치 없이 신용카드를 등록한 후, 비밀번호만으로 결제할 수 있습니다.</p>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                </div>
                <div className="col-md-4 mt-6" style={{border: "1px solid black", height: "330px", fontSize:"16px"}}>
                    <div className="position-sticky">
                        <div className="p-3">
                            <span style={{ float: "left", fontWeight:"bold" }}>적립혜택</span>
                            <span style={{ float: "right", fontWeight:"bold" }}>{numberCommas(rewardPoints)}M</span>
                        </div>  
                        <div className="p-3">
                            <span style={{ float: "left" }}>상품합계 ({count})</span>
                            <span style={{ float: "right" }}>{numberCommas(productPrice)}원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>할인 합계 ()</span>
                            <span style={{ float: "right" }}>{numberCommas(disPrice)}원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>배송비</span>
                            <span style={{ float: "right" }}>{numberCommas(deliveryFee)}원</span>
                        </div>
                        <div className="p-3">
                            <hr className="mt-2"/>
                            <span style={{ float: "left", fontWeight:"bold" }}>총 결제금액</span>
                            <span style={{ float: "right", color:"red", fontWeight:"bold" }}>{numberCommas(totalPrice)}원</span>
                        </div>
                    </div>
                    <button type="button" style={{width:"100%"}} className="btn btn-danger btn-lg mt-3" onClick={order}>결제하기</button>
                    <div style={{backgroundColor: "#e0e0e0"}}>
                        <span>결제대행서비스 약관 모두 동의</span> <br />
                        <span>구매조건 확인 및 개인정보 수집/이용 동의</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Order;
  
