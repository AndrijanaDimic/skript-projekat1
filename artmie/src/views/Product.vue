<template>
  <div class="home">
    <div class = "container">
      <div id = "title">
        <h4>{{ product.name }}</h4>
           <h4>{{ loggedIn }}</h4>
      </div>
      <div id = "img">
        <img  class = "img" width = 400 height = 400 :src="`${product.imgUrl}`">
            <div id = "price">
              <h3> Cena:  {{product.price}}.00 din </h3>
            <div>
              <button type="button" class="btn btn-info"  @click="addToCard(product)">Dodaj u korpu</button>
            </div>
            </div>
      </div>
      <br>
       <div id = "description">
        <h3>Opis proizvoda</h3>
       <p> {{product.description}} </p>
    </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      name: null
    }
  },
  computed: {
    ...mapState([
      'product',
      'loggedIn'
    ])
  },
  mounted () {
    console.log(this.$route.params.name)
    this.name = this.$route.params.name
    this.fetchProductUsingName(this.$route.params.name)
  },
  methods: {
    ...mapActions([
      'fetchProductUsingName',
      'addToShopingCard'
    ]),
    addToCard (product) {
      if (typeof (localStorage.getItem('loggedUser')) !== 'undefined') {
        localStorage.setItem('productId', product.id)
        console.log(this.product.id)
        this.addToShopingCard(localStorage.getItem('loggedUser'))
        alert('Uspesno ste uneli proizvod u korpu')
      } else {
        console.log('lalala')
        alert('Registracija ili logovanje je neophodno za unos proizvoda u korpi')
      }
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    width: 50%;
    padding-top: 30px;
    float: inherit;
    display: grid;
    padding-left: 60px;
     /* background-image: url("  https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149012404.jpg?w=2000"); */
  }
  #title {
    color: cadetblue;
    padding-bottom: 10px;
    text-align: left;
    /* background-color: cadetblue; */
  }
  #img {
    grid-column: 1;
    grid-row: 2;
  }
  #price {
    grid-column: 2;
    grid-row: 4;
    padding-top: 300px;
    padding-right: 90px;
    text-align: right;
  }
  #description {
    text-align: left;
  }
  .list {
    float:left;
    width: 18%;
  }
  .img {
    padding-bottom: 10px;
    float: left;
    width:200;
    height:100;
  }
  .h {
    padding-top: 20px;
    color:WHITE;
    text-decoration: overline;
  }
</style>
