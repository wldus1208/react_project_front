import { ButtonToggle } from 'reactstrap';
import React, { useState, useEffect  } from 'react';

const OrderList = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        
        const today = new Date();
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
        setEndDate(today.toISOString().slice(0, 10));
    
        setStartDate(oneMonthAgo.toISOString().slice(0, 10));
    }, []);

    const [buttonStates, setButtonStates] = useState({
        month: true,
        tmonth: false,
        smonth: false,
        year: false
    });

    const buttonClick = (type) => {
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
                            <button type="button" className="btn btn-dark btn-sm ml-2">조회</button>
                        </div>
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
                                    <th>일자/주문번호</th>
                                    <th>주문상품정보</th>
                                    <th>결제금액</th>
                                    <th>진행상태</th> 
                                    <th>비고</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img
                                            alt="..."
                                            src={require('../../assets/img/product/AABA4F901BK_00.jpg')}
                                            style={{width: "90px", height: "100px"}}
                                        />
                                    </td>
                                    <td>
                                        <p>ㅗ하롸리</p>
                                        <p>호ㅓㅗ허ㅘㅓ</p>
                                        <p>개</p>
                                    </td>
                                    <td style={{textAlign:"center"}}>
                                        <p style={{ textDecoration: "line-through", color: "gray" }}></p>
                                        <p style={{ fontWeight: "bold" }}>
                                            
                                        </p>
                                        <p style={{ fontSize:"10px" }}>
                                            
                                        </p>
                                    </td>
                                    <td>fdghfgj</td>
                                    <td rowSpan="2" style={{textAlign:"center"}}>무료</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderList;