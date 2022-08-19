<template>
  <div class="container">
    <section id = "list">
    <div class = "objects">
      <ul class="list-group" id="tutorials-list" >
        <div id="list-item">
          <li
            class="list-group-item"
              v-for="p in productsInShoppingCard"
              :key="p.id"
          >
            <h5 id = "productTitle">{{p.name}}</h5>
            <div id = "img">
              <!-- <router-link  :to="'/product/' + p.name ">  -->
              <img  class = "img" width = 100 height = 100 @click ="product()" :src="`${p.imgUrl}`">
            </div>
            <div id = "price">
              <p><i>{{p.price}}.00 din </i></p>
            </div>
            <!-- <p>{{p.name}}</p> -->
            <div id = "description">
              <p>{{p.description}} </p>
            </div>
            <div id="xbtn">
             <b-button  @click ="deleteProduct(p)" variant="danger">x</b-button>
            </div>
          </li>
           <div id= "finalOrderBtn">
              <b-button type="submit" href = #form  variant="info">Finiliziraj kupovinu</b-button>
            </div>
        </div>
      </ul>
    </div>
    </section>
    <section id = "form">
      <div class = "form">
        <h4 id = titleForm >Obavljanje kupovine </h4>
          <div class="mb-3">
             <label for="number" id = "number" class="form-label">Phone number: </label>
            <input type="number" class="form-control" id="number" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="address" id = "address" class="form-label">Address: </label>
            <input type="address" class="form-control" id="addressInput">
          </div>
           <b-button type="submit" id="formBtn" @click ="order()" variant="info">Naruci</b-button>
        </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ShopCard',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'product',
      'loggedIn',
      'productsInShoppingCard',
      'logged'
    ])
  },
  created () {
    // this.fetchProductsFromShoppingCardUsingLoggedUser(this.loggedIn.id)
  },
  watch: {
  },
  mounted () {
    if (typeof (localStorage.getItem('loggedUser')) !== 'undefined') {
      this.fetchProductsFromShoppingCardUsingLoggedUser(localStorage.getItem('loggedUser'))
    } else {
      this.$router.replace({ name: 'Login' })
    }
  },
  methods: {
    ...mapActions([
      'fetchProductsFromShoppingCardUsingLoggedUser',
      'deleteProductFromShopCard'
    ]),
    add () {
    },
    finalOrder () {
    },
    order () {

    },
    deleteProduct (product, index) {
      console.log('productId' + product.id)
      localStorage.setItem('productIdDelete', product.id)
      // localStorage.getItem('productIdDelete')
      this.deleteProductFromShopCard(localStorage.getItem('loggedUser'))
      console.log(this.productsInShoppingCard)
      console.log(this.productsInShoppingCard)
      // this.fetchProductsFromShoppingCardUsingLoggedUser(this.loggedIn.id)
      // this.productsInShoppingCard.splice()
      // const index = this.productsInShoppingCard.findIndex(product => product.categoryId === message.categoryId)
    }
  }
}
</script>
  <style scoped>
    .container {
     /* background-image: url("https://media.istockphoto.com/photos/flying-shopping-cart-with-shopping-bags-on-a-pink-background-picture-id1292443598?k=20&m=1292443598&s=170667a&w=0&h=8VnuyidOGJ1_7pxH5uXp_yqYaS72UyUFZtNy7MSz_oc="); */
    /* data:image/png;base64,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 */
  }
  .list-group-item {
    background-color: white;
    color: black;
    height: 220px;
     }
     .img {
      float: left;
     }
     #description {
      text-align: left;
      color: gray;
     }
     #price {
      /* float: right;
      padding-right: 10px; */
      background-color: bisque;
      text-align: right;
      color: black;
     }
     #productTitle {
      text-align: left;
      color: black;
     }
     #finalOrderBtn {
      padding-top: 10px;
      float: right;
     }
     .form {
      padding-right: 800px;
      padding-bottom: 500px;
      /* background-color: bisque; */
     }
     #number {
      float: left;
     }
     #address {
      float: left;
      padding-bottom: ;
      /* padding-bottom: 1px; */
     }
     #formBtn {
      float: right;
     }
     #titleForm {
       text-align: left;
     }
    .mb-3 {
        padding-bottom: 10px;
      }
     #addressInput {
      padding-bottom: 10px;
     }
     .list-group {
      padding-top: 50px;
     }
     #xbtn {
      float: right;
      background-color: blueviolet;
     }
</style>
