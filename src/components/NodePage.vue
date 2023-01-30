<template>
  <div class="text-h4">Node Page</div>
  <div>
    <component v-bind:is="display_component"></component>
  </div>
</template>

<script>
import {inject, onBeforeMount} from "vue"

import CbusDefault from "components/modules/CbusDefault/CbusDefault.vue"

export default {
  name: "NpdePage",
  components: {CbusDefault},
  setup() {
    const store = inject('store')
    const display_component = "CbusDefault"
    return {
      store, display_component
    }
  }
}

</script>

<style scoped>

</style>
