<template>
  <div class="full-width" >
    <q-table
      title="Consumed Events"
      :rows=nodeEvents
      :columns="columns"
      row-key="eventIdentifier"
      virtual-scroll
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="eventIdentifier" :props="props">{{ props.row.eventIdentifier }}</q-td>
          <q-td key="eventIndex" :props="props">{{ props.row.eventIndex }}</q-td>
          <q-td key="edit" :props="props">
            <q-btn color="primary" flat rounded label="Edit" @click="editEvent(props.row.eventIndex)" no-caps/>
            <q-btn color="negative" flat rounded label="Delete"
                   @click="removeEvent(store.state.selected_node, props.row.eventIdentifier)" no-caps/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
  <div class="text">{{ nodeEvents }}</div>
</template>

<script setup>

import { inject, onBeforeMount, ref, watch, computed } from "vue";

const store = inject('store')

const columns = [
  {name: 'eventIdentifier', field: 'eventIdentifier', required: true, label: 'EventId', align: 'left', sortable: true},
  {name: 'eventIndex', field: 'eventIndex', required: true, label: 'Event Index', align: 'left', sortable: true},
  {name: 'edit', field: 'edit', required: true, label: 'Edit', align: 'left', sortable: true}
]

const nodeEvents = computed(() => {
  //console.log(`Computed Events`)
  return Object.values(store.state.nodes[store.state.selected_node]['events'])
})

watch(nodeEvents, () => {
  console.log(`WATCH Node Variables`)
  //updateGroupList()
})

onBeforeMount(() => {
  store.state.nodes[store.state.selected_node]['events'] = {}
  store.methods.request_node_events(store.state.selected_node)
})

const editEvent = (eventIndex) => {
  console.log(`editEvent`)
  store.state.selected_event_index = eventIndex
  store.state.event_component = 'CbusDefaultEventVariables'
}

const removeEvent = (nodeId, eventIndex) => {
  console.log(`removeEvent`)
}
</script>

<style scoped>

</style>
