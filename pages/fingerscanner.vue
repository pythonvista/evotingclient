<template>
  <div>
    verify finger

    <q-btn @click="Register">Register</q-btn>
    <q-btn @click="Login">Login</q-btn>
  </div>
</template>

<script>
let StartAunth;

export default {
  created() {},
  methods: {
    async Register() {
      let opts;
      const { browserSupportsWebAuthn, startRegistration } =
        SimpleWebAuthnBrowser;
      const resp = await fetch(
        'https://evotingapi.onrender.com/generate-registration-options'
      );
      console.log(resp);
      let attResp;
      try {
        opts = await resp.json();
        console.log(opts);
        attResp = await startRegistration(opts);
        console.log(attResp);
      } catch (error) {
        if (error.name === 'InvalidStateError') {
          ShowSnack('Already Authnticated', 'negative');
        } else {
          ShowSnack(error.stack, 'negative');
          console.log(error);
        }

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
      console.log(verificationJSON);

      if (verificationJSON && verificationJSON.verified) {
        ShowSnack('Authnticated', 'positive');
      } else {
        ShowSnack('Not Aunticated', 'negative');
      }
    },
    async Login() {
      const resp = await fetch('/generate-authentication-options');
      let asseResp;
      try {
        const opts = await resp.json();
        console.log(opts);
        asseResp = await startAuthentication(opts);
        console.log(asseResp);
      } catch (error) {
      
        throw new Error(error);
      }

      const verificationResp = await fetch('/verify-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asseResp),
      });

      const verificationJSON = await verificationResp.json();
      console.log(verificationJSON)
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
