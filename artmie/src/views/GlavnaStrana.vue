<template>
  <div class="container">
    <div class ="pagination" div>
    </div>
    <div id = "title">
      <h1>{{name}}</h1>
    </div>
    <Home/>
    <div class = "objects">
      <div id = "search">
        <input size="sm" v-model = "searchQuery" class="me-sm-2" placeholder="Search" right>
        <b-button  id = "searchButton" size="sm"  variant="outline-primary" @click ="search()" class="my-2 my-sm-0" type="submit">Search</b-button>
      </div>
      <ul class="list-group" id="tutorials-list" >
        <div id="list-item">
          <li
            class="list-group-item"
              v-for="p in productsPerPage"
              :key="p.id"
          >
            <h4 id = "productTitle">{{p.name}}</h4>
            <div id = "img">
              <router-link  :to="'/product/' + p.name "> <img  class = "img" width = 150 height = 150 :src="`${p.imgUrl}`"></router-link>
            </div>
            <div id = "price">
              <h5><i>{{p.price}}.00 din </i></h5>
            </div>
            <div id = "description">
              <p>{{p.description}} </p>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div  class="overflow-auto">
      <b-pagination class ="pagination"
        v-model="currentPage"
        :total-rows="count"
        :per-page="pageSize"
        aria-controls="my-table"
        @change ="handlePageChanged"
      ></b-pagination>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Home from './Home.vue'
export default {
  components: { Home },
  name: 'GlavnaStrana',
  data () {
    return {
      id: 0,
      name: null,
      currentPage: 1,
      count: 0,
      pageSize: 3,
      searchQuery: ''
    }
  },
  computed: {
    ...mapState([
      'productsPerPage',
      'total'
    ])
  },
  created () {
    this.currentPage = 1
    this.retrieveProducts()
  },
  filters: {
    truncate: function (num) {
      if (num.length > 500) {
        num = num.substring(0, 499) + '...'
      }
      return num
    }
  },
  watch: {
    $route () {
      this.name = this.$route.params.name
      this.id = this.$route.params.id
      this.retrieveProducts()
      // this.fetchAllProductsUsingProductTypeId(this.id)
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.retrieveProducts()
  },
  methods: {
    ...mapActions([
      'fetchAllProductsUsingProductTypeId',
      'fetchProducts',
      'fetchTotalProducts',
      'searchDB',
      'searchTotalPerPage'

    ]),
    handlePageChanged (num) {
      this.currentPage = num
      if (localStorage.getItem('locked') === '1') {
        this.search()
      } else {
        this.retrieveProducts()
      }
    },
    search () {
      if (this.searchQuery === '') {
        localStorage.setItem('locked', '2')
        this.retrieveProducts()
      } else {
        localStorage.setItem('searchId', this.$route.params.id)
        localStorage.setItem('page', this.currentPage)
        localStorage.setItem('locked', '1')
        this.searchDB(this.searchQuery)
        this.searchTotalPerPage(this.searchQuery)
        console.log('total' + this.total)
        this.count = this.total
        console.log('total' + this.count)
      }
    },
    getRequestParams (page, pageSize) {
      const params = {}
      if (page) {
        params.page = page - 1
      }
      if (pageSize) {
        params.size = pageSize
      }
      return params
    },
    retrieveProducts () {
      console.log('Pre' + 'current' + this.currentPage + 'pageSize' + this.pageSize)
      const params = this.getRequestParams(this.currentPage, this.pageSize)
      localStorage.setItem('currentPage', params.page)
      localStorage.setItem('size', params.size)
      this.fetchProducts(this.id)
      this.fetchTotalProducts()
      this.count = localStorage.getItem('count')
      // this.fetchAllProductsUsingProductTypeId(params.page, params.size)
    }
  }
}
</script>
<style scoped>
#productTitle {
  color: black;
  text-align: left;
}
.container {
  margin: auto;
  width: 100%;
  padding: 10px;
    }
#description {
  text-align: left;
  color: darkgrey;
}
#price {
  text-align: right;
}
  #img {
    position: apsolute;
    left: auto;
    border-color: grey;
    width: 200px;
    height: 120px;
  }
  .objects {
    padding-left: 330px ;
    height: 100%;
  }
  .list-group-item {
    height: 300px;
    border-color:white;
     border-top-color: grey;
     border-style: dotted;
    color: black;
  }
  #title {
    color: cadetblue;
    text-align: left;
    padding-left: 500px;
    /* background-image: url("https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000"); */
  }
  .pagination {
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    cursor:pointer;
    padding-top:20px;
    background-image: url("https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?w=2000");
  }
.list-group-item {
  background-color: white;
  /* background-image: url("https://img.freepik.com/free-vector/hand-painted-background-colourful-palette_23-2148427585.jpg?w=2000"); */
  }
  #search {
    background-color: antiquewhite;
    padding: 10px;
  }
</style>
