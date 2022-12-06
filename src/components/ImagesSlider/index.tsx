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

  function getFile(file: string) {
    return file.includes('.stl')
      ? 'https://spassodourado.com.br/wp-content/uploads/2015/01/default-placeholder.png'
      : file;
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
              <Image maxHeight={500} maxWidth={600} src={getFile(imageItem)} />
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
            <Image src={getFile(imageItem)} cursor="pointer" />
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </Box>
  );
}
