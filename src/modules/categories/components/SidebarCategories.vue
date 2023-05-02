<template>
  <div class="full-container bg-success text-start p-5">
    <div class="d-flex align-items-center">
      <img src="@/assets/images/logo-yabu.png" alt="logo-yabu" class="me-3">
      <h3 class="m-0">animeyabu.</h3>
    </div>
    <h3 class="my-4">Categorias</h3>

    <ul class="my-4 category-options">
      <li @click="$router.push({ name: 'no-category' })">Inicio</li>
      <li @click="$router.push({ name: 'categories-list' })">Ver Todas</li>
      <li @click="$router.push({ name: 'category', params: { id: 'new' } })">Crear</li>
    </ul>

    <h3 class="my-4 close-session" @click="closeSession">Cerrar Sesión</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {


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
    }
  }

}
</script>

<style lang="scss" scoped>
.category-options {
  li:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.close-session {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>