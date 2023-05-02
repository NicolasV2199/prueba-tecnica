<template>
  <div class="row justify-content-md-center" v-if="isLoading">
    <div class="col-3 alert-info text-center mt-5">
      Espere Por favor
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div class="d-flex full-container" v-else>
    <div class="col-4">
      <SidebarCategories></SidebarCategories>
    </div>
    <div class="col-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {

  components: {
    SidebarCategories: defineAsyncComponent(() => import('../components/SidebarCategories.vue'))
  },

  data(){
    return{
      isLoading: false,
    }
  },


}
</script>

<style lang="scss" scoped>

</style>