import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToRecentlyViewed } from '../../redux/actions';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
      list();
    }, []);

    const addToRecentlyViewedProducts = (product) => {
      console.log("product", product);
      dispatch(addToRecentlyViewed(product));
    };

    const detail = (detailId, product) => {
      // console.log("detailId", detailId);
      // console.log("product", product);
      
      addToRecentlyViewedProducts(product);
      navigate(`/admin/productdetail/${detailId}`)
    };

    const list = () => {
      axios
        .get('/product/list')
        .then((res) => {
          // console.log(res.data);
          setCardsData(res.data.product);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
        })
    };

    const ImageStyle = () => ({
      width: '100%', 
      height: '375px', 
    });

    const ImageStyle2 = () => ({
      width: '100%', 
      height: '240px', 
    });

    const ellipsisStyle = () => ({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });

    // 가격 계산하는 함수
    const calculateDiscountedPrice = (price, discountPer) => {
      const discountedPrice = price - (price * (discountPer / 100));
      return discountedPrice.toFixed(0);
    };

    const numberCommas = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid style={{backgroundColor:"white"}}>
          <Row>
          {cardsData.map((card, index) => (
            <Col key={index} xl={index < 8 ? "3" : "2"} className="pb-3">
              <Card className="shadow">
                <Row className="align-items-center">
                  <div className="col" onClick={() => detail(card.detailId, card)}>
                    <img
                      alt="..."
                      src={require(`../../assets/img/product/${card.img}`)}
                      style={index < 8 ? ImageStyle() : ImageStyle2()}
                    />
                    {index < 8 && (
                      <div style={{ position: "absolute", top: 0, left: 20, color: "black", fontSize: "30px", padding: "5px", fontWeight: "bold" }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                </Row>
                <CardBody>
                  <h3 className="mb-0">{card.brand}</h3>
                  <h3 className="mb-0" style={ellipsisStyle()}>{card.detailName}</h3>
                  <h4 className="mb-0">
                    <span style={{ color:"red",marginRight: "10px" }}>{card.discountPer}%</span>
                    <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>{numberCommas(card.price)}</span>
                    <span style={{ fontWeight: "bold", marginRight: "10px" }}>{calculateDiscountedPrice(card.price, card.discountPer).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </h4>
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
  