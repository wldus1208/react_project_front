"use client";
import React, { useEffect } from "react";

const Payment = (effect, deps) => {
    useEffect(() => {
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
    
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp82567468"); 
    const data = {
      pg: 'kakaopay', // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`,  
      name: '결제 테스트', // 주문명 (필수항목)
      amount: 1, // 금액 (필수항목) 
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181",
    };
    IMP.request_pay(data, callback);
  }
    
    const callback = (response) => {
      const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;
      if (success) {
        alert('결제 성공');
      } else {
        alert(`결제 실패 : ${error_msg}`);
      }
    }
    
    return (
      <>
        <div className="container marketing">
        <br />
        <div className="row border-top" style={{marginTop: "60px"}}>
        </div>
        <main className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className=""> 
                    <button onClick={onClickPayment}>결제 하기</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
      </>
     );
  }

export default Payment;