const OrderList = () => {
    return (
        <div className="container marketing">
            <main className="container">
                <div className="row">
                    <div>
                        <h2 className="pb-3 mb-3 mt-2 border-bottom">
                            주문/배송 내역
                        </h2>
                        <span>주문번호를 클릭하시면 주문상세내역을 확인할 수 있습니다.</span>
                    </div>
                    <div>
                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-primary" type="button">Button</button>
                            <button class="btn btn-primary" type="button">Button</button>
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