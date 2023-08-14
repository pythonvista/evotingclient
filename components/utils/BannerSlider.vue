<template>
  <UtilsSkeletonSmall v-if="loader"></UtilsSkeletonSmall>
  <div v-else class="xs:px-0 md:px-4 py-4">
    <h1
      class="text-2xl mt-4 font-semibold text-center text-gray-800 capitalize lg:text-3xl"
    >
      Elections
    </h1>

    <div class="flex justify-center mx-auto mt-3">
      <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
      <span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
      <span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
    </div>
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
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(i, index) in allfads" :key="index">
        <div class="featurecards w-full">
          <div
            class="overflow-hidden bg-white lg:flex lg:w-full lg:shadow-md lg:rounded-xl"
          >
            <div class="lg:w-1/2">
                <img :src="i.img" alt="">
            </div>

            <div
              class="max-w-xl flex flex-col xs:items-center xs:justify-center md:items-start md:justify-center px-6 py-12 lg:max-w-5xl lg:w-1/2"
            >
              <h2
                class="text-2xl text-left w-full font-semibold text-gray-800 md:text-3xl"
              >
                {{ i.title }}
              </h2>

              <p class="mt-4 xs:text-left md:text-left text-gray-500">
                {{ i.date}}...
              </p>
            
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
let store;
let crud;
let nuxt;
export default {
  data: () => ({
    ratingModel: 3,
    allfads: [],
    loader: true
  }),
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    async GetAllElections() {
      try {
        const res = await crud.getAllDoc('ELECTIONS', 'desc');
        this.allfads = res;
        this.loader = false
      } catch (err) {
        console.log(err);
        ShowSnack('Error getting ads', 'negative');
      }
    },
  },
  computed: {},
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
  created() {
    store = useLoungeStore();
    nuxt = useNuxtApp();
    crud = nuxt.$crud;
    this.GetAllElections();
  },
};
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  padding: 2.5em 0;
}
.featurecards {
  min-height: 50vh;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen {
}
</style>
