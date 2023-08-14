<template>
  <div class="xs:px-0 md:px-4 py-4">
    <div class="flex justify-center mx-auto mt-3">
      <span class="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
      <span class="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
      <span class="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
    </div>
    <swiper
      :slidesPerView="1"
      :spaceBetween="10"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(i, index) in data" :key="index">
        <a
          class="block rounded-lg cursor-pointer p-4 hover:shadow-lg m-1 shadow-md border-2 bordeer-solid border-slate-200 shadow-indigo-100"
        >
          <img
            alt="Home"
            :src="i.img ? i.img : ''"
            class="h-52 w-full sback rounded-md"
          />

          <div class="mt-2">
            <p class="text-xl font-bold">{{ i.fullname }}</p>
           <p>Total Votes: {{ allVotes.filter((v)=> v.contestId == i.id).length }}</p>
            <q-btn
              :disable="CheckVote(i).voted"
              :loading="loading"
              @click="Vote(i)"
              color="blue"
              >{{ ReturnContestId(CheckVote(i).vote, i.id) ? `Voted ${i.fullname}✅` : 'vote'  }}</q-btn
            >
          </div>
        </a>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
let store;
let crud;
let nuxt;
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

export default {
  props: ['title', 'data', 'allVotes'],
  data: () => ({
    ratingModel: 3,
    allpads: [],
    loader: true,
    loading: false,
  }),
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    async GetAllFeaturedAds() {
      try {
        const res = await crud.getAllDoc('ADS', 'desc');
        this.allpads = res;
        this.loader = false;
      } catch (err) {
        console.log(err);
        ShowSnack('Error getting ads', 'negative');
      }
    },
    async Vote(data) {
      try {
        this.loading = true;
        if (this.Scanned) {
          await crud.addDocWithoutId('VOTES', {
            pollid: data.pollsid,
            contestId: data.id,
            uid: this.activeUser,
          });
          store.SetScan(false)
          this.loading = false;
        } else {
          this.loading = false;
          ShowSnack('Facial Validation Required', 'negative');
          this.$router.push({ path: '/scanimg' });
        }
      } catch (err) {
        console.log(err);
      }
    },
    CheckVote(data) {
        let votes = this.allVotes.filter((v) => v.pollid == data.pollsid && v.uid == this.activeUser);
      if (votes.length > 0) {
        return { voted: true, vote: votes  };
      } else {
        return { voted: false, vote: votes };
      }
    },
    ReturnContestId(data, id) {
      let contest = data.find((v) => v.contestId == id) || {}
      let cid = contest.contestId
      if (cid) {
        return true
      }
      return false
    }
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  computed: {
    userData() {
      return store.userData;
    },
    Scanned() {
      return store.isScanned;
    },

    activeUser() {
      return store.activeUser;
    },
  },
  created() {
    store = useLoungeStore();
    nuxt = useNuxtApp();
    crud = nuxt.$crud;
    this.GetAllFeaturedAds();
  },
};
</script>
<style scoped>
.swiper {
  width: 100%;
  height: 100%;

  padding: 2.5em 0;
}

.ads {
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
</style>
