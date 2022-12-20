<template>
  <div class="app-wapper">
    <SideMenu></SideMenu>
      <div class="main-container">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu';
export default {
  components:{SideMenu}
}
</script>

<style>

</style>