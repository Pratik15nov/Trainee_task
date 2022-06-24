import React from "react";
import "./Dashboard.css";
import { Carousel } from "react-carousel-minimal";
export default function Dashboard() {
  const carousel = [
    {
      image: "https://borobazar.vercel.app/assets/images/hero/banner-4.webp",
    },
    {
      image:
        "https://borobazar.vercel.app/assets/images/bundle/attachment/fruits-juice.png",
    },
  ];
  return (
    <div>
      <Carousel
        data={carousel}
        time={2000}
        width={1500}
        height={550}
        automatic={true}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
      />
      <div>
        <h1 className="t1">What food you love to order</h1>
        <p className="t2">
          Here order your favorite foods from different categories
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card ">
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Ffresh-vegetables.png&w=256&q=100"
                className="cardimg"
                alt="..."
              />
            </div>
            <p className="card-title">Fresh Vegetables</p>
          </div>
          <div className="col ">
            <div className="card ">
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Ffresh-vegetables.png&w=256&q=100"
                className="cardimg"
                alt="..."
              />
            </div>
            <p className="card-title">Fresh Vegetables</p>
          </div>
          <div className="col ">
            <div className="card ">
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Ffresh-vegetables.png&w=256&q=100"
                className="cardimg"
                alt="..."
              />
            </div>
            <p className="card-title">Fresh Vegetables</p>
          </div>
          <div className="col ">
            <div className="card ">
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Ffresh-vegetables.png&w=256&q=100"
                className="cardimg"
                alt="..."
              />
            </div>
            <p className="card-title">Fresh Vegetables</p>
          </div>
          <div className="col ">
            <div className="card ">
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcategory%2Ffresh-vegetables.png&w=256&q=100"
                className="cardimg"
                alt="..."
              />
            </div>
            <p className="card-title">Fresh Vegetables</p>
          </div>
        </div>
      </div>
    </div>
  );
}
