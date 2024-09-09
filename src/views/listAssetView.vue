<template>
  <v-main :style="{ backgroundColor: '#E5E7EB', minHeight: '100vh' }" :isUpdate="true">
    <v-container class="">
      <div class="pt-6 pb-3 px-6 flex">
        <v-icon class="mb-2 mdi mdi-format-list-checkbox mdi-24px"></v-icon>
        <span class="ml-2 text-h5">List of Assets</span>
      </div>
      <v-container width="auto">
        <v-card flat class="px-6 py-6 mx-auto" rounded="sm">
          <div class="my-2 flex justify-center align-center">
            <v-icon class="mdi mdi-map-marker mdi-24px mb-1"></v-icon>
            <span class="text-h6 font-weight-bold mx-2">Search Assets.</span>

            <v-spacer></v-spacer>

            <v-btn class="mx-1" density="compact" capitalize variant="outlined">
              <v-icon class="">mdi-magnify</v-icon>
              <span class="capitalize px-1 py-1">Export to Excel</span>
            </v-btn>
            <v-btn class="mx-1" density="compact" capitalize variant="outlined">
              <v-icon class="">mdi-cog-outline</v-icon>
              <span class="capitalize px-1 py-1">Search Criteria.</span>
            </v-btn>
          </div>
          <v-divider :thickness="1" class="border-opacity-100 mt-3 mb-2"></v-divider>
          <div>
            <v-card flat>
              <template v-slot:text>
                <v-text-field
                  v-model="search"
                  label="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                  width="250px"
                  density="compact"
                ></v-text-field>
              </template>
              <v-data-table
                :headers="headers"
                :items="assets"
                :search="search"
                show-select
                :mobile-breakpoint="breakpoint"
                class="border-sm striped-table elevation-1"
              >
                <template v-slot:item.cost="{ item }">Rp {{ item.cost }} </template>

                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)" label>
                    {{ getStatusText(item.status) }}
                  </v-chip>
                </template>

                <template v-slot:item.image="{ item }">
                  <v-img :src="item.image" alt="Random image" height="50" width="50"></v-img>
                </template>

                <template v-slot:item.purchaseDate="{ item }">
                  {{ formatDate(item.purchaseDate) }}
                </template>

                <template v-slot:item.action="{ item }">
                  <v-btn
                    @click="openDialog(item)"
                    class="d-flex align-center justify-center"
                    density="compact"
                    variant="elevated"
                  >
                    <v-icon class="mdi mdi-eye-outline"></v-icon>
                    <span class="capitalize px-1">View</span>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </div>

          <v-alert
            closable
            v-model="successAlert"
            type="success"
            transition="fade-transition"
            class="custom-alert success"
          >
            Data berhasil dihapus!
          </v-alert>

          <!-- v-alert untuk menampilkan pesan kesalahan -->
          <v-alert
            closable
            v-model="errorAlert"
            type="error"
            transition="fade-transition"
            class="custom-alert error"
          >
            Gagal menghapus data. Silakan coba lagi.
          </v-alert>
          <!-- dialog -->
          <v-dialog v-model="dialogVisible" max-width="500">
            <v-card class="text-h6">
              <v-card-title class="ml-2 pt-2 text-h4">
                Asset
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="">
                <div class="pb-3">
                  <div class="text-h5 font-weight-bold">{{ selectedAsset.assetTagId }}</div>
                </div>
                <div v-if="selectedAsset" class="flex">
                  <v-img :src="selectedAsset.image" max-width="250"></v-img>
                  <div class="align-center ml-4 my-1">
                    <div class="py-1">
                      <span class="title-card">Brand</span>
                      <div>{{ selectedAsset.brand }}</div>
                    </div>
                    <div class="py-1">
                      <span class="title-card">Serial No</span>
                      <div>{{ selectedAsset.serialNo }}</div>
                    </div>
                    <div class="py-1">
                      <span class="title-card">Purchase Date</span>
                      <div>{{ formatDate(selectedAsset.purchaseDate) }}</div>
                    </div>
                    <div class="py-1">
                      <span class="title-card">Cost</span>
                      <div>Rp {{ selectedAsset.cost }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="selectedAsset" class="">
                  <v-row class="mb-2">
                    <v-col cols="6">
                      <div class="mt-2">
                        <span class="title-card">Status</span>
                        <div>{{ selectedAsset.status }}</div>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="mt-2">
                        <span class="title-card">Assigned To</span>
                        <div>{{ selectedAsset.assignedTo }}</div>
                      </div>
                    </v-col>
                  </v-row>
                  <div>
                    <span class="title-card">Description</span>
                    <div>{{ selectedAsset.description }}</div>
                  </div>
                </div>
                <v-spacer></v-spacer>
              </v-card-text>
              <div class="flex px-2 py-2">
                <v-btn
                  @click=""
                  density="compact"
                  variant="elevated"
                  class="mx-1 bg-yellow-accent-1"
                  >Edit</v-btn
                >
                <v-btn
                  @click="deleteData(item)"
                  density="compact"
                  variant="elevated"
                  class="mx-1 bg-red-accent-1"
                  >Delete</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog" density="compact" variant="elevated">close</v-btn>
              </div>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import laptop from '../assets/foto/laptop.jpg'
// import axios from 'axios'

const store = useStore()

const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY')
}

