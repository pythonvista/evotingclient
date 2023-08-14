<template>
  <div
    v-if="!logged"
    class="flex min-h-screen gap-3 bg-slate-500 justify-center items-center flex-col"
  >
    <input
      v-model="username"
      class="bg-white px-3 py-2 rounded"
      type="text"
      placeholder="Admin Username"
    />
    <input
      v-model="pass"
      type="password"
      name=""
      id=""
      class="bg-white px-3 py-2 rounded"
      placeholder="Password"
    />
    <q-btn @click="Login" color="blue">Login</q-btn>
  </div>
  <div v-else class="p-4">
    <q-btn @click="OpenElection">Add Election</q-btn>
    <q-btn @click="OpenPools">Add Polls</q-btn>
    <q-btn @click="OpenCont">Add Contestant</q-btn>

    <q-dialog v-model="ele">
      <div class="bg-white p-3 flex flex-col justify-center items-center gap-4">
        <p class="rexr-3xl font-bold">Add Election</p>
        <p>Election Id: {{ election.id }}</p>
        <input
          type="text"
          v-model="election.id"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Election Id"
        />
        <input
          type="text"
          v-model="election.title"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Title"
        />
        <input
          type="text"
          v-model="election.description"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="description"
        />
        <input
          type="text"
          v-model="election.date"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Date"
        />
        <input
          type="text"
          v-model="election.img"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="img"
        />

        <q-btn :loading="loading" @click="AddElection">Add Election</q-btn>
      </div>
    </q-dialog>
    <q-dialog v-model="pls">
      <div class="bg-white p-3 flex flex-col justify-center items-center gap-4">
        <p class="rexr-3xl font-bold">Add Pools</p>
        <p>Pools Id: {{ polls.id }}</p>
        <input
          type="text"
          v-model="polls.id"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Pooling Id"
        />
        <q-select
          label="Select Election"
          :options="allElection.map((m) => m.id)"
          class="w-full"
          v-model="polls.electionid"
        ></q-select>
        <input
          type="text"
          v-model="polls.title"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Title"
        />
        <input
          type="text"
          v-model="polls.description"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="description"
        />
        <input
          type="text"
          v-model="polls.img"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="img"
        />

        <q-btn :loading="loading" @click="AddPolls">Add Polls</q-btn>
      </div>
    </q-dialog>
    <q-dialog v-model="cont">
      <div class="bg-white p-3 flex flex-col justify-center items-center gap-4">
        <p class="rexr-3xl font-bold">Add Contestant</p>
        <p>Contes Id: {{ contestant.id }}</p>

        <q-select
          label="Select Pools"
          :options="allPools.map((m) => m.id)"
          class="w-full"
          v-model="contestant.pollsid"
        ></q-select>

        <input
          type="text"
          v-model="contestant.fullname"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Full Name"
        />
        <input
          type="text"
          v-model="contestant.department"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Faculty / Department"
        />
        <input
          type="text"
          v-model="contestant.img"
          class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="img"
        />

        <q-btn :loading="loading" @click="AddContestant">Add Contestant</q-btn>
      </div>
    </q-dialog>

    <div class="w-full my-3 ">
      <div class="p-6 bg-white">
        <p class="text-center w-full text-2xl">All Elections</p>
        <q-expansion-item
          v-for="(i, index) in allElection"
          :key="index"
          expand-separator
          :label="i.title"
        >
          <q-card>
            <q-card-section>
              <div v-for="(m, index) in allPools.filter((v)=> v.electionid == i.id)" :key="index">
                <q-expansion-item
                  expand-separator
                  :label="m.title"
                >
                  <q-card>
                    <q-card-section>
                      <div  v-for="(n, index) in allContestant.filter((v)=> v.pollsid == m.id)"
                          :key="index">
                        {{ n.fullname }}
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      
    </div>
    <div class="px-3 my-4" v-for="(i, index) in allPools" :key="index">
        <p class="text-2xl font-bold w-full text-center">
          {{ i.title }} Contestants
        </p>
        <utils-adminslide
          :allVotes="allVotes"
          :data="allContestant.filter((v) => v.pollsid == i.id)"
        ></utils-adminslide>
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
