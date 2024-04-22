// reactstrap components
import { Container } from "reactstrap";

const UserHeader = () => {
  const loginId = sessionStorage.getItem('loginId');
  const name = sessionStorage.getItem('name');

  const ImageStyle = () => ({
    width: '150px', 
    height: '150px', 
  });

  return (
    <>
      <div
        className="header pb-4 pt-2 pt-lg-6 ml-4 "
      >
        {/* Header container */}
        <Container  fluid>
          <div className="row mt-4 ml-4">
              <div className="mt-2 col-md-4">
              {loginId === "admin" ? (
                <img
                alt="..."
                src={require("../../assets/img/user/admin.png")}
                style={ImageStyle()}
                />
              ):(
                <img
                alt="..."
                src={require("../../assets/img/user/default.png")}
                style={ImageStyle()}
                />
              )}
              </div>
              <div className="col-md-2 mt-5">
                <p style={{fontWeight:"bold"}}>{name}</p>
                <p>등급</p>
              </div>
              <div className="col-md-2 mt-5">
                <p>적립금</p>
                <p>0</p>
              </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
