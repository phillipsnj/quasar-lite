<template>
  <q-layout view="lHh Lpr lFf">
<!--    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>-->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          quasar-lite
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
<!--      <h3>{{ store.state.display_component }}</h3>-->
<!--      <router-view />-->
      <component v-bind:is="store.state.display_component"></component>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, inject} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import HomePage from "components/HomePage.vue"
import NodesList from "components/NodesList.vue"
import NodePage from "components/NodePage.vue"
import EventsList from "components/EventsList.vue"
import SettingsPage from "components/SettingsPage.vue"
import MessagesList from "components/MessagesList.vue"
import JsonData from "components/JsonData.vue"

const linksList = [
  {
    title: "Home",
    caption: "Home Page",
    icon: "home",
    component: "HomePage",
  },
  {
    title: "Nodes",
    caption: "MERG Modules",
    icon: "mdi-timeline-outline",
    component: "NodesList",
  },
  {
    title: "Events",
    caption: "Captured Events",
    icon: "mdi-gesture-double-tap",
    component: "EventsList",
  },
  {
    title: "Settings",
    caption: "FCU Settings",
    icon: "mdi-cog-outline",
    component: "SettingsPage",
  },
  {
    title: "JSON",
    caption: "Store Details",
    icon: "mdi-database",
    component: "JsonData",
  },
  {
    title: "Messages",
    caption: "Messages",
    icon: "mdi-alert",
    component: "MessagesList",
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink, HomePage, NodesList, NodePage, EventsList, SettingsPage, MessagesList, JsonData
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const store = inject('store')

    return {
      store,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        // leftDrawerOpen.value = !leftDrawerOpen.value
        leftDrawerOpen.value = true
      }
    }
  }
})
</script>
