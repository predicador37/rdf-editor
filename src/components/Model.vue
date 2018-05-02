<template>
  <div>
  <v-tabs icons-and-text>
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab href="#tab-1">
      Clases
      <v-icon>mdi-file-tree</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      Relaciones
      <v-icon>mdi-human-male-female</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      Atributos
      <v-icon>mdi-format-list-bulleted-type</v-icon>
    </v-tab>
    <v-tab-item key="1" id="tab-1">
      <v-container grid-list-md >
        <v-layout row wrap>
          <v-flex xs6>
      <v-card flat>
        <v-card-text>
          <v-treeview :items="items"></v-treeview>
        </v-card-text>
      </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card flat>
              <v-card-text>
                <v-treeview :items="items"></v-treeview>
                {{queryResult}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
    <v-tab-item key="2" id="tab-2">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item key="3" id="tab-3">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
  </div>
</template>

<script>
  import Treeview from '@/components/Treeview'
  import {mapState, mapActions} from 'vuex'
  export default {
    computed: {...mapState(['dataset', 'queryResult'])},
    components: {
      'v-treeview': Treeview
    },
    data () {
      return {
        text: 'prueba',
        items: {
          name: 'Thing',
          children: [
            {
              name: 'Organization'
            },
            {name: 'Address',
              children: [{
                name: 'Thoroughfare type'
              },
              {name: 'Thoroughfare number'}]}
          ]
        }
      }
    },
    methods: {...mapActions(['getClassList'])},
    beforeMount () {
      this.getClassList()
    },
    name: 'Model'
  }
</script>

<style scoped>


</style>
