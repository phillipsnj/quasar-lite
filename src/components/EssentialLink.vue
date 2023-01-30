<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="store.methods.update_display_component(component)"
  >
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, inject, ref } from "vue";

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    component: {
      type: String,
      default: "home",
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup () {
    const store = inject('store')
    return {
      store
    }
  }
})
</script>
