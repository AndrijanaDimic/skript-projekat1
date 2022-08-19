import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slikarskiPribor: [],
    boje: [],
    productType: [],
    token: '',
    kreativniPribor: [],
    crtanje: [],
    imageIDS: [],
    grupaSvihslikarskihPribora: [],
    products: [],
    productCategories: [],
    product: {},
    loggedIn: {},
    productsInShoppingCard: [],
    productsPerPage: [],
    total: ''
  },
  mutations: {
    dodajSlikarskiPribor (state, sp) {
      state.slikarskiPribor = sp
    },
    dodajBoje (state, b) {
      state.boje = b
    },
    dodajKreativniPribor (state, kp) {
      state.kreativniPribor = kp
    },
    dodajCrtanje (state, c) {
      state.crtanje = c
    },
    dodajObjekteSlikarskogPribora (state, obj) {
      state.grupaSvihslikarskihPribora = obj
    },
    addProductCategories (state, res) {
      state.productCategories = res
    },
    addProductType (state, res) {
      state.productType = res
    },
    findAllProductsUsingProductTypeId (state, res) {
      state.products = res
    },
    findProductUsingName (state, res) {
      state.product = res
    },
    setLogIn (state, res) {
      state.loggedIn = res
    },
    addProductsInShoppingCard (state, res) {
      state.productsInShoppingCard = res
    },
    addProductsPerPage (state, res) {
      state.productsPerPage = res
    },
    addTotalProducts (state, res) {
      console.log(res.length)
      state.total = res
      localStorage.setItem('count', res)
    },
    search (state, res) {
      state.productsPerPage = res
    },
    searchTotal (state, res) {
      state.total = res
      localStorage.setItem('count', res)
    }
  },
  modules: {
  },
  setToken (state, token, user) {
    state.token = token
    state.loggedIn = user
    localStorage.token = token
    localStorage.user = user
  },
  removeToken (state) {
    state.token = ''
    localStorage.token = ''
  },
  actions: {
    searchDB ({ commit }, searchQuery) {
      const page = localStorage.getItem('page')
      const productTypeId = localStorage.getItem('searchId')
      fetch(`http://localhost:8000/search/${productTypeId}/${searchQuery}/${page}`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(res => commit('search', res))
    },
    register ({ commit }, obj) {
      fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => commit('setToken', tkn.token))
    },
    login ({ commit }, obj) {
      fetch('http://localhost:9000/loginAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then(res => res.json())
        .then(tkn => {
          if (tkn.msg) {
            alert(tkn.msg)
          } else {
            commit('setToken', tkn.token, tkn.usr)
            commit('setLogIn', tkn.usr)
          }
        })
    },
    searchTotalPerPage ({ commit }, searchQuery) {
      const productTypeId = localStorage.getItem('searchId')
      fetch(`http://localhost:8000/search/total/${productTypeId}/${searchQuery}`, {
      }).then(obj => obj.json())
        .then(res => commit('searchTotal', res))
    },
    fetchProductType ({ commit }) {
      fetch('http://localhost:8000/productType', {
      }).then(obj => obj.json())
        .then(res => commit('addProductType', res))
    },
    fetchProductCategories ({ commit }) {
      fetch('http://localhost:8000/productCategories', {
      }).then(obj => obj.json())
        .then(res => commit('addProductCategories', res))
    },
    fetchSlikarskiPribor ({ commit }) {
      fetch('http://localhost:8000/slikarskiPribor', {
      }).then(obj => obj.json())
        .then(res => commit('dodajSlikarskiPribor', res))
    },
    fetchBoje ({ commit }) {
      fetch('http://localhost:8000/boje', {
      }).then(obj => obj.json())
        .then(res => commit('dodajBoje', res))
    },
    fetchKreativniPribor ({ commit }) {
      fetch('http://localhost:8000/kreativniPribor', {
      }).then(obj => obj.json())
        .then(res => commit('dodajKreativniPribor', res))
    },
    fetchCrtanje ({ commit }) {
      fetch('http://localhost:8000/crtanje', {
      }).then(obj => obj.json())
        .then(res => commit('dodajCrtanje', res))
    },
    fetchAllProductsUsingProductTypeId ({ commit, state }, id) {
      fetch(`http://localhost:8000/productType/${id}`, {
      }).then(obj => obj.json())
        .then(res => commit('findAllProductsUsingProductTypeId', res))
    },
    fetchProductUsingName ({ commit }, name) {
      console.log('ime je' + name)
      fetch(`http://localhost:8000/product/${name}`, {
      }).then(obj => obj.json())
        .then(res => commit('findProductUsingName', res))
    },
    addToShopingCard ({ commit }, userId) {
      fetch(`http://localhost:8000/shopCard/${userId}/${localStorage.getItem('productId')} `, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        // body: JSON.stringify(userId, productId)
      }).then(res => res.json())
    },
    fetchProductsFromShoppingCardUsingLoggedUser ({ commit }, userId) {
      fetch(`http://localhost:8000/shopCard/${userId} `, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(res => commit('addProductsInShoppingCard', res))
    },
    fetchProducts ({ commit }, productTypeId) {
      const page = localStorage.getItem('currentPage')
      const size = localStorage.getItem('size')
      console.log(productTypeId + page + size)
      fetch(`http://localhost:8000/product/${productTypeId}/${page}/${size}`, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(res => commit('addProductsPerPage', res))
    },
    fetchTotalProducts ({ commit }) {
      fetch('http://localhost:8000/totalProducts', {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(res => commit('addTotalProducts', res))
    },
    deleteProductFromShopCard ({ commit }, userId) {
      const productId = localStorage.getItem('productIdDelete')
      console.log(localStorage.getItem('productIdDelete'))
      fetch(`http://localhost:8000/shopCard/${userId}/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
    }
  }
})
