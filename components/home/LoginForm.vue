<template>
  <section class="bg-gray-900 relative">
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
              class="relative inline-block  px-6 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
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
              <p class="text-md font-bold underline py-1 text-center text-green-400">Resend Otp</p>
              <div
                class="mt-4 sm:mt-6 sm:flex justify-center sm:items-center sm:-mx-2"
              >
                <q-btn
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
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-md sm:text-center">
        <h2
          class="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl text-white"
        >
          Sign In
        </h2>
    
        <form action="#">
          <div
            class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0"
          >
            <div class="relative w-full">
              <label
                for="email"
                class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >WhatsApp Number</label
              >
              <div
                class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <img width="20" src="@/assets/svg.svg" alt="" />
              </div>
              <input
                class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Whatsapp number (234000000000)"
                type="number"
                v-model="phone"
                id="email"
                required=""
              />
            </div>
            <div>
              <q-btn
                type="button"
                @click="SendOtp"
                :loading="loading"
                id="mapps"
                class="py-3 px-5 w-full text-sm font-medium text-center text-grey-600 border cursor-pointer bg-white border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </q-btn>
            </div>
          </div>
          <div
            class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300"
          >
            We care about the protection of your data.
            <a
              href="#"
              class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >Read our Privacy Policy</a
            >.
          </div>
        </form>
      </div>
    </div>
  </section>
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
    otpbox: false,
    otp: '',
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
        console.log(err)
        this.loading = false;
        ShowSnack('Error Sending Otp', 'negative');
      }
    },
    async VerifyOtp() {
      try {
        this.loading2 = true
        const result = await confirmationResult.confirm(this.otp)
        const user = result.user
        await crud.addDocWithId('AIXUSER', user.phoneNumber, {
          phone: user.phoneNumber,
          fullName: '',
          email: '',
          account: 'basic',
          uid: user.phoneNumber
        })
        store.SetActiveUser(user.phoneNumber, true)
        const doc = await crud.getSingleDoc('AIXUSER', user.phoneNumber)
        store.SetUserData(doc.data())
        this.loading2 = false
        this.otpbox = false
        this.$router.push({path: '/connect'})
      } catch (err) {
        console.log(err)
         this.loading2 = false
        ShowSnack('Error verifying otp', 'negative')
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

<style scoped>

.boxs{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 111;
  height: auto;
  width: auto;
}
</style>
