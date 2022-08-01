import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Categories.css";
import { listBody, URL } from "../../utils/helper";
import { categoryHndlerData } from "../../service/auth.service";
import { Autoplay, Pagination, Navigation } from "swiper";
import Skeleton from "@mui/material/Skeleton";

export default function Categories() {
  const [categoriesData, setcategoriesData] = useState([]);

  useEffect(() => {
    getcategoryData();
  }, []);

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response);
  };

  return (
    <div>
      {categoriesData.length === 0 && (
        <Skeleton
          variant="rectangular"
          width={2000}
          height={500}
          animation="wave"
        />
      )}
      {categoriesData.length > 0 && (
        <div>
          <h1 className="header_one">What food you love to order</h1>
          <p className="header_two">
            Here order your favorite foods from different categories
          </p>

          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
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
            {categoriesData?.map((card) => {
                return (
                  <SwiperSlide key={card.id}>
                    <div className="cimg-container">
                      <p className="categories-img">
                        <img
                          src={URL + card.categoryImg.replace(/(^\^)|,/g, "/")}
                          className="cimg"
                          alt="categories"
                        />
                      </p>
                      <p className="categories-text">{card.categoryName}</p>
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
      )}
    </div>
  );
}
