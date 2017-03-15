<template>
  <div>
    <wellReceived v-show="!loading"></wellReceived>
    <Release v-show="!loading"></Release>
    <top250 v-show="!loading"></top250>
  </div>
</template>

<script>
import wellReceived from './wellReceived.vue'
import Release from './Release.vue'
import Top250 from './Top250.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    wellReceived,
    Release,
    Top250
  },
  computed:mapGetters([
    'loading'
  ])
}
</script>