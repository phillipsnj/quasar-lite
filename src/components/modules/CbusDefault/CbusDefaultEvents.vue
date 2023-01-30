<template>
  <component v-bind:is="store.state.event_component"></component>
</template>

<script>
import { inject, onBeforeMount } from "vue";
import CbusDefaultEventsList from "components/modules/CbusDefault/CbusDefaultEventsList.vue";
import CbusDefaultEventVariables from "components/modules/CbusDefault/CbusDefaultEventVariables.vue";

export default {
  name: "CbusDefaultEvents",
  components: { CbusDefaultEventsList, CbusDefaultEventVariables },
  setup() {
    const store = inject("store");
    onBeforeMount(() => {
      store.state.event_component = "CbusDefaultEventsList";
    });
    return {
      store
    };
  }
};
</script>

<style scoped>

</style>
