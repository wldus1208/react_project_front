import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'assets/css/style.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Header = () => {
  const location = useLocation();
  const [bannerImages, setBannerImages] = useState([]);
  const [activeClass, setActiveClass] = useState('');

  useEffect(() => {
    if (location.pathname === '/admin/cate1') {
      setBannerImages([
        { img: "cate1.jpeg" },
        { img: "cate2.jpeg" },
        { img: "cate3.jpeg" },
        { img: "cate4.jpeg" },
        { img: "cate5.jpeg" },
        { img: "cate6.jpeg" },
      ]);
      setActiveClass('active');
    } else {
      setBannerImages([
        {img: "1.jpg"},
        {img: "2.jpg"},
        {img: "3.jpg"},
        {img: "4.jpg"},
        {img: "5.jpg"},
        {img: "6.jpg"}
      ]);
      setActiveClass('');
    }
  }, [location.pathname]);

  return (
    <>
      <div className="header bg-gradient-white pb-8 pt-5 pt-md-6">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row className="row">
              <Swiper
                loop={true}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper2"
              >
                {bannerImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      alt="..."
                      src={require(`../../assets/img/banner/${image.img}`)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
