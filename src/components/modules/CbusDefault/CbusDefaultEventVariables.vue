<template>
  <div class="text-h5">CbusDefaultEventVariables</div>
  <div class="text">Node Number : {{ store.state.selected_node }}</div>
  <div class="text">Event Index : {{ store.state.selected_event_index }}</div>
  <div class="text">Event : {{ store.state.nodes[store.state.selected_node]['events'][store.state.selected_event_index] }}</div>
  <div class="text">{{ eventVariables }}</div>
  <div class="q-pa-md row">
    <EventVariable :eventVariableIndex="n"
                   :eventIndex = store.state.selected_event_index
                   :nodeNumber="store.state.selected_node"
                   :eventName="store.state.nodes[store.state.selected_node]['events'][store.state.selected_event_index]"
                   v-for="n in store.state.nodes[store.state.selected_node].parameters[5]"
                   :key="n">
    </EventVariable>
  </div>
</template>

<script setup>
import {inject, onBeforeMount, computed, watch} from "vue"
import EventVariable from 'components/common/EventVariable.vue'

const store = inject('store')

const eventVariables = computed(() =>{
  return store.state.nodes[store.state.selected_node]['events'][store.state.selected_event_index]['variables']
})

watch(eventVariables, () => {
  console.log(`eventVariables`)
})

onBeforeMount(() => {
  console.log('DefaultEventVariables')
  store.methods.request_all_event_variables(
    store.state.selected_node,
    store.state.selected_event_index
  )
})
</script>

<style scoped>

</style>
