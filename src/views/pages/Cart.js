import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { calculateDiscountedPrice, numberCommas } from 'components/commonUtils';

const Cart = () => {
    const loginId = sessionStorage.getItem('loginId');
    const [detailId, setDetailId] = useState("");
    const [Data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [productPrice, setProductPrice] = useState(0);
    const [disPrice, setDisPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [selectedAmount, setSelectedAmount] = useState();

    useEffect(() => {

        list();
    }, []);

    const list = () => {
        axios.post("/cart/list/")
          .then(res => {
            // console.log(res.data.cart);
            setData(res.data.cart)
            // const amounts = res.data.cart.map(item => item.amount);
            // console.log(amounts);
            // selectedAmount(amounts)
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

    const SelectChange = (detailId, index) => (e) => {
        const { value } = e.target;

        const newData = [...Data];
        newData[index].amount = value;
        setData(newData);

        // setSelectedAmount(value);
    };

    const amountChange = (detailId) => {
        // console.log("Detail ID:" , detailId);
        const selectElement = document.getElementById(`numberSelect-${detailId}`);
        const selectedValue = selectElement.value;
        // console.log("Selected value for",detailId, ":", selectedValue);

        let params = new URLSearchParams()
        params.append('loginId', loginId)
        params.append('detailId', detailId)
        params.append('amount', selectedValue)

        axios.post("/cart/update/", params)
          .then(res => {
            console.log(res.data);
            alert("수량이 변경되었습니다.")
            window.location.reload();
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const del = (detailId) => {
        setShowModal(true);
        setDetailId(detailId);
    };

    const close = () => {
        setShowModal(false);
    };

    const yes = () => {
        // console.log(detailId);
        let params = new URLSearchParams()
        params.append('loginId', loginId);
        params.append('detailId', detailId);

        axios.post("/cart/delete/", params)
          .then(res => {
            console.log(res.data);
            window.location.reload();
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const checkChange = (event) => {
        const { name, checked } = event.target;

        // 전체 선택
        if (name === 'selectAll') {
            console.log("selectAll");
            console.log("checked", checked);
            setSelectAll(checked);
            const updatedCheckedItems = {};
            Data.forEach((data) => {
                updatedCheckedItems[data.detailId] = checked;
            });
            setCheckedItems(updatedCheckedItems);
            calculatePrice(updatedCheckedItems);
        } else {
            console.log("selected");
            console.log("checked", checked);

            setCheckedItems(() => ({
                [name]: checked
            }));
            calculatePrice({checkedItems, [name]: checked });
        }
    };

    const calculatePrice = (items) => {
    //     const [disPrice, setDisPrice] = useState(0);
    // const [deliveryFee, setDeliveryFee] = useState(0);
    // const [totalPrice, setTotalPrice] = useState(0);
        console.log("items", items);
        let produt = 0;
        let dis = 0;
        let delivery = 0;
        let total = 0;

        Data.forEach((data) => {
            if (items[data.detailId]) {
                produt += data.price * data.amount;
                dis += data.price - calculateDiscountedPrice(data.price * data.amount, data.discountPer)
            }
        });
        total = (produt - dis) + delivery;
        setProductPrice(produt);
        setDisPrice(dis);
        setDeliveryFee(delivery);
        setTotalPrice(total);
    };

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
                    
                            <table className="table" style={{tableLayout:"fixed", width:"100%"}}>
                                <colgroup>
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "45%" }} />
                                    <col style={{ width: "15%" }} />
                                    <col style={{ width: "5%" }} />
                                </colgroup>
                                <thead>
                                    <tr style={{textAlign:"center"}}>
                                        <th><input type="checkbox" name="selectAll" checked={selectAll} onChange={checkChange} /></th>
                                        <th colSpan="2">상품정보</th>
                                        <th>상품금액</th>
                                        <th>배송비</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {Data.map((data, index) => (
                                <tbody key={index}>
                                <tr>
                                    <td><input type="checkbox" name={`checkbox${index}`} checked={checkedItems[data.detailId]} onChange={checkChange} /></td>
                                    <td>
                                        <img
                                            alt="..."
                                            src={require(`../../assets/img/product/${data.img}`)}
                                            style={ImageStyle()}
                                        />
                                    </td>
                                    <td>
                                        <p>{data.brand}</p>
                                        <p style={ellipsisStyle()}>{data.detailName}</p>
                                        <p>{data.amount}개</p>
                                        <select
                                            value={data.amount}
                                            id={`numberSelect-${data.detailId}`}
                                            style={{ width: "95px", height: "30px" }}
                                            onChange={SelectChange(data.detailId, index)}
                                        >
                                            <option value="">선택</option>
                                            {Array.from({length: 20}, (_, index) => index + 1).map(num => (
                                            <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                        <button type="button" className="btn btn-sm btn-secondary" style={{width:"65px"}} onClick={() => amountChange(data.detailId)}>수량변경</button>
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
                                    <td rowSpan="2" style={{textAlign:"center"}}>무료</td>
                                    <td>
                                        <button type="button" className="btn btn-sm btn-dark mt-2" style={{width:"80px"}}>바로구매</button><br />
                                        <button type="button" className="btn btn-sm btn-secondary" style={{width:"80px"}} onClick={() => del(data.detailId)}>삭제</button>
                                    </td>
                                </tr>
                                </tbody>
                                ))}
                                <tfoot style={{backgroundColor:"#e0e0e0", textAlign:"center"}}>
                                    <tr>
                                        <td colSpan="6" style={{fontSize:"18px"}}>
                                        상품금액 <span>{numberCommas(productPrice)}원</span> - 할인금액 <span>{numberCommas(disPrice)}</span> + 배송비 <span>{numberCommas(deliveryFee)}</span> = 결제금액 <span style={{ color:"red", fontWeight:"bold" }}>{numberCommas(totalPrice)}원</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                    
                    </div>
                </div>
                {showModal && (
                <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none'}} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-3 shadow" style={{width:"400px", height:"150px", backgroundColor:"#e0e0e0"}}>
                            <div className="modal-body p-4 text-center">
                                <p className="mb-0">선택하신 상품을 삭제하시겠습니까?</p>
                            </div>
                            <div className="modal-footer flex-nowrap p-0">
                                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={yes}><strong>예</strong></button>
                                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" onClick={close}>아니요</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <div className="col-md-4 mt-6" style={{border: "1px solid black", height: "315px", fontSize:"16px"}}>
                    <div className="position-sticky">
                        <div className="p-3">
                            <span style={{ float: "left" }}>상품금액 (0)</span>
                            <span style={{ float: "right" }}>{numberCommas(productPrice)}원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>상품 할인 금액</span>
                            <span style={{ float: "right" }}>{numberCommas(disPrice)}원</span>
                        </div>
                        <div className="p-3">
                            <span style={{ float: "left" }}>배송비</span>
                            <span style={{ float: "right" }}>{numberCommas(deliveryFee)}원</span>
                        </div>
                        <div className="p-3">
                            <hr className="mt-2"/>
                            <span style={{ float: "left", fontWeight:"bold" }}>결제예정금액</span>
                            <span style={{ float: "right", color:"red", fontWeight:"bold" }}>{numberCommas(totalPrice)}원</span>
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
