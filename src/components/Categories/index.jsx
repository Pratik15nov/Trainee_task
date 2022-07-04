import { React } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Categories.css";
import { CategoriesData } from "../../Data/CategoriesData.js";
import { Autoplay, Pagination, Navigation } from "swiper";
export default function Categories() {
  return (
    <div>
      <h1 className="header_one">What food you love to order</h1>
      <p className="header_two">
        Here order your favorite foods from different categories
      </p>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper swip"
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
      >
        {CategoriesData.map((card, id) => {
          return (
            <SwiperSlide key={card.id}>
              <div className="cimg-container" key={id}>
                <p className="categories-img">
                  <img src={card.img} className="cimg" alt="categories" />
                </p>
                <p className="categories-text">{card.cname}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div>
        <img
          src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-7.png&w=1920&q=100"
          className="img-fluid"
          alt="bg"
        />
      </div>
    </div>
  );
}
