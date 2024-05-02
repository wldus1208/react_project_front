import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    const loginId = sessionStorage.getItem('loginId');

    const [pwd, setPwd] = useState('');
    const onChangePwd = (e) => {
        setPwd(e.target.value);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            pwdConfirm();
        }
    }

    const pwdConfirm = () => {
        console.log(pwd);
        let params = new URLSearchParams()
        params.append('loginId', loginId)
        params.append('loginPw', pwd)

        axios.post("/login.do", params)
          .then(res => {
            // console.log(res.data);
            if (res.data.result === 'SUCCESS') {
                navigate("/mypage/info");
            }
          })
          .catch(error => {
              console.error('Error fetching store name:', error);
          });
    };

    return (
        <div className="container marketing" style={{height:"600px"}}>
            <main className="container">
                <div className="row">
                    <div>
                        <h2 className="pb-3 mb-3 mt-2 border-bottom">
                            회원정보 변경
                        </h2>
                    </div>
                    <div className="mt-2">
                    <span>비밀번호를 다시 한번 확인해주세요.</span>
                        <table className="table" style={{tableLayout:"fixed", width:"100%"}}>
                            <colgroup>
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "70%" }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>아이디</td>
                                    <td>{loginId}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor:"#f0f0f0"}}>비밀번호</td>
                                    <td><input type='password' 
                                            style={{width:"150px"}}
                                            onChange={onChangePwd}
                                            onKeyDown={onKeyDown}/>
                                    </td>
                                </tr>
                            </tbody>     
                        </table>
                        <button type="button" style={{width:"150px",}} className="btn btn-danger mt-3" onClick={pwdConfirm}>확인</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Confirm;