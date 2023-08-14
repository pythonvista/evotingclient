<template>
<div>
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
   async Test() {
      WebSignIn('11225533', 'victor emeter', 'emeterv18@gmail.com', 'Emeter@12345678', '08101074859')

    
    }
  }
};
</script>

<style></style>
