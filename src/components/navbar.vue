<template>
  <v-app-bar class="flex bg-surface-variant" block prominent :elevation="2">
    <v-btn class="ml-2 flex items-center mr-3" variant="icon" @click.stop="$emit('open')">
      <span class="mdi mdi-format-list-checkbox mdi-24px"></span>
      <p class="ml-2 capitalize">List of Assets</p>
    </v-btn>

    <v-btn
      class="flex items-center mdi mdi-plus-circle-outline mdi-24px mr-3"
      variant="text"
      @click="addAsset"
    >
      <p class="ml-2 capitalize">Add an Asset</p>
    </v-btn>

    <v-btn
      class="flex items-center mdi mdi-magnify mdi-24px mr-1"
      variant="text"
      @click="searchAssets"
    >
      <p class="ml-2 capitalize">Search</p>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      class="flex items-center ml-2 mdi mdi-clock-time-three-outline mdi-24px"
      @click="changelog"
      variant="text"
    >
      <p class="ml-2 capitalize">Changelog</p>
      <div class="bg-red rounded-sm ml-2 px-2 py-1 capitalize">{{ Month }} {{ date }}</div>
    </v-btn>

    <v-btn
      class="flex items-center ml-4 mdi mdi-tag-outline mdi-24px"
      @click="BuyAssetTags"
      variant="text"
    >
      <p class="ml-2 capitalize">Buy Asset Tags</p>
    </v-btn>

    <v-menu v-model="menuOpen">
      <template v-slot:activator="{ props }">
        <v-btn
          class="flex items-center -ml-4 px-4 mdi mdi-account-circle mdi-24px mx-4"
          v-bind="props"
        >
          <p class="ml-2 capitalize">admin</p>
          <v-icon
            :class="{ 'mdi-chevron-right': !menuOpen, 'mdi-chevron-down': menuOpen }"
            class="mdi mdi-20px ml-2"
          ></v-icon>
        </v-btn>
      </template>

      <!-- M E N U -->
      <v-list class="mt-2">
        <div>
          <v-list-item>
            <div class="flex justify-center mt-3">
              <img :src="imageURL" />
              <v-icon class="mdi-48px">mdi-account-circle</v-icon>
            </div>
            <div class="flex justify-center mt-7">
              <v-list-item-title>admin</v-list-item-title>
            </div>
          </v-list-item>
        </div>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          v-for="(item, index) in items"
          :key="item.title"
          :value="index"
          :to="item.path"
        >
          <v-list-item-content class="flex">
            <v-avatar class="mr-2 flex">
              <v-icon>{{ item.file }}</v-icon>
            </v-avatar>
            <div class="my-1">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item v-for="(item, index) in items2" :key="item.title" :value="index">
          <v-list-item-content class="flex">
            <v-avatar class="mr-2 flex">
              <v-icon>{{ item.file }}</v-icon>
            </v-avatar>
            <div class="flex align-center">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-btn class="bg-red rounded-2sm m-3 capitalize ml-3" @click="handleLogout">
          <span class="capitalize">Log out</span>
        </v-btn>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const currentDate = new Date()
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const Month = ref(month[currentDate.getMonth()])
const date = ref(currentDate.getDate())

const menuOpen = ref(false)

const router = useRouter()

const handleLogout = () => {
  router.push({ path: '/login' })
}

const items = ref([
  {
    title: 'My Profile',
    subtitle: 'Account settings and more',
    file: 'mdi-account',
    path: '/profile'
  },
  { title: 'Change Password', subtitle: 'Password Settings', file: 'mdi-key-variant' }
])

const items2 = ref([
  { title: 'Account Details', file: 'mdi-account' },
  { title: 'Subcription Plans', file: 'mdi-diamond-stone' }
])
defineEmits(['open'])
</script>
