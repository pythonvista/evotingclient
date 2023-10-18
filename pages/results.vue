<template>
  <div>
    <div class="px-2 py-3 bg-white shadow-md flex justify-between items-center">
      <a class="navbar-brand">
        <!-- FUOYE NAV LOGO -->
        <img
        @click="$router.push({path: '/'})"
          width="40"
          class="navbar-brand-fuoye-logo"
          src="@/assets/images/logo/images.jpg"
          alt="Logo"
        />
      </a>
      <q-btn v-if="activeUser" @click="SignOut" outline size="13px"
        >logout</q-btn
      >
      <q-btn v-else :to="{ path: '/login' }" outline size="13px">Sign In</q-btn>
    </div>
    <div class="flex justify-center items-center mt-5"><h2 class="text-xl font-bold underline">All Results</h2></div>
    <div
      class="flex w-full items-center p-5 justify-center gap-4 relative"
      v-for="(i, index) in allElection"
      :key="index"
    >
      <div class="flex justify-center items-center w-full bg-slatepri shadow-md">
        <q-expansion-item class="w-full" expand-separator :label="i.title">
          <div class="px-3 my-4" v-for="(i, index) in allPools.filter(
                      (v) => v.electionid == i.id
                    )" :key="index">
            <p class="text-2xl font-bold w-full text-center">
              {{ i.title }} Contestants
            </p>
            <utils-adminslide
              :allVotes="allVotes"
              :data="allContestant.filter((v) => v.pollsid == i.id)"
            ></utils-adminslide>
          </div>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<script>
import { onSnapshot } from 'firebase/firestore';
let nuxt;
let crud;
let store;
export default {
  data: () => ({
    logged: false,
    loaders: [],
    username: '',
    allVotes: [],
    pass: '',
    allElection: [],
    allPools: [],
    allContestant: [],
    loading: false,
    ele: false,
    pls: false,
    cont: false,
    election: {},
    polls: {},
    contestant: {},
  }),
  setup() {
    definePageMeta({
      layout: 'home',
    });
  },
  methods: {
    GetAll() {
      onSnapshot(crud.queryDoc('ELECTIONS'), (snapshot) => {
        this.allElection = [];
        snapshot.forEach((doc) => {
          this.allElection.push(doc.data());
          this.loaders.push({ loading: false });
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
    async AddElection() {
      try {
        this.loading = true;
        await crud.addDocWithId('ELECTIONS', this.election.id, this.election);
        ShowSnack('Election Added', 'positive');
        this.loading = false;
        this.election = {};
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async AddPolls() {
      try {
        this.loading = true;
        await crud.addDocWithId('POLLS', this.polls.id, this.polls);
        ShowSnack('Pools Added', 'positive');
        this.loading = false;
        this.election = {};
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    async AddContestant() {
      try {
        this.loading = true;
        await crud.addDocWithId('Conts', this.contestant.id, this.contestant);
        ShowSnack('Contestant Added', 'positive');
        this.loading = false;
        this.election = {};
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    OpenElection() {
      this.election.id =
        'ELC' + Math.floor(Math.random() * 1122980808 + 222).toString();
      this.ele = true;
    },
    OpenPools() {
      this.polls.id =
        'POlls' + Math.floor(Math.random() * 1122980808 + 222).toString();
      this.pls = true;
    },
    OpenCont() {
      this.contestant.id =
        'Cont' + Math.floor(Math.random() * 1122980808 + 222).toString();
      this.cont = true;
    },
    async Delete(dbname, id, i) {
      try {
        console.log(dbname, id, i);
        console.log(this.loaders);
        this.loaders[i].loading = true;
        await crud.removeDoc(dbname, id);
        ShowSnack('Deleted Successfull', 'positive');
        this.loaders[i].loading = false;
      } catch (err) {
        console.log(err);
        this.loaders[i].loading = false;
      }
    },
    Login() {
      if (this.username == 'admin123' && this.pass == '123456') {
        ShowSnack('Admin Logged In Successfully', 'positive');
        this.logged = true;
      } else {
        ShowSnack('Inccorect Password Access Denied', 'negative');
      }
    },
  },
  created() {
    nuxt = useNuxtApp();
    crud = nuxt.$crud;
  },
  mounted() {
    this.GetAll();
  },
};
</script>

<style></style>
