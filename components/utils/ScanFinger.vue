<template>
  <div class="min-h-screen flex gap-3 justify-center flex-col items-center">
    <p class="text-xl font-serif font-bold text-center">
      Fingerprint Verification Scanning
    </p>

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
    <q-btn :loading="loading" @click="Login" color="green"
      >Start Scanning</q-btn
    >
  </div>
</template>

<script>
let StartAunth;
let crud;
let upload;
let nuxt;
let store;
export default {
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
  data: () => ({
    loading: false,
  }),
  methods: {
  
    async Login() {
      
       const res = await LoginAuth()
        if (res.status) {
          store.SetScan(true);
          store.SetFinger(res.credentialId);
          ShowSnack('User Verified', 'positive');
          this.$router.push({ path: '/elections' });
        } else {
          ShowSnack('Active User Not Verified', 'negative');
        }
     
    },
  },

  mounted() {
    const { startAuthentication = StartAunth } = SimpleWebAuthnBrowser;
    fetch('https://evotingapi.onrender.com/generate-authentication-options')
      .then((resp) => resp.json())
      .then((opts) => {
        console.log('Authentication Options (Autofill)', opts);
        startAuthentication(opts, true)
          .then(async (asseResp) => {
            // We can assume the DOM has loaded by now because it had to for the user to be able
            // to interact with an input to choose a credential from the autofill

            const verificationResp = await fetch('/verify-authentication', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(asseResp),
            });

            const verificationJSON = await verificationResp.json();

            if (verificationJSON && verificationJSON.verified) {
              ShowSnack('User authenticated!');
            } else {
              ShowSnack('Oh no, something went wrong! Response');
            }
          })
          .catch((err) => {
            console.error('(Autofill)', err);
          });
      });
  },
};
</script>

<style></style>
