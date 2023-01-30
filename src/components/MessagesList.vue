<template>
  <h4>Messages</h4>
<!--  <p>{{ store.state.messages }}</p>-->
  <q-virtual-scroll
    style="max-height: 300px;"
    :items="store.state.messages">
    <template #default="{ item, index }">
    <q-item
      :key="index"
      dense
    >
      <q-item-section>
        <q-item-label>
          {{ item }}
        </q-item-label>
      </q-item-section>
    </q-item>
    </template>
  </q-virtual-scroll>
</template>

<script setup>
import { inject } from "vue";

const store = inject("store");

</script>

<style scoped>

</style>
