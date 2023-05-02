<template>
  <div class="full-container bg-black text-start">
    <h3>Hola {{ user.name }}</h3>

    <p class="fw-600">Selecciona una opción: </p>

    <button class="btn btn-secondary p-4 d-block my-5 fw-600" @click="$router.push({ name: 'categories-list' })">
      Ver todas las categorias
    </button>

    <button class="btn btn-secondary p-4 d-block my-5 fw-600"
      @click="$router.push({ name: 'category', params: { id: 'new' } })">
      Crear categorias
    </button>

    <button class="btn btn-secondary p-4 d-block my-5 fw-600" @click="closeSession">
      Cerrar sesión
    </button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CryptoJS from "crypto-js";

export default {

  data() {
    return {
      privateKey: 'DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6',
      publicKey: 'VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g',
      timezone: null,
      signature: '',
      user: {}
    }
  },

  computed: {
    ...mapGetters('Modulo', ['getToken'])
  },

  methods: {

    ...mapActions('Modulo', ['logUserOut']),

    closeSession() {
      this.logUserOut();
      this.$router.push({ name: 'login' })
      this.$swal({
        title: 'Exito',
        text: 'Sesión finalizada con exito',
        icon: 'success',
        confirmButtonText: '¡Entendido!',
        timer: 20000
      });
    },

    getUserInfo() {

      this.$axios.get('v1/me', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          'apiKey': this.publicKey,
          'utcTimeStamp': this.timezone,
          'signature': this.signature
        }
      })
        .then((response) => {
          this.user = response.data;
        })
        .catch(() => {
          this.$swal({
            title: '!ERROR!',
            text: 'Hubo un error, por favor intente de nuevo',
            icon: 'error',
            confirmButtonText: '¡Entendido!',
            timer: 20000
          });
        })
    },

    getTimeZone() {
      this.$axios
        .get('timezone')
        .then((response) => {
          this.timezone = response.data.timezone;
          this.hash256();
          this.getUserInfo();
        })
        .catch(() => {
          this.$swal({
            title: '!ERROR!',
            text: 'Hubo un error, por favor intente de nuevo',
            icon: 'error',
            confirmButtonText: '¡Entendido!',
            timer: 20000
          });
        });
    },

    hash256() {
      this.signature = CryptoJS.SHA256(`${this.privateKey},${this.publicKey},${this.timezone}`).toString();
    },

  },

  created() {
    this.getTimeZone();
  }
}
</script>

<style scoped lang="scss">
.full-container {
  padding: 6rem;

  button {
    min-width: 180px;
  }
}
</style>