const successAlert = ref(false)
const errorAlert = ref(false)

const assets = computed(() =>
  store.state.assets.map((item) => ({
    ...item,
    image: laptop,
    action: '/assetView/' + item.id // Misalnya, action berisi path untuk melihat detail item
  }))
)

// Fungsi untuk mendapatkan warna latar belakang chip berdasarkan status
const getStatusColor = (status) => {
  return status === 'Available' ? 'green' : 'blue'
}

// Fungsi untuk mendapatkan teks status
const getStatusText = (status) => {
  return status === 'Available' ? 'Available' : 'Checked Out'
}

const search = ref('')
const headers = ref([
  { title: 'Image', value: 'image' },
  { title: 'Asset Tag ID', value: 'assetTagId' },
  { title: 'Description', value: 'description' },
  { title: 'Brand', value: 'brand' },
  { title: 'Serial No', value: 'serialNo' },
  { title: 'Purchase Date', value: 'purchaseDate' },
  { title: 'Cost', value: 'cost' },
  { title: 'Status', value: 'status' },
  { title: 'Assigned To', value: 'assignedTo' },
  { title: 'Action', value: 'action' }
])

const dialogVisible = ref(false)
const selectedAsset = ref(null)

function openDialog(item) {
  selectedAsset.value = item
  dialogVisible.value = true
}

function closeDialog() {
  dialogVisible.value = false
}

const deleteData = () => {
  // Memanggil metode untuk menghapus asset yang dipilih
  if (selectedAsset.value) {
    // Memanggil metode deleteAsset dari store atau komponen lainnya
    store
      .dispatch('deleteAsset', selectedAsset.value.id)
      .then(() => {
        // Sukses hapus asset, lakukan tindakan yang diperlukan (jika ada)
        // Misalnya, tampilkan pesan atau perbarui tampilan
        successAlert.value = true
        closeDialog()
      })
      .catch((error) => {
        // Tangani kesalahan jika terjadi
        errorAlert.value = true
        closeDialog()
      })
  }
}

//tampil data
onMounted(() => {
  store.dispatch('fetchData')
})

const breakpoint = 300
</script>
<style scoped>
.my-table th {
  background-color: #e5e7eb;
}
.my-table tr td {
}
.green-background {
  background-color: #3df74473;
}

.blue-background {
  background-color: #008cff6e;
}

.my-table td {
  display: block;
  text-align: center;
  border-right: 1px solid #ddd;
}

.custom-alert {
  font-size: 12px;
  padding: 4px 8px;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.title-card {
  font-size: 12px;
  color: #7c877c;
  font-weight: bold;
}

.striped-table tbody tr {
  background-color: #f5f5f5;
}

.striped-table tbody tr:nth-child(even) {
  background-color: #fff;
}

.striped-table tbody tr td {
  padding: 10px;
}
</style>
