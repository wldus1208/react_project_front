// import { useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  // NavItem,
  // NavLink,
  // Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const ImageStyle = () => ({
    width: '100%', 
    height: '500px', 
  });

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid style={{backgroundColor:"white"}}>
        <Row>
        <Col xl="4">
            <Card className="shadow">
                <Row className="align-items-center">
                  <div className="col">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/main/11.jpeg")
                      }
                      style={ImageStyle()}
                    />
                  </div>
                </Row>
              <CardBody>
                <h2 className="mb-0">HAZZYS MEN</h2>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
          <Card className="shadow">
                <Row className="align-items-center">
                  <div className="col">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/main/22.jpeg")
                      }
                      style={ImageStyle()}
                    />
                  </div>
                </Row>
              <CardBody>
                <h2 className="mb-0">DAKS ACC</h2>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
          <Card className="shadow">
                <Row className="align-items-center">
                  <div className="col">
                    <img
                      alt="..."
                      src={
                        require("../assets/img/main/33.jpeg")
                      }
                      style={ImageStyle()}
                    />
                  </div>
                </Row>
              <CardBody>
                <h2 className="mb-0">DAKS GOLF</h2>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
