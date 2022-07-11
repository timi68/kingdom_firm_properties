/* eslint-disable @next/next/no-img-element */
import React from "react";
import SwiperCore, {
  FreeMode,
  Navigation,
  Swiper as SwiperType,
  Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { slideImages } from "../../../lib/data";

const SwiperContainer: React.FC = (): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType>();
  SwiperCore.use([FreeMode, Navigation, Thumbs]);
  return (
    <React.Fragment>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        thumbs={{
          // @ts-ignore
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {slideImages.map((image, i) => {
          return (
            <SwiperSlide className="swiper-slide" key={i}>
              <img
                src={image.url}
                alt={image.caption}
                className="swiper-image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slideImages.map((image, i) => {
          return (
            <SwiperSlide className="swiper-slide" key={i}>
              <img
                src={image.url}
                alt={image.caption}
                className="swiper-image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </React.Fragment>
  );
};

export default SwiperContainer;
