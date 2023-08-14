<template>
  <div class="otpbox boxs" v-if="otpbox">
    <div x-data="{ isOpen: true }" class="relative w-full flex justify-center">
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
  <div v-else class="flex p-5 justify-center items-center min-h-screen">
    <div
      class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md"
    >
      <div class="px-6 py-4">
        <div class="flex justify-center mx-auto">
          <img
            class="w-auto h-7 sm:h-8"
            src="@/assets/images/logo/fuoye-logo.png"
            alt=""
          />
        </div>

        <h3 class="mt-3 text-xl font-medium text-center text-gray-600">
          Welcome Back
        </h3>

        <p class="mt-1 text-center text-gray-500">Student Login</p>

        <form>
          <div class="w-full mt-4">
            <input
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="phone"
              placeholder="Enter Phone Number"
              v-model="phone"
              aria-label="Phone"
            />
          </div>

          <div class="flex items-center justify-between mt-4">
            <q-btn
              :disable="!phone"
              @click="SendOtp"
              id="mapps"
              :loading="loading"
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </q-btn>
          </div>
        </form>
      </div>

      <div
        class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
      >
        <span class="text-sm text-gray-600 dark:text-gray-200"
          >Don't have an account?
        </span>

        <a
          @click="$router.push({ path: '/register' })"
          class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >Register</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { RecaptchaVerifier } from 'firebase/auth';
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
    matricno: '',
    otpbox: false,
    otp: '',
    dform: {},
    loading: false,
    loading2: false,
  }),
  methods: {
    async SendOtp() {
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
    },
    async VerifyOtp() {
      try {
        this.loading2 = true;
        const result = await confirmationResult.confirm(this.otp);
        const user = result.user;
        store.SetActiveUser(user.phoneNumber, true);
        const doc = await crud.getSingleDoc('USERS', user.phoneNumber);
        store.SetUserData(doc.data());
        this.loading2 = false;
        this.otpbox = false;
        this.$router.push({ path: '/elections', query: { uid: this.phone } });
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
  },
  created() {
    nuxt = useNuxtApp();
    store = useLoungeStore();
    crud = nuxt.$crud;
    authfunc = nuxt.$authfunc;
  },
  mounted() {
    this.INit();
  },
};
</script>

<style></style>
