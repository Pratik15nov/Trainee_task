import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Dashboard.css";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <Swiper
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
      className="mySwiper"
    >
      <SwiperSlide>
        <img className="banner" alt="bg" src={"/images/banner1.jpg"} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="banner" alt="bg" src={"/images/banner2.jpg"} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="banner" alt="bg" src={"/images/banner3.jpg"} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="banner" alt="bg" src={"/images/banner4.jpg"} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="banner" alt="bg" src={"/images/banner5.jpg"} />
      </SwiperSlide>
    </Swiper>
  );
}
