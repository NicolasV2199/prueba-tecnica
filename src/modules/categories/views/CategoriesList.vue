<template>
  <div class="bg-black text-start full-container">
    <h3>Lista de Categorías</h3>

    <div class="categories-container d-flex flex-wrap mt-5">
      <div class="category bg-success d-flex position-relative" v-for="category in categories" :key="category.id">
        <h3>{{ category.nombre }}</h3>
        <button class="btn btn-link text-white edit-category position-absolute"
          @click="$router.push({ name: 'category', params: { id: category.id } })">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CryptoJS from "crypto-js";
export default {

  data() {
    return {
      categories: [],
      privateKey: 'DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6',
      publicKey: 'VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g',
      timezone: null,
      signature: '',
    }
  },

  computed: {

    ...mapGetters('Modulo', ['getToken'])

  },

  methods: {

    getCategories() {
      this.$axios.get('v1/categoria', {
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
          this.categories = response.data.categorias;
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
          this.getCategories();
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
  padding: 4rem;
}

.category {
  padding: 1rem;
  width: 240px;
  height: 120px;
  border-radius: 10px;
  margin: 1rem;
  justify-content: center;
  align-items: center;
}

.edit-category {
  bottom: 1rem;
  right: 1rem;
}
</style>