<template>
  <div class="logreg-container d-flex">

    <div class="logreg-fields d-inline-block p-5 bg-black position-relative">
      <i class="fas fa-arrow-left fa-2x position-absolute logreg-exit pointer"
        @click="$router.push({ name: 'login' })"></i>

      <div class="logreg-header d-flex justify-content-center align-items-center">
        <img src="@/assets/images/register.png" alt="" class="w-25">
        <h3 class="m-0">ひさしぶり! <br>
          <small><i>¡Bienvenidos(a)!</i></small>
        </h3>
      </div>

      <div class="logreg-body w-75 mx-auto">
        <b-form @submit.prevent="submitRegister">
          <b-form-group v-slot="{ ariaDescribedby }">
            <p class="d-inline-block me-4">Tipo de persona</p>
            <b-form-radio-group class="d-inline-block" v-model="personType" :options="options"
              :aria-describedby="ariaDescribedby" name="radio-inline"></b-form-radio-group>
          </b-form-group>

          <b-form-group label="Nombre" class="mt-2 text-start w-75 mx-auto text-black" v-if="personType != 'juridica'">
            <b-form-input aria-describedby="Nombre-feedback" class="form-control-rounded" type="text" v-model="name">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Apellido" class="mt-2 text-start w-75 mx-auto" v-if="personType != 'juridica'">
            <b-form-input aria-describedby="Apellido-feedback" class="form-control-rounded" type="text"
              v-model="lastName">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Razon Social" class="mt-2 text-start w-75 mx-auto" v-if="personType == 'juridica'">
            <b-form-input aria-describedby="RazonSocial-feedback" class="form-control-rounded" type="text"
              v-model="social">
            </b-form-input>
          </b-form-group>

          <b-form-group label="NIT" class="mt-2 text-start w-75 mx-auto" v-if="personType == 'juridica'">
            <b-form-input aria-describedby="NIT-feedback" class="form-control-rounded" type="text" v-model="nit">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Telefono" class="mt-2 text-start w-75 mx-auto">
            <b-form-input aria-describedby="Telefono-feedback" class="form-control-rounded" type="text" v-model="phone">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Identificacion" class="mt-2 text-start w-75 mx-auto" v-if="personType != 'juridica'">
            <b-form-input aria-describedby="Identificacion-feedback" class="form-control-rounded" type="text"
              v-model="identification">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Email" class="mt-2 text-start w-75 mx-auto">
            <b-form-input aria-describedby="Email-feedback" class="form-control-rounded" type="text" v-model="email"
              email>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Contraseña" class="mt-2 text-start w-75 mx-auto position-relative">
            <b-input-group>
              <b-form-input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"></b-form-input>
              <i class="fas fa-eye show-icon pointer" @click="showPassword = !showPassword"></i>
            </b-input-group>
          </b-form-group>

          <b-form-group label="Confirmar Contraseña" class="mt-2 text-start w-75 mx-auto position-relative">
            <b-input-group>
              <b-form-input id="confirm-password" v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"></b-form-input>
              <i class="fas fa-eye show-icon pointer" @click="showConfirmPassword = !showConfirmPassword"></i>
            </b-input-group>
          </b-form-group>

          <button class="btn btn-secondary w-75 my-3 text-black fw-bold p-3">Registrar</button>

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
          ¿Ya estas registrado? <span class="text-secondary pointer fw-600"
            @click="$router.push({ name: 'login' })">Acceder</span>
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
import { mapActions } from 'vuex';

export default {

  name: 'LoginView',

  data() {
    return {
      options: [
        { text: 'Natural', value: 'natural' },
        { text: 'Juridica', value: 'juridica' },
      ],
      personType: 'natural',
      name: '',
      lastName: '',
      social: '',
      nit: '',
      phone: '',
      identification: '',
      email: '',
      password: '',
      showPassword: false,
      confirmPassword: '',
      showConfirmPassword: false,
      timezone: null,
      publicKey: 'VBNfgfTYrt5666FGHFG6FGH65GHFGHF656g',
      privateKey: 'DGDFGDbnbnTRTEfg67hgyTYRTY56gfhdR6',
    }
  },



  methods: {

    ...mapActions('Modulo', ['logUserIn']),

    submitRegister() {
      const user = this.initializeUser();

      this.$axios.post('register', user)
        .then((response) => {
          this.logUserIn(response.data.token);
          this.$swal.fire({
            title: 'Exito',
            text: 'Usuario creado correctamente',
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

    initializeUser() {
      const signature = CryptoJS.SHA256(`${this.privateKey},${this.publicKey},${this.timezone}`).toString();
      let user = {};
      if (this.personType == 'juridica') {
        user = {
          'telephone': this.phone,
          'NIT': this.nit,
          'razon_social': this.social,
          'type_user_id': 1,
          'verify_tc': '1',
          'password': this.password,
          'password_confirmation': this.confirmPassword,
          'email': this.email,
          'apiKey': this.publicKey,
          'utcTimeStamp': this.timezone,
          'signature': signature,
        }
      } else {
        user = {
          'name': this.name,
          'lastname': this.lastName,
          'telephone': this.phone,
          'identy_document': this.identification,
          'type_user_id': 2,
          'verify_tc': '1',
          'password': this.password,
          'password_confirmation': this.confirmPassword,
          'email': this.email,
          'apiKey': this.publicKey,
          'utcTimeStamp': this.timezone,
          'signature': signature,
        }
      }
      return user;
    },

    getTimeZone() {
      this.$axios
        .get('timezone')
        .then((response) => {
          this.timezone = response.data.timezone;
        })
        .catch(() => {

        });
    },

  },

  created() {
    this.getTimeZone();
  }

}
</script>

<style lang="scss" scoped></style>

