<template>
  <div class="example">
    <test />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import test from './test'
export default defineComponent({
  name: 'App',
  components: {
    test,
  },
})
</script>

<style scoped lang="scss">
.example {
  font-size: large;
  color: red;
  background-color: azure;
}
</style>
