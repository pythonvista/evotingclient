<template>
  <div>
    <div class="px-2 py-3 bg-white shadow-md flex justify-between items-center">
      <a class="navbar-brand">
        <!-- FUOYE NAV LOGO -->
        <img
          width="40"
          class="navbar-brand-fuoye-logo"
          src="@/assets/images/logo/fuoye-logo.png"
          alt="Logo"
        />
      </a>
      <q-btn v-if="activeUser" @click="SignOut" outline size="13px"
        >logout</q-btn
      >
      <q-btn v-else :to="{ path: '/login' }" outline size="13px">Sign In</q-btn>
    </div>
    <UtilsBannerSlider></UtilsBannerSlider>
    <div class="px-3 my-4" v-for="(i, index) in allPools" :key="index">
      <p class="text-2xl font-bold w-full text-center">
        {{ i.title }} Contestants
      </p>
      <UtilsSliderCards
        :allVotes="allVotes"
        :data="allContestant.filter((v) => v.pollsid == i.id)"
      ></UtilsSliderCards>
    </div>
  </div>
</template>
<script>
import { onSnapshot } from 'firebase/firestore';
let nuxt;
let crud;
let store;
let auth;
export default {
  data: () => ({
    allElection: [],
    allPools: [],
    allContestant: [],
    allVotes: [],
    loading: false,
    ele: false,
    pls: false,
    cont: false,
    election: {},
    polls: {},
    contestant: {},
  }),
  methods: {
    GetAll() {
      onSnapshot(crud.queryDoc('ELECTIONS'), (snapshot) => {
        this.allElection = [];
        snapshot.forEach((doc) => {
          this.allElection.push(doc.data());
        });
      });
      onSnapshot(crud.queryDoc('POLLS'), (snapshot) => {
        this.allPools = [];
        snapshot.forEach((doc) => {
          this.allPools.push(doc.data());
        });
      });
      onSnapshot(crud.queryDoc('Conts'), (snapshot) => {
        this.allContestant = [];
        snapshot.forEach((doc) => {
          this.allContestant.push(doc.data());
        });
      });
      onSnapshot(crud.queryDoc('VOTES'), (snapshot) => {
        this.allVotes = [];
        snapshot.forEach((doc) => {
          this.allVotes.push(doc.data());
        });
      });
    },
    async SignOut() {
      await auth.signout();
    },
  },
  computed: {
    activeUser() {
      return store.activeUser;
    },
  },
  created() {
    store = useLoungeStore();
    nuxt = useNuxtApp();
    crud = nuxt.$crud;
    auth = nuxt.$authfunc;
  },
  mounted() {
    this.GetAll();
  },
  setup() {
    definePageMeta({
      layout: 'home',
    });
  },
};
</script>

<style></style>
