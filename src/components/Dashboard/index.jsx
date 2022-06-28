import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Dashboard.css";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="banner"
            alt="bg"
            src={
              "/images/banner1.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="banner"
            alt="bg"
            src={
              "/images/banner2.jpg"
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="banner"
            alt="bg"
            src={
              "/images/banner3.jpg"
            }
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}