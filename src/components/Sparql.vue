<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline"> Consulta</div>
          </v-card-title>

          <v-card-text>
            <sparql-query></sparql-query>
          </v-card-text>


        </v-card>

      </v-flex>
      <v-flex fixed  px-3 py-3 md6 xs12>

       <sparql-results></sparql-results>

      </v-flex>
    </v-layout>
  </v-container>


</div>
</template>

<script>
  import SparqlQuery from '@/components/SparqlQuery'
  import SparqlResults from '@/components/SparqlResults'
  import {mapActions} from 'vuex'
  export default {
    name: 'Sparql',
    components: {
      'sparql-query': SparqlQuery,
      'sparql-results': SparqlResults
    },
    methods: {...mapActions(['importN3', 'exportJsonLD'])}
  }
</script>

<style scoped>

</style>
