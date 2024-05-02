import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

const Info = () => {
    const navigate = useNavigate();
    const loginId = sessionStorage.getItem('loginId');
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [addDetail, setAddDetail] = useState('');
    const [zip, setZip] = useState('');
    const [show, setShow] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(true);

    useEffect(() => { 
        info();
    }, []);



    const onChangePwd = (e) => {
        setPwd(e.target.value);
    }

    const info = () => {
        let params = new URLSearchParams()
        params.append('loginId', loginId)

        axios.post("/info", params)
          .then(res => {
            console.log(res.data);
            if (res.data.resultMsg === 'SUCCESS') {
                setName(res.data.result.name);
                setPwd(res.data.result.loginpw);
                setPhone(res.data.result.phone);
                setEmail(res.data.result.email);
                setBirth(res.data.result.birth);
                setAddress(res.data.result.address);
                setAddDetail(res.data.result.addDetail);
                setZip(res.data.result.zip);
            }
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    const handleComplete = (data) => {
        // console.log(data);
        setZip(data.zonecode);
        setAddress(data.address);
        // setAddressModalOpen(false);
        setShow(false);
    };

    return (
        <div className="container marketing">
            <main className="container">
                <div className="row">
                    <div>
                        <h2 className="pb-3 mb-3 mt-2 border-bottom">
                            회원정보 변경
                        </h2>
                    </div>
                    <div className="mt-2">
                        <table className="table" style={{tableLayout:"fixed", width:"100%"}}>
                            <colgroup>
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "70%" }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>이름<span style={{color:"red"}}>*</span></td>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>아이디<span style={{color:"red"}}>*</span></td>
                                    <td>{loginId}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>비밀번호<span style={{color:"red"}}>*</span></td>
                                    <td>{pwd}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>휴대전화<span style={{color:"red"}}>*</span></td>
                                    <td>{phone}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>이메일(선택)</td>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>생년월일<span style={{color:"red"}}>*</span></td>
                                    <td>{birth}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>주소(선택)</td>
                                    <td>
                                        <input type='text' style={{ width: "90px", backgroundColor: "#f0f0f0" }} value={zip} readOnly/>
                                        <button type='button' className='btn btn-sm border ml-1' style={{ width: "90px" }} onClick={() => setShow(true)}>우편번호 찾기</button> <br />
                                        <input type='text' style={{ width: "300px", backgroundColor: "#f0f0f0" }} value={address} readOnly/> <br />
                                        <input type='text' className='mt-1' style={{ width: "300px" }} placeholder='상세주소를 입력해주세요' name='addDetail' />
                                        {show && (
                                            <div>
                                            {isAddressModalOpen && <DaumPostcode onComplete={handleComplete} />}
                                            </div>
                                        )}
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>생년월일<span style={{color:"red"}}>*</span></td>
                                    <td>{birth}</td>
                                </tr>
                            </tbody>     
                        </table>
                        <button type="button" style={{width:"150px"}} className="btn btn-danger mt-2 mb-3" onClick={info}>회원정보 변경</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Info;