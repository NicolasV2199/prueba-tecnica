<template>
  <div class="logreg-container d-flex">


    <div class="logreg-fields d-inline-block p-5 bg-black position-relative">
      <!-- <i class="fas fa-arrow-left fa-2x position-absolute logreg-exit pointer"></i> -->

      <div class="logreg-header mt-3">
        <img src="@/assets/images/login.png" alt="">
        <h2 class="mt-3">ひさしぶり!</h2>
        <i>¡Hola, te extrañamos!</i>
      </div>

      <div class="logreg-body w-75 mx-auto mt-5">

        <b-form @submit.prevent="submitLogin">
          <b-form-group label="Email" class="mt-2 text-start w-75 mx-auto">
            <b-form-input aria-describedby="Email-feedback" class="form-control-rounded" type="text" v-model="email" email
              required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Contraseña" class="mt-2 text-start w-75 mx-auto">
            <b-input-group>
              <b-form-input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                required></b-form-input>
              <i class="fas fa-eye show-icon pointer" @click="showPassword = !showPassword"></i>
            </b-input-group>
            <p class="my-1 text-end"><small class="text-secondary pointer fw-600">¿Olvidaste tu contraseña?</small></p>
          </b-form-group>

          <button class="btn btn-secondary w-75 my-3 fw-bold p-3" type="submit">Acceder</button>
        </b-form>

        <div class="text-container mt-3 w-75 mx-auto">
          <div class="text">Registrate también con</div>
        </div>

        <div class="logreg-icons">
          <i class="fab fa-instagram-square fa-2x m-3"></i>
          <i class="fab fa-twitter-square fa-2x m-3"></i>
          <i class="fab fa-facebook-square fa-2x m-3"></i>
        </div>
        <p>
          ¿Quieres registrarte? <span class="text-secondary pointer fw-600"
            @click="$router.push({ name: 'register' })">Registrate</span>
        </p>
      </div>

    </div>

    <div class="logreg-slider d-inline-block bg-success p-5 position-relative">
      <div class="circle bg-secondary mx-auto"></div>
      <img src="@/assets/images/slider-login1.png" alt="" class="slider-image">

      <div class="logreg-footer-text">
        <h2>anime <span class="text-primary yabu">yabu.</span></h2>
        <p class="fs-2r">Ver anime en línea en HD, subtitulado o doblado, en tu celular o computadora. ¡Animeyabu, tu
          portal de anime en
          línea!</p>
      </div>
    </div>

  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import { mapActions } from "vuex";
export default {

  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      publicKey: 'VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g',
      privateKey: 'DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6',
      timezone: null,
      token: '',
    }
  },

  methods: {

    ...mapActions('Modulo', ['logUserIn']),

    submitLogin() {
      const signature = CryptoJS.SHA256(`${this.privateKey},${this.publicKey},${this.timezone}`).toString();

      this.$axios.post('login', {
        'email': this.email,
        'password': this.password,
        'apiKey': this.publicKey,
        'utcTimeStamp': this.timezone,
        'signature': signature
      })
        .then(({data}) => {
          this.token = data.access_token;
          this.logUserIn(this.token);
          this.$swal.fire({
            title: 'Exito',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'no-category' });
            }
          })
        })
        .catch(({ response }) => {
          this.$swal({
            title: '!ERROR!',
            text: response.data.message,
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

  },

  created() {
    this.getTimeZone();
  }

}
</script>

<style lang="scss" scoped></style>

