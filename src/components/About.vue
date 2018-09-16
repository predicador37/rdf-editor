<template>
<div id="vocabulary">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md12 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <div class="headline"> Acerca de RDFplay</div>
          </v-card-title>

          <v-card-text>
            <p>Desde aquí puedes precargar algunos de los vocabularios más utilizados en tu grafo para poder utilizarlos posteriormente en tus consultas SPARQL.</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        version: '1.0.0',
        author: '',
        changelog: '',
        description: ''
      }
    }
  }
</script>
<style scoped>
</style>
