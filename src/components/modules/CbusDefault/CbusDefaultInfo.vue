<template>
  <div class="text-h6">PNN Data Info</div>
  <div class="text-h56text-black">Module : <b>{{ module }}</b></div>
  <div class="text-h56text-black">Flags : <b>{{ flags }}</b></div>
  <div class="text-h56text-black">Flim : {{ flim }}</div>
  <div class="text-h56text-black">Consumer : {{ consumer }}</div>
  <div class="text-h56text-black">Producer : {{ producer }}</div>
  <div class="text-h56text-black">Boot Loader : {{ bootloader }}</div>
  <div class="text-h56text-black">Consume Own Events : {{ coe }}</div>
  <div class="text-h56text-black">Learn Mode : {{ learn }}</div>
  <div class="text-h6">Parameter Data</div>
  <div class="text-h56text-black">Number of Variables : {{ nodeParameters[6] }}</div>
  <div class="text-h56text-black">Number of Event Variables : {{ nodeParameters[5] }}</div>
  <div class="text-h56text-black">Paran Flags : {{ nodeParameters[8] }}</div>
  <div class="text-h56text-black">Version : {{ nodeParameters[7] }}.{{ nodeParameters[2] }}.{{ nodeParameters[20] }}</div>
  <div class="text-h56text-black">Parameters : {{ nodeParameters }}</div>
  <div class="text-h56text-black">Services : {{ nodeServices }}</div>

</template>

<script setup>
import { inject, onBeforeMount, ref, watch, computed } from "vue";

const store = inject('store')
//const tab = ref('info')

//store.methods.request_node_parameters(store.state.selected_node)

const version = ref('')

const module = store.state.nodes[store.state.selected_node]["moduleIdentifier"]
const flags = store.state.nodes[store.state.selected_node]['flags']

const flim = (store.state.nodes[store.state.selected_node]['flags'] & 4) ? true : false
const consumer = (store.state.nodes[store.state.selected_node]['flags'] & 1) ? true : false
const producer = (store.state.nodes[store.state.selected_node]['flags'] & 2) ? true : false
const bootloader = (store.state.nodes[store.state.selected_node]['flags'] & 8) ? true : false
const coe = (store.state.nodes[store.state.selected_node]['flags'] & 16) ? true : false
const learn = (store.state.nodes[store.state.selected_node]['flags'] & 32) ? true : false

const nodeParameters = computed(() => {
  //console.log(`Computed Events`)
  return store.state.nodes[store.state.selected_node]['parameters']
})

watch(nodeParameters, () => {
  console.log(`WATCH Node Parameters`)
  //updateGroupList()
})

const nodeServices = computed(() => {
  //console.log(`Computed Events`)
  return store.state.nodes[store.state.selected_node]['services']
})

watch(nodeServices, () => {
  console.log(`WATCH Node Parameters`)
  //updateGroupList()
})

const updateParameters = () => {
  version.value = ''
}

onBeforeMount(() => {
  store.methods.request_node_parameters(store.state.selected_node)
})

</script>

<style scoped>

</style>
