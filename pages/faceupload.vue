<template>
  <div
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
</template>

<script>
let crud;
let upload;
let nuxt;
let store
export default {
  data: () => ({
   load: false 
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
      this.load = true
      Webcam.snap(async (data_uri) => {
        try {
          const imgfile = this.dataURItoBlob(data_uri);
          const res = await upload(
            imgfile,
            `${this.activeUser}_verify_img`
          );
          await crud.updateDocument('USERS',  this.activeUser, {
            biometrics: { scan1Uri: data_uri, url: res.url, path: res.path },
          });
          ShowSnack('Validation Successfull', 'positive')
          this.$router.push({path: '/elections'})
          this.load = false
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
  },
  computed: {
    activeUser() {
      return store.activeUser
    }  
  },
  created() {
    let nuxt = useNuxtApp();
    store = useLoungeStore()
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
