// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import React, { useState } from 'react'
import axios from 'axios'
import Session from 'react-session-api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  
  const SignUpClick = () => {
    navigate('/auth/register');
  };

  const [account, setAccount] = useState({
    lgnId: '',
    pwd: '',
  })
  //const [loginId, setLoginId] = useState('')
  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    })
  }
  // 로그인 하기
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      Signin()
    }
  }

  const Signin = async () => {
    Session.set('loginId', '')
    Session.set('loginName', '')

    let params = new URLSearchParams()
    params.append('loginId', account.lgnId)
    params.append('loginPw', account.pwd)
    await axios
      .post('/login.do', params)
      .then((res) => {
        if (res.data.result === 'SUCCESS') {
          alert(res.data.resultMsg)
          Session.set('loginId', res.data.loginId)
          Session.set('name', res.data.name)
          sessionStorage.setItem('loginId', res.data.loginId)
          sessionStorage.setItem('name', res.data.name)
          sessionStorage.setItem('email', res.data.email)

          navigate("/")
          document.location.href = '/'
          // window.location.href = '/';
        } else {
          alert(res.data.resultMsg)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <h1 className="text-center">Sign in</h1>
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-4">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="ID"
                    type="text"
                    id=''
                    name='lgnId'
                    onChange={onChangeAccount}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    id=''
                    name='pwd'
                    onChange={onChangeAccount}
                    onKeyDown={onKeyDown}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={Signin}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={SignUpClick}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
