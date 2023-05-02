<template>
  <div class="bg-black full-container text-start">
    <h3>{{ id == 'new' ? 'Crear' : 'Actualizar' }} categoria</h3>

    <b-form-group label="Nombre de categoria" class="mt-4 w-50 text-align-left text-black">
      <b-form-input aria-describedby="Nombre-feedback" class="form-control-rounded" type="text" v-model="name" required>
      </b-form-input>
    </b-form-group>

    <button class="btn btn-secondary mt-5 w-50 p-3 fw-600" @click="verifyCategory">{{ id == 'new' ? 'Crear' :
      'Actualizar' }}</button>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CryptoJS from "crypto-js";
export default {

  props: {
    id: {
      required: true,
      type: String,
    }
  },

  computed: {
    ...mapGetters('Modulo', ['getToken'])
  },

  data() {
    return {
      name: '',
      privateKey: 'DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6',
      publicKey: 'VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g',
      timezone: null,
      signature: '',
    }
  },

  methods: {

    verifyCategory() {
      this.id == 'new' ? this.createCategory() : this.updateCategory();
    },

    createCategory() {
      this.$axios.post('v1/categoria/create', {
        'apiKey': this.publicKey,
        'nombre': this.name,
        'utcTimeStamp': this.timezone,
        'signature': this.signature
      },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then((response) => {
          this.$swal.fire({
            title: 'Exito',
            text: `Categoria ${response.data.categoria.nombre} creada con exito`,
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'categories-list' });
            }
          })
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

    updateCategory() {
      this.$axios.put(`v1/categoria/update/${this.id}`, {
        'nombre': this.name,
        'apiKey': this.publicKey,
        'utcTimeStamp': this.timezone,
        'signature': this.signature
      },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then((response) => {
          this.$swal.fire({
            title: 'Exito',
            text: `Categoria actualizada con exito, el nuevo nombre es: ${response.data.categoria.nombre}`,
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'categories-list' });
            }
          })
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
}
</style>