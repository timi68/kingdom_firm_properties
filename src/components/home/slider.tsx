/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { slideImages } from "../../../lib/data";

export default function Slider() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      loop={true}
      className="home-slider"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      {slideImages.map((image, index: number) => {
        return (
          <SwiperSlide className="swiper-slide" key={index}>
            <img src={image.url} alt={image.caption} className="swiper-image" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
