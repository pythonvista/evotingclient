<template>
  <div
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
    uid: '',
    user: {},
  }),
  mounted() {
    Webcam.set({
      width: 250,
      height: 250,
      image_format: 'jpeg',
      jpeg_quality: 90,
    });

    Webcam.attach('camera');
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
        ShowSnack('Face Biometrics Not Uploaded', 'negative')
      }
      } catch (err) {
        console.log(err)
      }
      
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
    this.CheckValidation();
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
