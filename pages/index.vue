<template>
<div>
  <home-hero-section></home-hero-section>
  <q-btn :to="{path: '/login'}">Login</q-btn>
  <q-btn :to="{path: '/register'}">Signup</q-btn>
  <q-btn @click="Test">test</q-btn>
</div>
</template>

<script>
export default {
  setup() {
    useHead({
      script: [
        
      ]
    })
  },
  methods: {
   
  
  }
};
</script>

<style></style>
