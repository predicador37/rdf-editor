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
  <div>
  <v-btn type="submit" variant="primary" @click="executeSparqlQuery(query)">Lanzar consulta</v-btn>
  </div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'SparqlQuery',
    data () {
      return {
        query: 'SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100',
        results: []
      }
    },
    computed: {...mapGetters(['getStoreQuads', 'engine'])},
    methods: {
      executeSparqlQuery (query) {
        const newEngine = require('@comunica/actor-init-sparql-rdfjs').newEngine
        const source = {
          match: function (s, p, o, g) {
            return require('streamify-array')(this.getStoreQuads(s, p, o, g))
          }
        }
        const myEngine = newEngine()
        myEngine.query(query,
          {'sources': [{type: 'rdfjsSource', value: source}]})
          .then(function (result) {
            result.bindingsStream.on('data', function (data) {
              // Each data object contains a mapping from variables to RDFJS terms.
              this.results.push(data)
              console.log(data.get('?s'))
              // console.log(data.get('?p'))
              // console.log(data.get('?o'))
            }).on('end', () => {
              return (this.results)
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
