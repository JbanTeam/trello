<template>
  <v-app>
    <app-navbar :user="user" :logout="logout"></app-navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppNavbar from '@/components/AppNavbar';

export default {
  name: 'App',
  components: { AppNavbar },
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
