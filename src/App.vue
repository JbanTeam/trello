<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>Trello Clone</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn flat color="success" :to="{ name: 'login' }">LogIn</v-btn>
        <v-btn flat color="success" :to="{ name: 'signup' }">SignUp</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-btn flat color="primary" @click="logout">LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState('auth', { user: 'payload' })
  },
  methods: {
    // ...mapActions('auth', ['authenticate'])
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => {
        this.$router.push('/login');
      });
    }
  },
  mounted() {
    // this.authenticate()
    //   .then(() => {
    //     console.log('logged in');
    //     this.$router.push('/boards');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
};
</script>
