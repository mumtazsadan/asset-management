import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    assets: [] // Array to store asset data
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get('https://66c222b3f83fffcb587b3d1c.mockapi.io/asset')
        commit('setAssets', response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async addAsset({ commit }, asset) {
      try {
        const response = await axios.post(
          'https://66c222b3f83fffcb587b3d1c.mockapi.io/asset',
          asset
        )
        commit('addAsset', response.data)
      } catch (error) {
        console.error('Error adding asset:', error)
      }
    },
    async deleteAsset({ commit }, assetId) {
      try {
        await axios.delete(`https://66c222b3f83fffcb587b3d1c.mockapi.io/asset/${assetId}`)
        commit('removeAsset', assetId)
      } catch (error) {
        console.error('Error deleting asset:', error)
      }
    }
  },
  mutations: {
    setAssets(state, assets) {
      // Completely replace the asset list (useful for bulk updates)
      state.assets = assets
    },
    addAsset(state, asset) {
      // Add a new asset to the end of the list
      state.assets.push(asset)
    },
    updateAsset(state, { index, updatedAsset }) {
      // Update an existing asset at a specific index
      state.assets.splice(index, 1, updatedAsset)
    },
    removeAsset(state, index) {
      // Remove an asset at a specific index
      state.assets.splice(index, 1)
    }
  }
})

export default store
