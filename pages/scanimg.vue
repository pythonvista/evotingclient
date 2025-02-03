<template>
  <div
    v-if="veri == 'start'"
    class="verification min-h-screen flex gap-3 justify-center flex-col items-center"
  >
    <p class="text-xl font-serif font-bold text-center">
      Biometric Verification
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
      <div class="flex justify-center items-center gap-3">
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
     
    </div>
    </div>
  </div>
  <div
   v-if="veri == 'face'"
    class="bg-slate-300 min-h-screen flex flex-col gap-4 justify-center items-center"
  >
    <p class="text-xl font-bold">Verify Biometrics</p>
    <div
      id="camera"
      class="h-[250px] overflow-hidden w-[250px] border-red-400 rounded-full bg-black shadow-md border-solid border-2"
    ></div>
    <p>Center your face in the box for verification scanning</p>

    <q-btn :loading="load" @click="StartVerification" class="text-black">
      Start Scaning
      <template v-slot:loading>
        <q-spinner-gears class="on-left" />
        Verifying...
      </template></q-btn
    >
  </div>
   <div v-if="veri == 'finger'">
  <utils-scan-finger></utils-scan-finger>
  </div>
</template>

<script>
let crud;
let upload;
let store;
let nuxt;
export default {
  data: () => ({
    load: false,
    userData: {},
    veri: 'start',
    uid: '',
    user: {},
  }),
  mounted() {
    this.CheckValidation();
  },
  methods: {
    async StartVerification() {
      this.load = true;
      Webcam.snap(async (data_uri) => {
        try {
          let INPUT_IMG = data_uri.split('base64,')[1];
          let VERIF_IMG =
            this.user?.biometrics?.scan1Uri.split('base64,')[1];

          const res = await apiClient('verify', 'POST', {
            encoded_image1: INPUT_IMG,
            encoded_image2: VERIF_IMG,
          });

          const data = await res.json();
          console.log(data)
          const result = data.matchedFaces[0].matchResult;
          if (result == 1) {
            store.SetScan(true);
            ShowSnack('User Verified', 'positive');
            this.$router.push({path: '/elections'})
          } else {
            ShowSnack('User Not Verified', 'negative');
          }
          await crud;
          this.load = false;
        } catch (err) {
          this.load = false;
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
    async CheckValidation() {
      try {
      console.log(this.activeUser)
      const doc = await crud.getSingleDoc('USERS', this.activeUser);
      this.user = doc.data();
      if (!this.user?.biometrics?.scan1Uri) {
        this.$router.push({ path: '/faceupload' });
        ShowSnack('Fingerprint Biometrics Not Uploaded', 'negative')
      }
      } catch (err) {
        console.log(err)
      }
      
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
    userData() {
      return store.userData;
    },
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
<!-- http://localhost:3000/scanimg?uid=2348101074859&matricno=168539126&electionid=123&pollid=35 -->
