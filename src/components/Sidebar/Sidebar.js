import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

const Sidebar = () => {

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <Collapse navbar>
        <h2 className="navbar-heading" style={{fontSize:"30px"}}>MYPAGE</h2>
        <h6 className="navbar-heading text-muted mt-2">쇼핑내역</h6>
          <Nav className="mb-md-1" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" to="/mypage/orderlist" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>주문/배송내역</span>
              </NavLink>
            </NavItem>
          </Nav>
          <hr className="my-1" />
          <h6 className="navbar-heading text-muted">나의활동</h6>
          <Nav className="mb-md-1" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>상품리뷰</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>위시리스트</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>이벤트/체험단 참여 내역</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>1:1 상담</span>
              </NavLink>
            </NavItem>
          </Nav>
          <hr className="my-1" />
          <h6 className="navbar-heading text-muted mt-4">회원정보</h6>
          <Nav className="mb-md-1" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>회원등급</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="/mypage/confirm" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>회원정보 변경</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>배송지 관리</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>회원 탈퇴</span>
              </NavLink>
            </NavItem>
          </Nav>
          <hr className="my-1" />
          <Nav className="mb-md-1" navbar>
            <NavItem>
              <NavLink className="nav-link-icon" to="" tag={Link}>
                <span className="nav-link-inner--text" style={{color:"black"}}>FAQ</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
