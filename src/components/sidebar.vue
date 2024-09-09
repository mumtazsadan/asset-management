<template>
    <v-navigation-drawer class="bg-slate-500" location="left">
    <v-list density="compact" class="space-x-4">
      <v-list-subheader class="flex justify-center">
        <span class="font-weight-black text-h2" style="font-family: 'nunito', sans-serif;">ASSET</span>
      </v-list-subheader>
      <v-list-subheader><img src="../assets/foto/arkamaya.png" class=""></img></v-list-subheader>
  
      <v-list>
        <v-list-group v-for="(item, i) in parentData" :class="{'sidebar-link-active': $route.path === item.path}" :key="i" :prepend-icon="item.icon" :title="item.title" :value="item.title"  :expand-icon="getSubData(item.title).length ? 'mdi-chevron-down' : 'undefined'" @click="handleItemClick(item)">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props"></v-list-item>
          </template>
          <v-list-item v-for="(subItem, j) in getSubData(item.title)" :class="{'sidebar-link-active': $route.path === subItem.path}" :key="j" :prepend-icon="subItem.icon" :title="subItem.title" :value="subItem.title" :to="subItem.path" class="{ 'sidebar-link-active': $route.path === subItem.path }" compact></v-list-item>
        </v-list-group>
      </v-list>
      <v-divider ></v-divider>
      <v-list>
        <v-treeview :items="data" @submit.prevent="handlePath">
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.file">
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>
        </template>
      </v-treeview>
    </v-list>
  </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { VTreeview } from 'vuetify/labs/VTreeview'


const subData = ref({
    'admin': [
    { title: 'My Profile', icon: 'mdi-account-circle', path: '/profile' },
    { title: 'Change Password', icon: 'mdi-key-variant', path: '/change-password' },
    { title: 'Account Details', icon: 'mdi-account', path: '/account-details' },
    { title: 'Subscription Plans', icon: 'mdi-diamond-stone', path: '/subscription-plans' }
  ],
  'Assets' : [
    {title : 'List of Assets', icon: 'mdi-format-list-checkbox', path: '/list-of-assets'},
    {title: 'Add an Asset', icon: 'mdi-plus-circle-outline', path: '/add-an-asset'},
    {title: 'Check Out', icon: 'mdi-account-check-outline', path:'/check-out'},
    {title: 'Check In', icon: 'mdi-account-cancel-outline', path:'/check-in'},
    {title: 'Lease', icon: 'mdi-send-outline', path:'/lease'},
    {title: 'Lease Return', icon: 'mdi-send-outline', path:'/lease-return'},
    {title: 'Dispose', icon: 'mdi-recycle-variant', path:'/dispose'},
    {title: 'Maintenance', icon: 'mdi-cogs', path:'/maintenance'},
    {title: 'Move', icon: 'mdi-arrow-all', path:'/move'},
    {title: 'Reserve', icon: 'mdi-calendar-month-outline', path:'/reserve'},
  ]
})

// const parentData = ref([
//   [ 'admin',  'mdi-account-circle' ],
//   [ 'Dashboard',   'mdi-home-outline', '/dashboard'],
//   [ 'Alert',  'mdi-flag', '/'],
//   [ 'Assets',  'mdi-puzzle-outline', ''],
//   [ 'List', 'mdi-format-list-checkbox', ''],
//   [ 'Reports', 'mdi-file-chart-outline', ''],
//   [ 'Tools', 'mdi-wrench-outline', ''],
//   [ 'Advanced',  'mdi-toolbox-outline', ''],
//   [ 'Setup', 'mdi-cog-outline', ''],
//   [ 'Help/Support',  'mdi-lifebuoy', '']
// ]);

const parentData = ref([
  {title : 'admin', icon: 'mdi-account-circle', path : '' },
  {title : 'Dashboard', icon:  'mdi-home-outline', path : '/dashboard'},
  {title : 'Alert', icon: 'mdi-flag', path : '/alert'},
  {title : 'Assets', icon: 'mdi-puzzle-outline', path : ''},
  {title : 'List', icon: 'mdi-format-list-checkbox', path : '/list'},
  {title : 'Reports', icon: 'mdi-file-chart-outline', path : 'reports'},
  {title : 'Tools', icon: 'mdi-wrench-outline', path : '/tools'},
  {title : 'Advanced', icon:  'mdi-toolbox-outline', path : '/advanced'},
  {title : 'Setup', icon: 'mdi-cog-outline', path : '/setup'},
  {title : 'Help/Support', icon:  'mdi-lifebuoy', path : 'help'}
]);

