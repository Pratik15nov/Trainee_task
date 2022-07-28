import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Dashboard.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { listBody } from "../../utils/helper";
import { headerimgHandle } from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { Link } from "react-router-dom";

export default function App() {
  const [imgdata, setimgData] = useState([]);
  useEffect(() => {
    getImgData();
  });
  const getImgData = async () => {
    const response = await headerimgHandle(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setimgData(response.data?.data?.list);
  };

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
      {imgdata?.map((data) => (
        <SwiperSlide>
          <Link to={`/products?cid=${data.categoryId._id}`}>
            <img className="banner" alt="bg" src={URL + data.Img} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
