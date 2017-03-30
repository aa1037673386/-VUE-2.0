<template>
  <div id="app">
     <router-view></router-view>
    <div class="spinner" v-show="loading">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default{
    computed:mapGetters([
      'loading'
    ])
  }
</script>

<style lang="less">
</style>
