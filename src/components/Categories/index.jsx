import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Categories.css";
import { Pagination } from "swiper";
import { CategoriesData } from "../../Data/CategoriesData.js";
export default function Categories() {
    
  return (
    <div>
     <h1 className="header_one">What food you love to order</h1>
        <p className="header_two">
          Here order your favorite foods from different categories
        </p>

      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          120: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          440: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 50,
          },

          1300: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {CategoriesData.map((card, id) => {
          return (
            <SwiperSlide>
              <div className="">
                <div className="cimgcontainer" key={id}>
                  <p className="cimgtext">
                    <img src={card.img} className="cimg" alt="categories" />
                  </p>
                  <p className="cimgtext">{card.cname}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <img className="ads"
            
          alt="categories"
          src={
            "https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-7.png&w=1920&q=100"
          }
        />
      </div>
    </div>
  );
}
