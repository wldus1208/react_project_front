"use client";
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { calculateDiscountedPrice, numberCommas } from 'components/commonUtils';
import { useNavigate, useParams } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { ButtonToggle } from 'reactstrap';

const Order = () => {
    const navigate = useNavigate();
    const { detailId } = useParams();
    const loginId = sessionStorage.getItem('loginId');
    const email = sessionStorage.getItem('email');
    const name = sessionStorage.getItem('name');
    const [isVisible, setIsVisible] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [count, setCount] = useState(0);
    const [rewardPoints, setRewardPoints] = useState(0);
    const [Data, setData] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [disPer, setDisPer] = useState(0);
    const [disPrice, setDisPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [isAddressModalOpen, setAddressModalOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [showCustomLocationInput, setShowCustomLocationInput] = useState(false);
    const [cardType, setCardType] = useState('');

    const [buttonStates, setButtonStates] = useState({
        uplus: false,
        bankTransfer: false,
        kakaopay: false,
        naverPay: false,
        toss: false,
        payco: false,
    });

    // 배송정보
    const [delivery, setDelivery] = useState({
        name: '',
        tel1: '',
        tel2: '',
        tel3: '',
        addDetail: ''
    })

    useEffect(() => {
        list();
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
          document.head.removeChild(jquery); document.head.removeChild(iamport);
        }
      }, []);

    const list = () => {
        // console.log(detailId);

        let params = new URLSearchParams()
        params.append('detailId', detailId)

        axios.post("/order/list/", params)
          .then(res => {
            // console.log(res.data);
            setData(res.data.order);

            let cnt = res.data.order.length;
            setCount(cnt);
            // console.log(res.data.order.length);
            calculatePrice(res.data.order);
            
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const ImageStyle = () => ({
        width: '90px', 
        height: '114px', 
    });

    const buttonStyle = (card) => ({
        backgroundImage: `url(${require(`../../assets/img/card/${card.img}`)})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        width: '100px', 
        height: '80px', 
        marginTop: "5px"
    });

    const ellipsisStyle = () => ({
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '13px'
    });   
    
    const buttonClick = (type) => {
        setPaymentType(type);
        setIsVisible(true);

        setButtonStates((prevButtonStates) => ({
          ...Object.fromEntries(
            Object.entries(prevButtonStates).map(([key]) => [key, key === type])
          )
        }));
      };

    const card = [
        {img: "kb.jpeg", company: "kb"},
        {img: "shin.png", company: "shin"},
        {img: "lotte.png", company: "lotte"},
        {img: "hyun.png", company: "hyun"},
        {img: "sam.png", company: "sam"},
        {img: "nh.png", company: "nh"},
        {img: "hana.png", company: "hana"},
        {img: "wo.png", company: "wo"},
        {img: "kakao.jpeg", company: "kakao"},
        {img: "etc.png", company: "etc"}
    ];

    const handleComplete = (data) => {
        // console.log(data);
        setPostalCode(data.zonecode);
        setAddress(data.address);
        // setAddressModalOpen(false);
        setShow(false);
    };

    const calculatePrice = (Data) => {
        console.log(Data);
        let product = 0;
        let dis = 0;
        let delivery = 0;
        let total = 0;
        let totaldis = 0;
        let point = 0;

        Object.values(Data).forEach((data) => {
            if (data) {
                product += data.price * data.amount;
                dis += data.price - calculateDiscountedPrice(data.price * data.amount, data.discountPer);
                
            }
        });
        
        total = (product - dis) + delivery;
        totaldis = ((product - total) / product * 100).toFixed(0);
        point += Math.min(calculateDiscountedPrice(product, totaldis) * 0.01, 10000).toFixed(0);

        setRewardPoints(parseInt(point)); // 적립금
        setProductPrice(product); // 상품금액
        setDisPrice(dis); // 할인금액
        setDeliveryFee(delivery); // 배송비
        setTotalPrice(total); // 결제금액
        setDisPer(totaldis); // 할인율
    };

    const payment = () => {
        // console.log(paymentType);
        const phone = delivery.tel1 + "-" + delivery.tel2 + "-" + delivery.tel3;
        if(check()){
            const { IMP } = window;
            IMP.init("imp82567468"); 
            const data = {
            pg: paymentType, // PG사 (필수항목)
            pay_method: 'card', // 결제수단 (필수항목)
            merchant_uid: `mid_${new Date().getTime()}`,  
            name: '결제 테스트', // 주문명 (필수항목)
            amount: totalPrice, // 금액 (필수항목) 
            custom_data: { name: '부가정보', desc: '세부 부가정보' },
            buyer_email: email,
            buyer_name: name,
            buyer_tel: phone,
            buyer_addr: address + " " + delivery.addDetail,
            buyer_postcode: postalCode,
            };
            IMP.request_pay(data, callback);
        }
    };

    const callback = (response) => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
        if (success) {
            const phone = delivery.tel1 + "-" + delivery.tel2 + "-" + delivery.tel3;
            let params = new URLSearchParams()
            params.append('loginId', loginId)
            params.append('detailId', detailId)
            params.append('paymentMethod', paymentType)
            params.append('creaditInfo', cardType)
            params.append('status', "주문")
            params.append('phone', phone)
            params.append('address', address)
            params.append('addDetail', delivery.addDetail)
            params.append('zip', postalCode)
            params.append('location', deliveryOption)
            params.append('totPayment', totalPrice)

            const amountString = Data.map(data => data.amount).join(',');
            // console.log(amountString);
            params.append('amount', amountString)

            axios.post("/order/insert/", params)
            .then(res => {
                console.log(res);
                if(res.data.resultMsg === "SUCCESS") {
                    console.log(res);
                } 
            })
            .catch(error => {
                console.error('Error fetching store name:', error);
            });
            alert('결제 성공');
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    }

    const check = () => {
        if(delivery.name === "") {
            alert("이름을 입력해 주세요.");
            return false;
        }
        if(delivery.addDetail === "") {
            alert("주소를 입력해 주세요.");
            return false;
        }
        return true;
    };

    const onChangeDelivery = (e) => {
        setDelivery({
          ...delivery,
          [e.target.name]: e.target.value,
        })
    }

    const handleDeliveryOptionChange = (e) => {
        const selectedOption = e.target.value;
        setDeliveryOption(selectedOption);
      
        if (selectedOption === "직접 입력") {
          setShowCustomLocationInput(true); 
          setDeliveryOption(customLocation)
        } else {
          setShowCustomLocationInput(false);
        }
    };

    const cardClick = (com) => {
        setCardType(com);
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
                                        <input type='hidden' value={data.cartId}></input>
                                        <p>{data.brand}</p>
                                        <p style={ellipsisStyle()}>{data.detailName}</p>
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
                                        <input type='text' placeholder='받는 분의 이름을 입력해주세요' name='name' style={{width:"200px"}} onChange={onChangeDelivery}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>연락처</td>
                                    <td>
                                        <input type='text' maxLength="4" style={{width:"150px"}} name='tel1' onChange={onChangeDelivery} /> - 
                                        <input type='text' maxLength="4" style={{width:"150px"}} name='tel2' onChange={onChangeDelivery} /> - 
                                        <input type='text' maxLength="4" style={{width:"150px"}} name='tel3' onChange={onChangeDelivery} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>주소</td>
                                    <td>
                                        <input type='text' style={{ width: "90px", backgroundColor: "#f0f0f0" }} value={postalCode} readOnly/>
                                        <button type='button' className='btn btn-sm border ml-1' style={{ width: "90px" }} onClick={() => setShow(true)}>우편번호 찾기</button> <br />
                                        <input type='text' style={{ width: "300px", backgroundColor: "#f0f0f0" }} value={address} readOnly/> <br />
                                        <input type='text' className='mt-1' style={{ width: "300px" }} placeholder='상세주소를 입력해주세요' name='addDetail' onChange={onChangeDelivery}/>
                                        {show && (
                                            <div>
                                            {isAddressModalOpen && <DaumPostcode onComplete={handleComplete} />}
                                            </div>
                                        )}
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>배송장소</td>
                                    <td>
                                    <select
                                        style={{ width: "300px" }}
                                        value={deliveryOption}
                                        onChange={handleDeliveryOptionChange}
                                        >
                                        <option value="">배송 장소를 선택해주세요(선택)</option>
                                        <option value="직접 받기">직접 받고 부재 시 문 앞에 놓아주세요</option>
                                        <option value="문 앞">문 앞에 놓아주세요</option>
                                        <option value="경비실">경비실에 맡겨주세요</option>
                                        <option value="택배함">택배함에 넣어주세요</option>
                                        <option value="직접 입력">직접 입력하기</option>
                                    </select> <br />
                                    {showCustomLocationInput && (
                                    <input
                                        type="text"
                                        placeholder="배송 장소를 입력해주세요"
                                        value={customLocation}
                                        onChange={(e) => setCustomLocation(e.target.value)}
                                        style={{ marginTop: "10px", width: "300px" }}
                                    />
                                    )}
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
                        <span style={{fontSize:"16px"}}><input type='radio' defaultChecked style={{width:"20px", height:"20px"}} /> 일반결제</span><br />
                        <div className='mt-2'> 
                            <ButtonToggle
                                type="button"
                                className={buttonStates.uplus ? 'btn btn-dark' : 'btn btn-outline-dark'}
                                checked={buttonStates.uplus}
                                onClick={() => buttonClick('uplus')}
                                >
                                신용카드
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.bankTransfer ? 'btn btn-dark' : 'btn btn-outline-dark'}
                                checked={buttonStates.bankTransfer}
                                onClick={() => buttonClick('bankTransfer')}
                                >
                                계좌이체
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.kakaopay ? 'btn btn-warning' : 'btn btn-outline-warning'}
                                checked={buttonStates.kakaopay}
                                onClick={() => buttonClick('kakaopay')}
                                >
                                카카오페이
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.naverPay ? 'btn btn-success' : 'btn btn-outline-success'}
                                checked={buttonStates.naverPay}
                                onClick={() => buttonClick('naverPay')}
                                >
                                네이버페이
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.toss ? 'btn btn-info' : 'btn btn-outline-info'}
                                checked={buttonStates.toss}
                                onClick={() => buttonClick('toss')}
                                >
                                Toss
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.payco ? 'btn btn-danger' : 'btn btn-outline-danger'}
                                checked={buttonStates.payco}
                                onClick={() => buttonClick('payco')}
                                >
                                PAYCO
                            </ButtonToggle>
                        </div>
                        {isVisible && (
                        <div className='mt-2'>
                            {paymentType === 'uplus' && (
                                <div >
                                    {card.map((card, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-light" 
                                                style={buttonStyle(card)}
                                                onClick={() => cardClick(card.company)}
                                            >
                                            </button>
                                            {index % 5 === 4 && <br />}
                                        </React.Fragment>
                                    );
                                    })}
                                </div>
                            )}
                            {paymentType === 'bankTransfer' && (
                                <div></div>
                            )}
                            {paymentType === 'kakaopay' && (
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
                            <span style={{ float: "left" }}>할인 합계 ({disPer}%)</span>
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
                    <button type="button" style={{width:"100%"}} className="btn btn-danger btn-lg mt-3" onClick={payment}>결제하기</button>
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
  
