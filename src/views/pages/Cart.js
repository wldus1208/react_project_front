import React, { useState, useEffect  } from 'react';
import axios from 'axios';

const Cart = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        let params = new URLSearchParams()

        axios.post("/cart/list/", params)
          .then(res => {
            // console.log(res);
            setData(res.data.cart)
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    });
    const ImageStyle = () => ({
        width: '90px', 
        height: '114px', 
      });

  return (
    <div className="container marketing">
        <br />
        <div className="row" style={{marginTop: "60px"}}>
        </div>
        <main className="container">
            <div className="row">
                <div className="col-md-8">
                    <h3 className="pb-4 mb-4 border-bottom">
                        쇼핑백
                    </h3>
                    <div className=""> 
                        <button type="button" className="btn btn-sm btn-secondary" style={{width:"70px", height:"40px"}}>전체선택</button>
                        <button type="button" className="btn btn-sm btn-secondary" style={{width:"70px", height:"40px"}}>선택삭제</button>
                    </div>
                    <div className="mt-4 border-top">
                    {Data.map((data, index) => (
                        <table key={index} className="table">
                        <thead>
                            <tr>
                                <th><input type="checkbox"></input></th>
                                <th colSpan="2">상품정보</th>
                                <th></th>
                                <th>상품금액</th>
                                <th>배송비</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input type="checkbox"></input></td>
                            <td>
                                <img
                                    alt="..."
                                    src={require(`../../assets/img/product/${data.img}`)}
                                    style={ImageStyle()}
                                />
                            </td>
                            <td>
                                <p>{data.brand}</p>
                                <p>{data.detailName}</p>
                                <p>{data.amount}개</p>
                                <select defaultValue="" id="numberSelect">
                                    <option value="">선택</option>
                                    {Array.from({length: 20}, (_, index) => index + 1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                                <button type='button'>수량변경</button>
                            </td>
                            <td>10</td>
                            <td rowSpan="2">무료</td>
                            <td>
                                <button type="button" className="btn btn-sm btn-dark mt-2" style={{width:"80px"}}>구매하기</button><br />
                                <button type="button" className="btn btn-sm btn-secondary" style={{width:"80px"}}>삭제</button>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot style={{backgroundColor:"#e0e0e0", textAlign:"center"}}>
                            <tr>
                                <td colSpan="6">
                                상품금액 <span>0원</span> - 할인금액 <span>0원</span> + 배송비 <span>0원</span> = 결제금액 <span>0원</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    ))}
                    </div>
                </div>
                <div className="col-md-4 mt-6" style={{border: "1px solid black", height: "315px", fontSize:"16px"}}>
                    <div className="position-sticky">
                        <div className="p-3">
                            <span style={{ float: "left" }}>상품금액 (0)</span>
                            <span style={{ float: "right" }}>0원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>상품 할인 금액</span>
                            <span style={{ float: "right" }}>0원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>배송비</span>
                            <span style={{ float: "right" }}>0원</span>
                        </div>
                        <div className="p-3">
                            <hr className="mt-2"/>
                            <span style={{ float: "left", fontWeight:"bold" }}>결제예정금액</span>
                            <span style={{ float: "right", color:"red", fontWeight:"bold" }}>0원</span>
                        </div>
                        <div className="mt-4 p-1" style={{textAlign:"center", backgroundColor: "#e0e0e0"}}>
                            <p>상품을 선택하시면 최적 혜택이 계산됩니다.</p>
                        </div>
                    </div>
                    <button type="button" style={{width:"100%"}} className="btn btn-danger btn-lg mt-3">주문하기</button>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Cart;
