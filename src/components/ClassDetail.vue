<template>
<div>
  <v-card>
    <v-card-title primary-title>
      <div class="headline"> Clase  {{className}}
      </div>
    </v-card-title>
    <v-card-text>
      <v-list two-line>
        <template v-for="(item, index) in editableClassData">
          <v-list-tile
            :key="item"
            ripple
          >
            <v-list-tile-content >
              <v-fab-transition>
                <v-btn
                  absolute
                  small
                  dark
                  fab
                  bottom
                  right
                  color="pink"
                  @click.native.stop="addPropertyHandler(item)"
                >

                  <v-icon>add</v-icon>
                </v-btn>
              </v-fab-transition>
              <v-list-tile-title>{{ rdfConstructs[item].value }}

              </v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item.headline }} </v-list-tile-sub-title>
              <v-list-tile-sub-title><span v-for="(element, idx) in relatedClasses[item]">
    <span>{{element.text ? element.text : element.value}}</span><span v-if="idx+1 < relatedClasses[item].length">, </span>
  </span></v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>
          <v-divider v-if="index + 1 < editableClassData.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field v-model="currentLiteral" label="Anotación"></v-text-field>
          <small class="grey--text">Introduzca una nueva anotación para la clase.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click.native.stop="addClassLiteralPropertyHandler">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Graph from '@/services/Graph'
  export default {
    name: 'ClassDetail',
    props: {
      className: {
        type: String,
        required: true
      }
    },
    computed: {...mapGetters(['dataset', 'rdfConstructs'])},
    data () {
      return {
        editableClassData: ['rdfs_label', 'rdfs_comment'],
        relatedClasses: {},
        currentProperty: null,
        currentLiteral: null,
        dialog: false
      }
    },
    methods: {...mapActions(['addClassLiteralProperty']),
      async getRelatedClasses (relatedClass) {
        let classes = await Graph.getObjectListByPredicateAndSubject({dataset: this.dataset, predicate: this.rdfConstructs[relatedClass].value, subject: Graph.BASE_URL + this.className})
        this.$set(this.relatedClasses, relatedClass, classes)
        console.log(JSON.stringify(this.relatedClasses[relatedClass]))
      },
      addPropertyHandler (property) {
        console.log(property)
        this.currentProperty = property
        this.dialog = !this.dialog
      },
      addClassLiteralPropertyHandler () {
        console.log(this.className)
        console.log(this.currentProperty)
        console.log(this.currentLiteral)
        this.addClassLiteralProperty({className: this.className, property: this.currentProperty, literal: this.currentLiteral})
        for (const item of this.editableClassData) {
          this.getRelatedClasses(item)
        }
        this.dialog = false
        console.log(JSON.stringify(this.dataset))
      }
    },
    watch: {
      className:  function (newVal, oldVal) { // watch it
        for (const item of this.editableClassData) {
          this.getRelatedClasses(item)
        }
        console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      }
    }
  }
</script>

<style scoped>

</style>
