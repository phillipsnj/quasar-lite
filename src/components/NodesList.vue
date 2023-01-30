<template>
  <q-table
    title="Nodes"
    :rows=nodeList
    :columns="columns"
    :filter="filter"
    row-key="nodeNumber"
    virtual-scroll
    :rows-per-page-options="[0]"
    :virtual-scroll-sticky-size-start="48"
  >
    <template v-slot:top="">
      <div class="col-2 q-table__title text-h4">Nodes</div>
      <q-space/>
      <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>
      <q-space/>
      <q-btn color="negative" label="Check Nodes" @click="store.methods.QNN()" no-caps/>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="nodeNumber" :props="props">{{ props.row.nodeNumber }}</q-td>
        <q-td key="moduleIdentifier" :props="props">{{ props.row.moduleIdentifier }}</q-td>
        <q-td key="flags" :props="props">{{ props.row.flags }}</q-td>
        <q-td key="status" :props="props">
          <q-chip color="white" text-color="green" v-if="props.row.status">OK</q-chip>
          <q-chip color="white" text-color="red" v-else>Error</q-chip>
        </q-td>
        <q-td key="actions" :props="props">
          <q-btn color="primary" flat rounded label="Edit"
                 @click="editNode(props.row.nodeNumber)" no-caps/>
          <q-btn color="negative" flat rounded label="Delete"
                 @click="deleteNode(props.row.nodeNumber)" no-caps/>
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <div class="text-h56text-black">{{ nodeList }}</div>
</template>

<script setup>
import {inject, ref, onBeforeMount, computed, watch} from "vue"

const store = inject('store')
const filter = ref('')
const rows = ref([])

const columns = [
  {name: 'nodeNumber', field: 'nodeNumber', required: true, label: 'Node Number', align: 'left', sortable: true},
  {name: 'moduleIdentifier', field: 'moduleIdentifier', required: true, label: 'Module', align: 'left', sortable: true},
  {name: 'flags', field: 'flags', required: true, label: 'Flags', align: 'left', sortable: true},
  {name: 'status', field: 'status', required: true, label: 'Status', align: 'left', sortable: true},
  {name: 'actions', field: 'actions', required: true, label: 'Actions', align: 'left', sortable: false}
]

const nodeList = computed(() => {
  //console.log(`Computed Events`)
  return Object.values(store.state.nodes)
})

/*watch(nodeList, () => {
  //console.log(`WATCH Nodes`)
  update_rows()
})*/

onBeforeMount(() => {
  //console.log(`Node onBeforeMount`)
  store.methods.QNN()
})

const editNode = (nodeId) => {
  store.state.selected_node = nodeId
  store.state.display_component = "NodePage"
}
const deleteNode = (nodeId) => {
  store.methods.remove_node(nodeId)
}

</script>

<style scoped>

</style>
