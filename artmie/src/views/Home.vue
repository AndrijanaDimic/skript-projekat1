<template>
 <div class="home">
   <div>
    <b-list-group>
       <div class = "list">
        {{ loggedIn }}
         <!-- <section class = "img">
          <img  class = "img" width = 300 src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/1200px-1665_Girl_with_a_Pearl_Earring.jpg">
         </section> -->
         <div class = "container">
           <div id = "sideBar"
             v-for="productCategory in productCategories"
             :key="productCategory.id"
           >
            <h3 id = "nameOfCategory"> {{ productCategory.name }} </h3>
           <div
             v-for="pt in productType"
             :key="pt.id"
             :to="`/slikarskiPribor/${pt.id}/${pt.name}`"
              @click="productTypeClicked(pt.name, pt.id)"
           >
            <b-list-group-item button id = "productType"
              v-if="productCategory.id == pt.productCategoryId"
            >
              {{ pt.name }}
            </b-list-group-item>
           </div>
           </div>
          </div>
        </div>
      </b-list-group>
    </div>
    <!-- <GlavnaStrana/> -->
</div>

</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import GlavnaStrana from './GlavnaStrana.vue'
export default {
  // components: { GlavnaStrana },
  name: 'Home',
  computed: {
    ...mapState([
      'productType',
      'token',
      'productCategories',
      'products',
      'loggedIn'
    ])
  },
  mounted () {
    this.fetchProductCategories()
    this.fetchProductType()
    if (localStorage.token) {
      // this.setToken(localStorage.token)
    }
    // this.$router.replace({ name: 'GlavnaStrana', params: { id: 1 } })
  },
  methods: {
    ...mapActions([
      'fetchProductType',
      'fetchAllProductsUsingProductTypeId',
      'fetchProductCategories',
      'setLogIn'
    ]),
    productTypeClicked (name, index) {
      this.$router.push({ name: 'GlavnaStrana', params: { id: index, name: name } }).catch(err => { console.log(err) })
    }
  },
  ...mapMutations([
    'removeToken',
    'setToken'
  ]),
  sockets: {
    error (err) {
      alert(err)
    }
  }
}

</script>

<style scoped>
.container {
 /* background-color: antiquewhite; */
}
#nameOfCategory {
  background-color: brown;
  color: white;
}
.img {
  /* padding: 20px; */
  margin: 0%;
}
  .home {
    /* padding: 10px; */
    padding-top: 50px;
    /* background-color: cadetblue; */
    /* padding-left:10px; */
  }
  .list {
    float:left;
    width: 25%;
  }
  .img {
  }
  .h {
    /* padding-top: 20px; */
    color:WHITE;
    background-color: rgb(196, 35, 35);
    text-decoration: overline;
    background-color: cadetblue;
  }
  #sideBar {
    /* padding-top : 10px; */
    /* padding-bottom: 100px; */
    /* background-color: cadetblue; */
  }
  #productType {
    background-color:whitesmoke;
  }
</style>