//mendapatkan subData
const getSubData = (title) => {
  return subData.value[title] || []
}

const route = useRouter()

const handleItemClick = (item) => {
  if (item.path) {
    // Navigasi ke path jika tersedia
    if (route.path !== item.path) {
      route.push(item.path)
    }
  }
}

//data loopping v-treeview
const files = {
  profile: 'mdi-account-circle',
  dash: 'mdi-home-outline',
  alert: 'mdi-flag',
  asset: 'mdi-puzzle-outline',
  listAsset: 'mdi-format-list-checkbox',
  addAsset: 'mdi-plus-circle-outline',
  checkout: 'mdi-account-check-outline',
  checkin: 'mdi-account-cancel-outline',
  lease: 'mdi-send-outline',
  dispose: 'mdi-recycle-variant',
  maintenance: 'mdi-cogs',
  move: 'mdi-arrow-all',
  reserve: 'mdi-calendar-month-outline',
  list: 'mdi-format-list-checkbox',
  reports: 'mdi-file-chart-outline',
  tools: 'mdi-wrench-outline',
  advanced: 'mdi-toolbox-outline',
  setup: 'mdi-cog-outline',
  help: 'mdi-lifebuoy',
  password : 'mdi-key-variant',
  acc : 'mdi-account',
  subs : 'mdi-diamond-stone'
}


const selectedPath = ref(null)

const getNodePath = (node) => {
  if(!node.parent){
    return ''
  }
  const parentPath = getNodePath(node.parent)
  return `${parentPath}/${node.title}`
}

const data = ref([
  {
    id: 1,
    title: 'PT.Arkamaya',
    file: 'profile',
    children:[
      {id:3, title: 'My Profile', file: 'acc'},
      { id:4, title: 'Change Password', file: 'password' },
      { id:5, title: 'Account Details', file: 'acc' },
      {id:6, title: 'Subcription Plans', file: 'subs' },
    ]
  },
  {
    id: 2,
    title: 'Dashboard',
    file: 'dash',
    path:'/dashboard',
  },
  {
    id: 3,
    title: 'Alert',
    file: 'alert',
  },
  {
    id: 4,
    title: 'Asset',
    file: 'asset',
    children: [
      { id: 5, title: 'List of Assets', file: 'listAsset', path: '/list-of-asset' },
      { id: 6, title: 'Add an Asset', file: 'addAsset', path: '/add-an-asset' },
      { id: 7, title: 'Check Out', file: 'checkout' },
      { id: 8, title: 'Check In', file: 'checkin' },
      { id: 9, title: 'Lease', file: 'lease' },
      { id: 10, title: 'Lease Return', file: 'lease' },
      { id: 11, title: 'Dispose', file: 'dispose' },
      { id: 12, title: 'Maintenance', file: 'maintenance' },
      { id: 13, title: 'Move', file: 'move' },
      { id: 14, title: 'Reserve', file: 'reserve' }
    ]
  },
  {
    id: 15,
    title: 'List',
    file: 'list',
  },
  {
    id: 16,
    title: 'Reports',
    file: 'reports',
  },
  {
    id: 17,
    title: 'Tools',
    file: 'tools',
  },
  {
    id: 18,
    title: 'Advanced',
    file: 'advanced',
  },
  {
    id: 18,
    title: 'Setup',
    file: 'setup',
  },
  {
    id: 19,
    title: 'Help/Support',
    file: 'help',
  }
])



const handlePath = (item) => {
  if (item.path) {
    // Navigasi ke halaman yang sesuai dengan path item yang dipilih
    route.push(item.path);
  }
}


//props
defineProps({
    data: {
        type: Object,
        required: true
    }
})


</script>
<style scoped>
.sidebar-link-active {
  background-color: #757575; 
  color: #fff;
  border-radius: 0 20px 20px 0;
}

.sidebar-link-active {
  background-color: orange;
  color: black;
}


</style>