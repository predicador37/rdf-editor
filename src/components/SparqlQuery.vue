<template>
<div>
<div>
  <v-textarea
    solo
    v-model="query"
    name="sparql_query"
    label="Consulta SPARQL"
    value="SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100"
    hint="Consulta de ejemplo"
  ></v-textarea>
</div>
  <v-btn type="submit" variant="primary" @click.native="executeSparqlQuery(query)">Lanzar consulta</v-btn>
  <v-divider class="my-3"></v-divider>
  <div class="subheading my-3"> Cargar consulta</div>
<div>
    <file-loader title='Desde archivo' @load="loadSparqlQuery($event)" @file-loaded="snackbar = true"></file-loader>
    <file-loader title='Desde URL' @load="loadSparqlQuery($event)" @file-loaded="snackbar = true"></file-loader>
</div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FileLoader from '@/components/FileLoader'
  export default {
    name: 'SparqlQuery',
    data () {
      return {
        query: 'SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100',
        results: []
      }
    },
    components: {
      'file-loader': FileLoader
    },
    computed: {...mapGetters(['getStoreQuads'])},
    methods: {
      executeSparqlQuery (query) {
        console.log('executing new sparql query')
        const newEngine = require('@comunica/actor-init-sparql-rdfjs').newEngine
        const source = {
          match: (s, p, o, g) => {
            return require('streamify-array')(this.getStoreQuads(s, p, o, g))
          }
        }
        const myEngine = newEngine()
        let results = []
        myEngine.query(query,
          {'sources': [{type: 'rdfjsSource', value: source}]})
          .then((result) => {
            result.bindingsStream.on('data', function (data) {
              // Each data object contains a mapping from variables to RDFJS terms.
              results.push(data)
            }).on('end', () => {
              console.log(JSON.stringify(results))
              this.$emit('emit-results', results)
            })
          })
      },
      loadSparqlQuery (content) {
        this.query = content
      }
    }
  }
</script>

<style scoped>

</style>
