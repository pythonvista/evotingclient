<template>
  <div class="min-h-screen w-full justify-center items-center">
    <div class="otpbox boxs" v-if="otpbox">
      <div
        x-data="{ isOpen: true }"
        class="relative w-full flex justify-center"
      >
        <div
          class="flex items-end justify-center w-full px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
            >&#8203;</span
          >

          <div
            class="relative inline-block px-6 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
          >
            <div>
              <div class="flex items-center justify-center">
                <img
                  class="object-cover w-12 h-12 rounded-full ring ring-white"
                  src="https://i.imgur.com/pdoGQHQ.jpg"
                  alt=""
                />
                <img
                  class="object-cover w-12 h-12 -mx-4 rounded-full ring ring-white"
                  src="https://i.imgur.com/iu8sp8N.jpg"
                  alt=""
                />
                <img
                  class="object-cover w-12 h-12 rounded-full ring ring-white"
                  src="https://i.imgur.com/e2p5spL.jpg"
                  alt=""
                />
              </div>
            </div>

            <div class="mt-4">
              <p class="text-center text-lg text-black" for="share link">
                Sms Code Sent
              </p>

              <div class="flex items-center mt-2 -mx-1">
                <input
                  type="text"
                  placeholder="Enter otp"
                  v-model="otp"
                  class="flex-1 block text-center h-10 px-4 mx-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <p
              class="text-md font-bold underline py-1 text-center text-green-400"
            >
              Resend Otp
            </p>
            <div
              class="mt-4 sm:mt-6 sm:flex justify-center sm:items-center sm:-mx-2"
            >
              <q-btn
                id="mapps"
                :loading="loading2"
                :disable="!otp"
                @click="VerifyOtp"
                class="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              >
                Verify
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section v-else class="bg-white dark:bg-gray-900">
      <div class="flex items-center justify-center min-h-screen px-6 mx-auto">
        <form class="w-full max-w-md">
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8"
              src="@/assets/images/logo/fuoye-logo.png"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center mt-6">
            <a
              href="#"
              class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400"
            >
              sign up
            </a>
          </div>
          <p class="text-center pt-5">Student Signup</p>

          <div class="relative flex items-center mt-8">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              v-model="matricno"
              class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Matric No"
            />
          </div>
          <div class="relative flex items-center mt-8">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              v-model="fullName"
              class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Full Name"
            />
          </div>

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="phone"
              v-model="phone"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Phone"
            />
          </div>

          <div class="relative flex items-center mt-4">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="email"
              v-model="email"
              class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email"
            />
          </div>

          <div class="mt-6">
            <q-btn
              @click="SendOtp"
              id="mapps"
              :disable="!Valid"
              :loading="loading"
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign Up
            </q-btn>

            <div class="mt-6 text-center">
              <a
                @click="$router.push({ path: '/' })"
                class="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { RecaptchaVerifier } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
let appVerifier;
let confirmationResult;
let crud;
let authfunc;
let nuxt;
let store;
export default {
  data: () => ({
    phone: '',
    email: '',
    fullName: '',
    allUsers: [],
    matricno: '',
    otpbox: false,
    otp: '',
    dform: {},
    loading: false,
    loading2: false,
  }),
  methods: {
    async SendOtp() {
      if (this.Valid) {
        let temp1 = this.allUsers.filter((v) => v.uid == '+' + this.phone);
        let temp2 = this.allUsers.filter((v) => v.email == '+' + this.email);
        let temp3 = this.allUsers.filter(
          (v) => v.matricno.toLowerCase() == '+' + this.matricno.toLowerCase()
        );
        console.log(temp1, temp2, temp3)
        if (temp1.length > 0) {
          ShowSnack('Phone Number is taken already', 'negative');
          return;
        }
        if (temp2.length > 0) {
          ShowSnack('Email is taken already', 'negative');
          return;
        }
        if (temp3.length > 0) {
          ShowSnack('Matric is taken already', 'negative');
          return;
        }
        this.loading = true;
        try {
          confirmationResult = await authfunc.Phone(
            '+' + this.phone,
            appVerifier
          );
          ShowSnack('otp sent', 'positive');
          this.loading = false;
          this.otpbox = true;
        } catch (err) {
          console.log(err);
          this.loading = false;
          ShowSnack('Error Sending Otp', 'negative');
        }
      } else {
        ShowSnack('Fields Required', 'negative');
      }
    },
    async VerifyOtp() {
      try {
        this.loading2 = true;
        const result = await confirmationResult.confirm(this.otp);
        const user = result.user;
        await crud.addDocWithId('USERS', user.phoneNumber, {
          phone: user.phoneNumber,
          fullName: this.fullName,
          email: this.email,
          matricno: this.matricno,
          uid: user.phoneNumber,
        });
        store.SetActiveUser(user.phoneNumber, true);
        const doc = await crud.getSingleDoc('USERS', user.phoneNumber);
        store.SetUserData(doc.data());
        this.loading2 = false;
        this.otpbox = false;
        this.$router.push({ path: '/faceupload', query: { uid: this.phone } });
      } catch (err) {
        console.log(err);
        this.loading2 = false;
        ShowSnack('Error verifying otp', 'negative');
      }
    },
    INit() {
      appVerifier = window.recaptchaVerifier = new RecaptchaVerifier(
        'mapps',
        {
          size: 'invisible',
          callback: (response) => {},
        },
        authfunc.UserState()
      );
    },
    GetAll() {
      onSnapshot(crud.queryDoc('USERS'), (snapshot) => {
        this.allUsers = [];
        snapshot.forEach((doc) => {
          this.allUsers.push(doc.data());
        });
      });
    },
  },
  computed: {
    Valid() {
      if (this.phone && this.email && this.matricno && this.fullName) {
        return true;
      }

      return false;
    },
  },
  created() {
    nuxt = useNuxtApp();
    store = useLoungeStore();
    crud = nuxt.$crud;
    authfunc = nuxt.$authfunc;
  },
  mounted() {
    this.INit();
    this.GetAll();
  },
};
</script>

<style></style>
