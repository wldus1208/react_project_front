import { ButtonToggle } from 'reactstrap';
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { numberCommas } from 'components/commonUtils';

const OrderList = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
    const [startDate, setStartDate] = useState(oneMonthAgo.toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(today.toISOString().slice(0, 10));
    const loginId = sessionStorage.getItem('loginId');
    const [Data, setData] = useState([]);
    const [listType, setListType] = useState('month');
    const [cnt, setCnt] = useState(0);

    useEffect(() => { 
        orderlist();
    }, []);

    const [buttonStates, setButtonStates] = useState({
        month: true,
        tmonth: false,
        smonth: false,
        year: false
    });

    const buttonClick = (type) => {
        setListType(type);
        // console.log(listType);
        const today = new Date();
        if(type === 'month') {  
            const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
            setStartDate(oneMonthAgo.toISOString().slice(0, 10));
        } else if(type === 'tmonth') {
            const threeMonthAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate() + 1);
            setStartDate(threeMonthAgo.toISOString().slice(0, 10));
        } else if(type === 'smonth') {
            const sixMonthAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate() + 1);
            setStartDate(sixMonthAgo.toISOString().slice(0, 10));
        } else if(type === 'year') {
            const oneYesrAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1);
            setStartDate(oneYesrAgo.toISOString().slice(0, 10));
        } 

        setButtonStates((prevButtonStates) => ({
          ...Object.fromEntries(
            Object.entries(prevButtonStates).map(([key]) => [key, key === type])
          )
        }));
    };

    const orderlist = () => {
        // console.log(listType);
        let params = new URLSearchParams()
        params.append('loginId', loginId)
        params.append('type', listType)
        params.append('startDate', startDate)
        params.append('endDate', endDate)

        axios.post("/order/orderlist/", params)
          .then(res => {
            console.log(res.data);
            setData(res.data.orderlist);
            setCnt(res.data.orderlist.length);
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const read = () => {
        orderlist();
    };

    return (
        <div className="container marketing">
            <main className="container">
                <div className="row">
                    <div>
                        <h2 className="pb-3 mb-3 mt-2 border-bottom">
                            주문/배송 내역
                        </h2>
                        <span>주문번호를 클릭하시면 주문상세내역을 확인할 수 있습니다.</span>
                        <div className="d-grid gap-2 d-md-block mt-3">
                            <ButtonToggle
                                type="button"
                                className={buttonStates.month ? 'btn btn-sm btn-outline-dark' : 'btn btn-sm'}
                                checked={buttonStates.month}
                                onClick={() => buttonClick('month')}
                                >
                                1개월
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.tmonth ? 'btn btn-sm btn-outline-dark' : 'btn btn-sm'}
                                checked={buttonStates.tmonth}
                                onClick={() => buttonClick('tmonth')}
                                >
                                3개월
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.smonth ? 'btn btn-sm btn-outline-dark' : 'btn btn-sm'}
                                checked={buttonStates.smonth}
                                onClick={() => buttonClick('smonth')}
                                >
                                6개월
                            </ButtonToggle>
                            <ButtonToggle
                                type="button"
                                className={buttonStates.year ? 'btn btn-sm btn-outline-dark' : 'btn btn-sm'}
                                checked={buttonStates.year}
                                onClick={() => buttonClick('year')}
                                >
                                1년
                            </ButtonToggle>
                            <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} className='ml-7'></input> ~ 
                            <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
                            <button type="button" className="btn btn-dark btn-sm ml-2" onClick={read}>조회</button>
                        </div>
                    </div>
                    <div className="mt-4 border-top">
                        <table className="table" style={{tableLayout:"fixed", width:"100%"}}>
                            <colgroup>
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "35%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "10%" }} />
                            </colgroup>
                            <thead>
                                <tr style={{textAlign:"center"}}>
                                    <th>일자/주문번호</th>
                                    <th colSpan='2'>주문상품정보</th>
                                    <th>결제금액</th>
                                    <th>진행상태</th> 
                                    <th>비고</th> 
                                </tr>
                            </thead>
                            {cnt === 0 ? (
                            <tbody style={{ textAlign: "center", height: "500px" }}>
                                <tr>
                                    <td colSpan="6" style={{ fontSize: "18px" }}>
                                        상품이 없습니다.
                                    </td>
                                </tr>
                            </tbody>
                            ):(
                                <>
                                    {Data.map((data, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td style={{textAlign:"center"}}>
                                                <p>{data.paymentDt}</p>
                                                <p>{data.orderId}</p>
                                            </td>
                                            <td style={{textAlign:"center"}}>
                                                <img
                                                    alt="..."
                                                    src={require(`../../assets/img/product/${data.img}`)}
                                                    style={{width: "90px", height: "100px"}}
                                                />
                                            </td>
                                            <td>
                                                <p>{data.brand}</p>
                                                <p>{data.detailName}</p>
                                            </td>
                                            <td style={{textAlign:"center"}}>
                                                <p>{numberCommas(data.totPayment)}원</p>
                                            </td>
                                            <td style={{textAlign:"center"}}>
                                                <p>{data.status}</p>
                                            </td>
                                            <td style={{textAlign:"center"}}></td>
                                        </tr>
                                    </tbody>
                                    ))}
                                </>
                            )}
                            
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderList;