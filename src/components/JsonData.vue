<template>
  <div class="text-h6">JSON</div>
  <pre>
    {{ JSON.stringify(nodeList, null, 2) }}
  </pre>
  <pre>{{ nodeList }}</pre>
</template>

<script setup>
import {inject, ref, onBeforeMount, computed, watch} from "vue"

const store = inject('store')

const nodeList = computed(() => {
  //console.log(`Computed Events`)
  return Object.values(store.state.nodes)
})
</script>

<style scoped>

</style>
