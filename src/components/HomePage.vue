<template>
  <div class="q-pa-md">
    <div class="q-pa-md q-mr-sm rounded-borders">
      <div class="text-h4 text-black">Home Page</div>
<!--      <div class="text-h5 text-black">{{ store.state.layout.layoutDetails.title }}</div>-->
      <div class="text-h56text-black">Version 2.2</div>
      <div class="text-h56text-black">Host : {{  host }}</div>
      <div class="text-h56text-black">USB Port : {{  store.state.com_port }}</div>
      <div class="text-h56text-black">Selected Node : {{  store.state.selected_node }}</div>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";

const store = inject('store')
const host = window.location.hostname


</script>

<style scoped>

</style>
