<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline"> Importación de grafo</div>
          </v-card-title>

          <v-card-text>
            <p>Si lo deseas, puedes importar un grafo desde un archivo de texto en formato N3 o Turtle.</p>
            <file-loader @load="importN3({'content': $event, 'store': 'n3store'})" @file-loaded="snackbar = true"></file-loader>
            <div>
              <url-loader title='Desde URL' @load="importN3({'content': $event, 'store': 'n3store'})" @url-loaded="snackbar = true"></url-loader>
            </div>
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
            <div class="headline"> Exportación de grafo</div>
          </v-card-title>

          <v-card-text>
            <p>Asimismo, puedes exportar tu grafo de trabajo a un archivo de texto en formato JSON-ld o Turtle.</p>
            <v-btn type="submit" variant="primary" @click="exportJsonLD">Exportar JSON-ld</v-btn>
            <v-btn type="submit" variant="primary" @click="exportTurtle">Exportar Turtle</v-btn>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card>
          <v-card-title primary-title>
            <div class="headline"> Añadir a grafo</div>
          </v-card-title>

          <v-card-text>
            <p>También es posible importar las tripletas de un grafo externo al grafo de trabajo.</p>
            <file-loader title="Añadir desde archivo" @load="addN3({'content': $event, 'store': 'n3store'})" @file-loaded="snackbar = true"></file-loader>
            <div>
              <url-loader title='Añadir desde URL' @load="addN3({'content': $event, 'store': 'n3store'})" @url-loaded="snackbar = true"></url-loader>
            </div>
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
  import FileLoader from '@/components/FileLoader'
  import URLLoader from '@/components/URLLoader'
  import {mapActions} from 'vuex'
  export default {
    name: 'ImportExport',
    components: {
      'file-loader': FileLoader,
      'url-loader': URLLoader
    },
    data () {
      return {
        snackbar: false,
        snackbarMessage: 'Archivo importado en el almacén'
      }
    },
    methods: {...mapActions(['importN3', 'addN3', 'exportJsonLD', 'exportTurtle'])}
  }
</script>

<style scoped>

</style>
