<template>
  <div>
    verify finger
{{userData}}
    <q-btn @click="Register">Register</q-btn>
    <q-btn @click="Login">Login</q-btn>
  </div>
</template>

<script>
let store;
let nuxt;
let crud;
export default {
  created() {
    let nuxt = useNuxtApp();
    store = useLoungeStore();
    crud = nuxt.$crud;
  },
  computed: {
    activeUser() {
      return store.activeUser;
    },
    userData() {
      return store.userData;
    },
  },
  methods: {
    async Register() {
      const data = await RegisterAuth(123456, 'emeter');
    },
    async Login() {},
  },

  mounted() {},
};
</script>

<style></style>
