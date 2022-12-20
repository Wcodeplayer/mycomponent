<template>
  <ul>
    <item class="item" 
          :v-for="route in permission_routes"
          :key="route.path"
          :model="route"
          :base-path="route.path"></item>
  </ul>
</template>

<script>
import item from "./item.vue";
import {mapGetters} from 'vuex'
export default {
  name: "SideMenu",
  components: {
    item,
  },
  computed:{
    ...mapGetters(['permission_routes'])
  }
}
</script>

<style>
</style>