<template>
  <div>
    <div class="wrap min-h-screen">
      <slot />
    </div>
  </div>
</template>

<script>
let store;
let crud;
let auth;
let nuxt;
import { onAuthStateChanged } from 'firebase/auth';
export default {
  data: () => ({
    uid: '',
    sheet: false,
    phone: '',
  }),
  computed: {},
  created() {
    store = useLoungeStore();
    nuxt = useNuxtApp();
    auth = nuxt.$authfunc;
    crud = nuxt.$crud
    onAuthStateChanged(auth.UserState(), async (user) => {
      if (user) {
        store.SetActiveUser(user.phoneNumber, true);
        console.log(user.phoneNumber)
        const doc = await crud.getSingleDoc('USERS', user.phoneNumber);
        store.SetUserData(doc.data());
      } else {
        this.$router.push({ path: '/login' });
        ShowSnack('User not logged in', 'negative');
      }
    });
  },
};
</script>

<style></style>
