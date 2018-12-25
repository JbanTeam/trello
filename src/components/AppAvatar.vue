<template>
  <v-layout justify-center align-center>
    <h2>{{user.displayName}}</h2>
    <v-avatar ml-3 size="40" color="pink">
      <img :src="user.imageUrl" alt="alt">
    </v-avatar>
  </v-layout>
</template>

<script>
export default {
  props: ['user']
};
</script>
