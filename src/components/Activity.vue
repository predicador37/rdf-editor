<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline"> Carga de actividad</div>
          </v-card-title>

          <v-card-text>
            <p>Si lo deseas, puedes importar una actividad desde un archivo de texto en formato Markdown.</p>
            <file-loader @load="setActivity($event)" @file-loaded="snackbar = true"></file-loader>
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
      <v-flex px-3 py-3 md6 xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline"> Contenido de la actividad</div>
          </v-card-title>

          <v-card-text>
           <markdown-viewer class="pa-3" :mdText="activity"></markdown-viewer>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>



</div>
</template>

<script>
  import FileLoader from '@/components/FileLoader'
  import MarkdownViewer from '@/components/MarkdownViewer'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'ImportExport',
    components: {
      'file-loader': FileLoader,
      'markdown-viewer': MarkdownViewer
    },
    computed: {...mapGetters(['activity'])},
    data () {
      return {
        snackbar: false,
        snackbarMessage: 'Archivo importado en el almacén'
      }
    },
    methods: {...mapActions(['setActivity'])}
  }
</script>

<style scoped>

</style>
