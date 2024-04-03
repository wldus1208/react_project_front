import { Link, useLocation } from "react-router-dom";
import 'assets/css/AdminNavbar.css';

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const location = useLocation();

  const loginId = sessionStorage.getItem('loginId');
  const name = sessionStorage.getItem('name');

  const logoutClick = () => {
    // 세션에서 로그인 정보 삭제
    sessionStorage.removeItem('loginId');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    window.location.reload();
  };
  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            LF Mall
          </Link>
          <Link 
            className={`h4 mb-0 text-black d-none d-lg-inline-block ml-6 header-link ${location.pathname === '/admin/cate1' ? 'active' : ''}`}
            to="/admin/cate1"
          >
            잡화/슈즈
          </Link >
          <Link 
            className={`h4 mb-0 text-black d-none d-lg-inline-block ml-5 header-link ${location.pathname === '/admin/icons' ? 'active' : ''}`}
            to="/admin/icons"
          >
            의류
          </Link >
          <Form className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
          {loginId ? (
              // 로그인 되어 있을 때 
              <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/theme/team-4-800x800.jpg")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold" style={{color:"black"}}>
                      {name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={logoutClick}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            ) : (
              // 로그인 되어 있지 않을 때 로그인 버튼 표시
              <>
                  <NavItem>
                    <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text" style={{color:"black"}}>Login</span>
                    </NavLink>
                  </NavItem><NavItem>
                    <NavLink
                      className="nav-link-icon"
                      to="/auth/register"
                      tag={Link}
                    >
                      <i className="ni ni-circle-08" />
                      <span className="nav-link-inner--text" style={{color:"black"}}>Register</span>
                    </NavLink>
                  </NavItem>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
