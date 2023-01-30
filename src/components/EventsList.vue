<template>
  <div class="q-pa-md">
    <q-table
      title="Events"
      :rows=eventList
      :columns="columns"
      :filter="filter"
      row-key="id"
      virtual-scroll
      v-model:pagnation="pagnation"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
    >
      <template v-slot:top="">
        <div class="col-2 q-table__title text-h4">Events</div>
        <q-space/>
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-space/>
<!--        <q-btn color="negative" label="Refresh Events" @click="store.methods.refresh_events()" no-caps/>
        <q-space/>-->
        <q-btn color="negative" label="Clear Events" @click="store.methods.clear_events()" no-caps/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
<!--          <q-td key="expand" auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'remove' : 'add'"/>
          </q-td>-->
          <!--          <q-td key="eventName" :props="props" :class="'text-'+event_colour(props.row.id)">
                      <div class="text-pre-wrap"  >{{ event_name(props.row.id) }}</div>
                    </q-td>-->
          <q-td key="eventIdentifier" :props="props" :class="'text-'+event_colour(props.row.id)">{{
              props.row.eventIdentifier
            }}
          </q-td>
          <q-td key="nodeNumber" :props="props" :class="'text-'+event_colour(props.row.id)">{{
              props.row.nodeNumber
            }}
          </q-td>
          <q-td key="eventNumber" :props="props" :class="'text-'+event_colour(props.row.id)">{{
              props.row.eventNumber
            }}
          </q-td>
          <q-td key="status" :props="props">
            <q-chip color="white" text-color="green" v-if="props.row.status=='on'">ON</q-chip>
            <q-chip color="white" text-color="red" v-else>OFF</q-chip>
          </q-td>
<!--          <q-td key="type" :props="props" :class="'text-'+event_colour(props.row.id)">{{ props.row.type }}</q-td>
          <q-td key="count" :props="props" :class="'text-'+event_colour(props.row.id)">{{ props.row.count }}</q-td>-->

          <!--          <q-td key="status" :props="props">
                      <q-btn color="primary" flat rounded label="Edit"
                             @click="editNode(props.row.nodeNumber, props.row.component)" no-caps/>
                    </q-td>-->
        </q-tr>
<!--        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <event-details
              :eventIdentifier="props.row.id"
              :nodeNumber="props.row.nodeNumber"
              :eventNumber="props.row.eventNumber"
              :type="props.row.type"
            ></event-details>
          </q-td>
        </q-tr>-->
      </template>
    </q-table>
    <div class="text">{{ store.state["events"] }}</div>
  </div>
</template>

<script setup>
import { inject, ref, onBeforeMount, computed, watch } from "vue";

const store = inject("store");
const filter = ref('')
const pagnation = {rowsPerPage: 0}

const columns = [
  {name: 'eventIdentifier', field: 'eventIdentifier', required: true, label: 'Event Identifier', align: 'left', sortable: true},
  {name: 'nodeNumber', field: 'nodeNumber', required: true, label: 'Node Number', align: 'left', sortable: true},
  {name: 'eventNumber', field: 'eventNumber', required: true, label: 'Event Number', align: 'left', sortable: true},
  {name: 'status', field: 'status', required: true, label: 'Status', align: 'left', sortable: true},
  {name: 'actions', field: 'actions', required: true, label: 'Actions', align: 'left', sortable: false}
]

const eventList = computed(() => {
  //console.log(`Computed Events`)
  return Object.values(store.state.events)
})

const event_colour = (eventId) => {
  return 'black'
}

</script>

<style scoped>

</style>
