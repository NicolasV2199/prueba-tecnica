<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {

  data(){
    return{
      expirationDate: null,
    }
  },

  methods: {
    ...mapActions('Modulo', ['verifyStore', 'logUserOut']),

    decodeToken(token) {

      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch (error) {
        return null;
      }
    }
  },


  created() {
    const token = localStorage.getItem('token');
    if(token){
      this.expirationDate = new Date(this.decodeToken(localStorage.getItem('token')).exp * 1000);
    }
    if (token && this.expirationDate) {
      const now = new Date();
      if (this.expirationDate < now) {
        this.logUserOut();
        this.$router.push({name: 'login'});
      } else {
        const timeout = this.expirationDate - now;
        setTimeout(() => {
          const token = localStorage.getItem('token');
          if (token && this.expirationDate) {
            const now = new Date();
            if (this.expirationDate < now) {
              this.logUserOut();
              this.$router.push({name: 'login'});
            }
          }
        }, timeout);
      }
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
