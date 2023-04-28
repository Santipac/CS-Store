import Image from "next/image";
import React from "react";
import slideimage1 from "../../../public/slider1.jpg";
import slideimage2 from "../../../public/slider2.jpg";
export const Carousel = () => {
  return (
    <div className="carousel h-96 w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <Image src={slideimage1} className="rounded-lg object-cover" alt="sd" />
        <div className="absolute left-5 right-5 top-1/2 flex transform justify-between">
          <a
            href="#slide4"
            className="btn-circle btn border-gold bg-opacity-40"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn-circle btn border-gold bg-opacity-40"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <Image
          src={slideimage2}
          className=" rounded-lg object-cover"
          alt="sd"
        />
        <div className="absolute left-5 right-5 top-1/2 flex transform justify-between">
          <a
            href="#slide1"
            className="btn-circle btn border-gold bg-opacity-40"
          >
            ❮
          </a>
        </div>
      </div>
    </div>
  );
};
