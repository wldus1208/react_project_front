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
  
  const Category = () => {
    const cardsData = [
      { image: "11.jpeg", title: "HAZZYS MEN", style: "style1" },
      { image: "22.jpeg", title: "DAKS ACC", style: "style1"  },
      { image: "33.jpeg", title: "DAKS GOLF", style: "style1"  },
      { image: "33.jpeg", title: "ㅇ러홍러ㅏ홀아ㅓ", style: "style1"  },
      { image: "33.jpeg", title: "fdjgns/fgfmhnfjh56457657", style: "style1"  },
      { image: "33.jpeg", title: "fdjgns/fgfmhnfjh56457657", style: "style1"  },
      { image: "33.jpeg", title: "fdjgns/fgfmhnfjh56457657", style: "style1"  },
      { image: "33.jpeg", title: "fdjgns/fgfmhnfjh56457657", style: "style1"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
      { image: "22.jpeg", title: "DAKS ACC", style: "style2"  },
    ];

    const ImageStyle = () => ({
      width: '100%', 
      height: '375px', 
    });

    const ImageStyle2 = () => ({
      width: '100%', 
      height: '240px', 
    });
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid style={{backgroundColor:"white"}}>
          <Row>
          {cardsData.map((card, index) => (
            <Col key={index} xl={card.style === 'style1' ? "3" : "2"} className="pb-3">
              <Card className="shadow">
                <Row className="align-items-center">
                  <div className="col">
                    <img
                      alt="..."
                      src={require(`../../assets/img/main/${card.image}`)}
                      style={card.style === 'style1' ? ImageStyle() : ImageStyle2()}
                    />
                  </div>
                </Row>
                <CardBody>
                  <h2 className="mb-0">{card.title}</h2>
                </CardBody>
              </Card>
            </Col>
          ))}
          </Row>
        </Container>
      </>
    );
  };
  
  export default Category;
  