<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <div class="headline"> Precargar vocabularios</div>
          </v-card-title>

          <v-card-text>
            <p>Desde aquí puedes precargar algunos de los vocabularios más utilizados en tu grafo para poder utilizarlos posteriormente en tus consultas SPARQL.</p>

              <v-switch v-for="value in vocabularies" v-model="selectedVocabulary" @change="changeVocabularyState"  :label="value.name" :false-value="{delN3: value.url}" :true-value="{addN3: value.url}"></v-switch>

          </v-card-text>
          <v-snackbar
            v-model="snackbar"
          >
            {{ snackbarMessage }}
            <v-btn
              dark
              flat
              @click="snackbar = false"
            >
              Cerrar
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
  import Vocabularies from '../utils/Vocabularies'
  export default {
    name: 'vocabulary',
    data () {
      return {
        vocabularies: Vocabularies,
        selectedVocabulary: null,
        snackbar: false,
        snackbarMessage: 'Vocabulario importado'
      }
    },
    methods: {
      changeVocabularyState () {
        console.log(JSON.stringify(this.selectedVocabulary))
        // todo implement enableVocabulary and disableVocabulary
        // add vocabulary to graph from URL
        // delete vocabulary from graph
      }
    }
  }
</script>

<style scoped>

</style>
