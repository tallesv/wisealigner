/* eslint-disable import/no-unresolved */
import { Box, Image } from '@chakra-ui/react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import Swiper, { FreeMode, Navigation, Thumbs } from 'swiper';
import { useState } from 'react';

interface ImagesSliderProps {
  images: string[];
}

export function ImagesSlider({ images }: ImagesSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper>();
  const [imageActiveInSlideUrl, setImageActiveInSlideUrl] = useState(images[0]);

  function setActualThumb(thumb: Swiper) {
    setThumbsSwiper(thumb);
  }

  return (
    <Box>
      <SwiperComponent
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onRealIndexChange={swiper =>
          setImageActiveInSlideUrl(images[swiper.realIndex])
        }
      >
        {images.map(imageItem => (
          <SwiperSlide key={imageItem}>
            <a
              href={imageActiveInSlideUrl}
              target="_blank"
              download
              rel="noreferrer"
            >
              <Image maxHeight={500} maxWidth={600} src={imageItem} />
            </a>
          </SwiperSlide>
        ))}
      </SwiperComponent>
      <SwiperComponent
        onSwiper={swiper => setActualThumb(swiper)}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map(imageItem => (
          <SwiperSlide key={imageItem}>
            <Image src={imageItem} cursor="pointer" />
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </Box>
  );
}
