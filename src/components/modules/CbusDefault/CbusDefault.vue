<template>
  <div class="text-h56text-black">Cbus Default Component</div>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="info" label="Info" />
    <q-tab name="variables" label="Variables" v-if="flim" />
    <q-tab name="events" label="Events" v-if="flim" />
  </q-tabs>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="info" class="bg-white">
      <cbus-default-info />
    </q-tab-panel>

    <q-tab-panel name="variables" class="bg-white">
      <cbus-default-variables />
    </q-tab-panel>

    <q-tab-panel name="events" class="bg-white">
      <cbus-default-events />
    </q-tab-panel>
  </q-tab-panels>

</template>

<script>
import { defineComponent, inject, ref } from "vue";
import CbusDefaultInfo from "components/modules/CbusDefault/CbusDefaultInfo.vue";
import CbusDefaultVariables from "components/modules/CbusDefault/CbusDefaultVariables.vue";
import CbusDefaultEvents from "components/modules/CbusDefault/CbusDefaultEvents.vue"
/*import EssentialLink from "components/EssentialLink";
import HomePage from "components/HomePage";
import NodesList from "components/NodesList";
import NodePage from "components/NodePage";
import EventsList from "components/EventsList";
import SettingsPage from "components/SettingsPage";
import MessagesList from "components/MessagesList";
import JsonData from "components/JsonData";*/

export default defineComponent({
  name: "MainLayout",

  components: {
    CbusDefaultInfo, CbusDefaultVariables, CbusDefaultEvents
  },

  setup() {
    const store = inject("store");
    const tab = ref("info");
    const flim = (store.state.nodes[store.state.selected_node]["flags"] & 4) ? true : false;

    return { tab, flim };
    /*    store.methods.request_node_parameters(store.state.selected_node)

    const module = store.state.nodes[store.state.selected_node]["moduleIdentifier"]
    const flags = store.state.nodes[store.state.selected_node]['flags']

    const flim = (store.state.nodes[store.state.selected_node]['flags'] & 4) ? true : false
    const consumer = (store.state.nodes[store.state.selected_node]['flags'] & 1) ? true : false
    const producer = (store.state.nodes[store.state.selected_node]['flags'] & 2) ? true : false
    const bootloader = (store.state.nodes[store.state.selected_node]['flags'] & 8) ? true : false
    const coe = (store.state.nodes[store.state.selected_node]['flags'] & 16) ? true : false
    const learn = (store.state.nodes[store.state.selected_node]['flags'] & 32) ? true : false*/
  }
});
</script>

<style scoped>

</style>
