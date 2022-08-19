<template>
  <div >
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SlikarskiPribor',
  params: {
    id: 0
  },
  data () {
    return {
      spId: null,
      subtitle: null
    }
  },
  watch: {
    $route () {
      this.spId = this.$route.params.id
      this.name = 'Hello'
      this.fetchIdsBySlikarskiPribor(this.spId)
    }
  },
  mounted () {
    console.log('ovo je ' + this.$route.params.id)
    this.spId = this.$route.params.id
    this.subtitle = this.$route.params.name
    this.fetchIdsBySlikarskiPribor(this.spId)
  },
  methods: {
    ...mapActions([
      'fetchIdsBySlikarskiPribor'
    ])
  }
}
</script>

<style scoped>
</style>
