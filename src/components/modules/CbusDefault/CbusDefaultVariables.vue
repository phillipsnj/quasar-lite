<template>
  <div class="text-h6">Node Variables</div>
  <div class="text">{{ nodeVariables }}</div>
  <div class="q-pa-xs row">
    <NodeVariable :node-variable-index="n"
                  :node-number=store.state.selected_node
                  v-for="n in store.state.nodes[store.state.selected_node].parameters[6]"
                  :key="n">
    </NodeVariable>
  </div>
</template>

<script setup>
import { inject, onBeforeMount, ref, watch, computed } from "vue"
import NodeVariable from 'components/common/NodeVariable.vue'

const store = inject('store')

const nodeVariables = computed(() => {
  //console.log(`Computed Events`)
  return store.state.nodes[store.state.selected_node]['variables']
})

watch(nodeVariables, () => {
  console.log(`WATCH Node Variables`)
  //updateGroupList()
})

onBeforeMount(() => {
  store.methods.request_node_variables(store.state.selected_node)
})

</script>

<style scoped>

</style>
