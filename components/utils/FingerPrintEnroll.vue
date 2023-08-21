<template>
  <div class="min-h-screen flex gap-3 justify-center flex-col items-center">
    <p class="text-xl font-serif font-bold text-center">
      Fingerprint Verification Enrollment
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
    <q-btn :loading="loading" @click="Register" color="green"
      >Start Enrollment</q-btn
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
    async Register() {
      this.loading = true;
      let opts;
      const { browserSupportsWebAuthn, startRegistration } =
        SimpleWebAuthnBrowser;
      const resp = await fetch(
        'https://evotingapi.onrender.com/generate-registration-options'
      );

      let attResp;
      try {
        opts = await resp.json();
        attResp = await startRegistration(opts);
        console.log(attResp);
      } catch (error) {
        if (error.name === 'InvalidStateError') {
          ShowSnack('Already Authnticated', 'negative');
        } else {
          ShowSnack('Error Occured', 'negative');
        }
        this.loading = false;

        throw error;
      }
      const verificationResp = await fetch(
        'https://evotingapi.onrender.com/verify-registration',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...attResp,
            currentChallenge: opts.challenge,
          }),
        }
      );

      const verificationJSON = await verificationResp.json();

      if (verificationJSON && verificationJSON.verified) {
        await crud.updateDocument('USERS', this.activeUser, {
          biometrics: {
            scan1Uri: attResp.id,
            url: attResp.id,
            path: attResp.id,
          },
          biofin: attResp.id
        });
        ShowSnack('Validation Successfull', 'positive');
        this.$router.push({ path: '/elections' });
      } else {
        ShowSnack('Not Aunticated', 'negative');
      }
      this.loading = false;
    },
    async Login() {
      const { startAuthentication } = SimpleWebAuthnBrowser;
      let opts;
      const resp = await fetch(
        'https://evotingapi.onrender.com/generate-authentication-options'
      );
      let asseResp;
      try {
        opts = await resp.json();

        asseResp = await startAuthentication(opts);

        console.log(asseResp);
      } catch (error) {
        throw new Error(error);
      }

      const verificationResp = await fetch(
        'https://evotingapi.onrender.com/verify-authentication',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...asseResp,
            currentChallenge: opts.challenge,
          }),
        }
      );

      const verificationJSON = await verificationResp.json();
      console.log(verificationJSON);
      if (verificationJSON && verificationJSON.verified) {
        ShowSnack('Verified', 'positive');
      } else {
        ShowSnack('Unverified', 'negative');
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
