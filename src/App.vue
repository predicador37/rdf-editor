<template>
  <v-app>


    <v-toolbar
      app
      dark
      class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app>
      <span>UNED &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {

    data () {
      return {
        drawer: true,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        dataset: this.$rdf.dataset([this.$rdf.quad(this.$rdf.namedNode('http://uned.es/analista'), this.$rdf.namedNode('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
          this.$rdf.namedNode('https://www.w3.org/2002/07/owl#Class'))]),
        title: 'RDF editor'
      }
    },
    methods: mapMutations(['initializeDataset']),
    beforeMount () {
      this.initializeDataset(this.dataset)
    },
    name: 'App'
  }
</script>
