<template>
<div>
  <v-switch v-model="external" value="false" input-value="false" label="Usar Endpoint SPARQL remoto"></v-switch>
  <v-text-field v-if="external" :disabled="!external" v-model="endpointURL" value="" label="Introduce la URL del endpoint SPARQL remoto"></v-text-field>

<div class="py-3">
  <v-textarea
    solo
    v-model="query"
    name="sparql_query"
    label="Consulta SPARQL"
    value="SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100"
    hint="Consulta de ejemplo"
  ></v-textarea>
</div>
  <v-btn color="primary" type="submit" variant="primary" :loading="loading" @click.native="executeSparqlQuery(query)">Lanzar consulta</v-btn>
  <v-divider class="my-3"></v-divider>
  <div class="subheading my-3"> Cargar consulta</div>
<div>
    <file-loader title='Desde archivo' @load="loadSparqlQuery($event)" @file-loaded="snackbar = true"></file-loader>
</div>
  <div>
    <url-loader  title='Desde URL' @load="loadSparqlQuery($event)" @url-loaded="snackbar = true"></url-loader>
</div>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import FileLoader from '@/components/FileLoader'
  import URLLoader from '@/components/URLLoader'
  export default {
    name: 'SparqlQuery',
    data () {
      return {
        query: 'SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100',
        results: [],
        endpointURL: 'https://query.wikidata.org/sparql',
        external: false,
        loading: false
      }
    },
    components: {
      'file-loader': FileLoader,
      'url-loader': URLLoader
    },
    computed: {...mapGetters(['getStoreQuads'])},
    methods: {
      async executeSparqlQuery (query) {
        this.loading = true
        let results = []
        console.log(this.external)
        if (this.external) {
          try {
            results = await this.executeExternalSparqlQuery(query, this.endpointURL)
            console.log('wey ya')
          } catch (error) {
            this.$emit('error', error.message)
          }
        } else {
          results = await this.executeInternalSparqlQuery(query)
        }
        this.$emit('emit-results', results)
        this.loading = false
      },
      executeInternalSparqlQuery (query) {
        console.log('executing new sparql query')
        const newEngine = require('@comunica/actor-init-sparql-rdfjs').newEngine
        const source = {
          match: (s, p, o, g) => {
            return require('streamify-array')(this.getStoreQuads(s, p, o, g))
          }
        }
        const myEngine = newEngine()
        let results = []
        return new Promise((resolve, reject) => {
          myEngine.query(query,
            {'sources': [{type: 'rdfjsSource', value: source}]})
            .then((result) => {
              result.bindingsStream.on('data', function (data) {
                // Each data object contains a mapping from variables to RDFJS terms.
                results.push(data)
              }).on('end', function () {
                console.log(JSON.stringify(results))
                resolve(results)
              })
            })
        })
      },
      executeExternalSparqlQuery (query, url) {
        console.log('executing new external sparql query')

        const newEngine = require('@comunica/actor-init-sparql').newEngine
        const myEngine = newEngine()
        let results = []
        return new Promise((resolve, reject) => {
          myEngine.query(query, { sources: [ { type: 'sparql', value: url } ] })
              .then(function (result) {
                result.bindingsStream.on('data', function (data) {
                  results.push(data)
                }).on('end', function () {
                  console.log(JSON.stringify(results))
                  resolve(results)
                })
              })
            .catch(function(e) { reject(Error(e)) })
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
