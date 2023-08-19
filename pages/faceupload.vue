<template>
  <div
    v-if="veri == 'start'"
    class="verification min-h-screen flex gap-3 justify-center flex-col items-center"
  >
    <p class="text-xl font-serif font-bold text-center">
      Biometric Verification Enrollment
    </p>
    <p class="text-md font-serif font-bold text-center">
      Select Verification Type
    </p>
    <div class="flex justify-center items-center gap-3">
      <div
        @click="EnableFinger"
        class="h-20 w-20 cursor-pointer bg-white shadow-md rounded-md"
      >
        <lord-icon
          src="https://cdn.lordicon.com/rqqkvjqf.json"
          trigger="hover"
          colors="primary:#121331,secondary:#08a88a"
          style="width: 100%; height: 100%"
        >
        </lord-icon>
      </div>
      <div
        @click="EnableFaceUpload"
        class="h-20 w-20 cursor-pointer bg-white shadow-md rounded-md"
      >
        <img
          class="w-full object-cover h-full"
          src="@/assets/images/faceveri.gif"
          alt=""
        />
      </div>
      <div></div>
    </div>
  </div>
  <div
    v-if="veri == 'face'"
    class="bg-slate-300 min-h-screen flex flex-col gap-4 justify-center items-center"
  >
    <p class="text-xl font-bold">Face Verification Setup</p>
    {{ $route.query.uid }}
    <div
      id="camera"
      class="h-[250px] overflow-hidden w-[250px] border-red-400 rounded-full bg-black shadow-md border-solid border-2"
    ></div>
    <p>Center your face in the box for verification scanning</p>
    <q-btn :loading="load" @click="StartVerification" class="text-black">
      Begin Verification
      <template v-slot:loading>
        <q-spinner-gears class="on-left" />
        Scaning...
      </template></q-btn
    >
  </div>
  <div v-if="veri == 'finger'">
  <utils-finger-print-enroll></utils-finger-print-enroll>
  </div>
</template>

<script>
let crud;
let upload;
let nuxt;
let store;
export default {
  data: () => ({
    load: false,
    veri: 'start',
  }),
  mounted() {},
  methods: {
    async StartVerification() {
      this.load = true;
      Webcam.snap(async (data_uri) => {
        try {
          const imgfile = this.dataURItoBlob(data_uri);
          const res = await upload(imgfile, `${this.activeUser}_verify_img`);
          await crud.updateDocument('USERS', this.activeUser, {
            biometrics: { scan1Uri: data_uri, url: res.url, path: res.path },
          });
          ShowSnack('Validation Successfull', 'positive');
          this.$router.push({ path: '/elections' });
          this.load = false;
        } catch (err) {
          console.log(err);
        }
      });
    },
    dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    },
    MountCamera() {
      Webcam.set({
        width: 250,
        height: 250,
        image_format: 'jpeg',
        jpeg_quality: 90,
      });

      Webcam.attach('camera');
    },
    EnableFaceUpload() {
      this.veri = 'face';
      setTimeout(() => {
        this.MountCamera();
      }, 5000);
    },
    EnableFinger() {
      this.veri = 'finger';
    },
  },
  computed: {
    activeUser() {
      return store.activeUser;
    },
  },
  created() {
    let nuxt = useNuxtApp();
    store = useLoungeStore();
    upload = nuxt.$UploadImg;
    crud = nuxt.$crud;
  },
  setup() {
    definePageMeta({
      layout: 'home',
    });
  },
};
</script>

<style scoped>
#camera video {
  height: 100% !important;
  /* position: absolute; */
  widows: 100% !important;
}
</style>
