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

      <div class="circle bg-secondary mx-auto position-absolute"></div>
      <b-carousel id="carousel-fade" indicators interval="3000" v-model="slide">
        <b-carousel-slide :img-src="sliderLogin1" class="slide1"></b-carousel-slide>
        <b-carousel-slide :img-src="sliderLogin2" class="slide2"></b-carousel-slide>
        <b-carousel-slide :img-src="sliderLogin3" class="slide3"></b-carousel-slide>
      </b-carousel>
      <div class="logreg-footer-text position-absolute">
        <h2>anime <span class="text-primary yabu">{{ tittle }}.</span></h2>
        <p>Ver anime en línea en HD, subtitulado o doblado, en tu celular o computadora. ¡Animeyabu, tu
          portal de anime en
          línea!</p>
      </div>

    </div>

  </div>
</template>

<script>
import useAuth from "../composables/useAuth";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { inject, ref, watch } from 'vue';


export default {

  setup() {

    const { email, password, showPassword, publicKey, timezone, signature, token, getTimeZone, sliderLogin1, sliderLogin2, sliderLogin3, slide, tittle } = useAuth();

    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
    const Swal = inject('$swal');

    const store = useStore();
    const router = useRouter();

    const phone = ref('')
    const nit = ref('')
    const social = ref('')
    const confirmPassword = ref('')
    const showConfirmPassword = ref(false)
    const name = ref('')
    const lastName = ref('')
    const identification = ref('')
    const personType = ref('natural')
    const options = ref([
      { text: 'Natural', value: 'natural' },
      { text: 'Juridica', value: 'juridica' },
    ])

    getTimeZone();

    const initializeUser = () => {
      let user = {};
      if (personType.value == 'juridica') {
        user = {
          'telephone': phone.value,
          'NIT': nit.value,
          'razon_social': social.value,
          'type_user_id': 1,
          'verify_tc': '1',
          'password': password.value,
          'password_confirmation': confirmPassword.value,
          'email': email.value,
          'apiKey': publicKey.value,
          'utcTimeStamp': timezone.value,
          'signature': signature.value,
        }
      } else {
        user = {
          'name': name.value,
          'lastname': lastName.value,
          'telephone': phone.value,
          'identy_document': identification.value,
          'type_user_id': 2,
          'verify_tc': '1',
          'password': password.value,
          'password_confirmation': confirmPassword.value,
          'email': email.value,
          'apiKey': publicKey.value,
          'utcTimeStamp': timezone.value,
          'signature': signature.value,
        }
      }
      return user;
    }

    const submitRegister = () => {
      const user = initializeUser();

      Swal.fire({
        title: 'Espere por favor',
        allowOutsideClick: true,
      })
      Swal.showLoading();

      axios.post('register', user)
        .then((response) => {
          token.value = response.data.token;
          store.dispatch('Modulo/logUserIn', token.value)
          Swal.fire({
            title: 'Exito',
            text: 'Usuario creado correctamente',
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push({ name: 'no-category' });
            }
          })

        })
        .catch(({ response }) => {
          Swal.fire({
            title: '!ERROR!',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
            timer: 20000
          });

        })
    }

    watch(slide, (newValue) => {
      switch (newValue) {
        case 1:
          tittle.value = 'Kyojuro';
          break;
        case 2:
          tittle.value = 'Inosuke';
          break;

        default:
          tittle.value = 'yabu';
          break;
      }
    });

    return {
      email,
      password,
      showPassword,
      publicKey,
      timezone,
      signature,
      token,
      getTimeZone,

      submitRegister,
      initializeUser,

      phone,
      nit,
      social,
      confirmPassword,
      showConfirmPassword,
      name,
      lastName,
      identification,
      personType,
      options,
      slide,
      tittle,
      sliderLogin1,
      sliderLogin2,
      sliderLogin3,
    }
  }
}
</script>

<style lang="scss" scoped></style>

