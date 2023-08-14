<template>
  <div class="h-96 w-full ">
      <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="false"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide class="rounded-lg shadow-md overflow-hidden" v-for="(i, index) in img" :key="index">
        <div class="h-full w-full">
            <img :src="i" class="w-full h-full object-cover" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
export default {
    data: () => ({
        img: [
            'https://i.imgur.com/pdoGQHQ.jpg',
            'https://i.imgur.com/iu8sp8N.jpg',
            'https://i.imgur.com/e2p5spL.jpg'
        ]
    }),
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  padding: 2.5em 0;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>