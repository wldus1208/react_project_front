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
                <SwiperSlide>
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/banner/1.jpg")
                    }
                  />
                  </SwiperSlide>
                <SwiperSlide><img
                    alt="..."
                    src={
                      require("../../assets/img/banner/2.jpg")
                    }
                  /></SwiperSlide>
                <SwiperSlide><img
                    alt="..."
                    src={
                      require("../../assets/img/banner/3.jpg")
                    }
                  /></SwiperSlide>
                <SwiperSlide><img
                    alt="..."
                    src={
                      require("../../assets/img/banner/4.jpg")
                    }
                  /></SwiperSlide>
                <SwiperSlide><img
                    alt="..."
                    src={
                      require("../../assets/img/banner/5.jpg")
                    }
                  /></SwiperSlide>
                <SwiperSlide><img
                    alt="..."
                    src={
                      require("../../assets/img/banner/6.jpg")
                    }
                  /></SwiperSlide>
              </Swiper>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
