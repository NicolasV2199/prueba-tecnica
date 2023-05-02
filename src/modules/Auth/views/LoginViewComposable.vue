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
import useAuth from "../composables/useAuth";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { inject } from 'vue';

export default {

  setup(){

    const {email, password, showPassword, publicKey, timezone, signature, token, getTimeZone} = useAuth();

    axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
    const Swal = inject('$swal');

    const store = useStore();
    const router = useRouter();
    
    getTimeZone();

    const submitLogin = () => {
      Swal.fire({
        title: 'Espere por favor',
        allowOutsideClick: true,
      })
      Swal.showLoading();
      axios.post('login', {
        'email': email.value,
        'password': password.value,
        'apiKey': publicKey.value,
        'utcTimeStamp': timezone.value,
        'signature': signature.value
      })
        .then(({data}) => {
          token.value = data.access_token;
          store.dispatch('Modulo/logUserIn', token.value)
          
          Swal.fire({
            title: 'Exito',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: '¡Entendido!',
          }).then((result) => {
            if (result.isConfirmed) {
              router.push({ name: 'no-category' });
            }
          })
        })
        .catch(({ response }) => {
          Swal({
            title: '!ERROR!',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: '¡Entendido!',
            timer: 20000
          });
  
        })
    }

    return{
      email,
      password,
      showPassword,
      publicKey,
      timezone,
      signature,
      token,
      submitLogin,
      getTimeZone,
    }
  }


}
</script>

<style lang="scss" scoped></style>

