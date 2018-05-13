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
      <v-container fluid>
        <v-layout row wrap>
          <v-flex px-3 py-3 md6 xs12>
            <v-card>
              <v-card-title primary-title>
                <div class="headline"> Clases</div>
              </v-card-title>

              <v-card-text>
                <v-list two-line>
                  <template v-for="(item, index) in queryResult">
                    <v-list-tile
                      :key="item.text"
                      ripple
                      @click=""
                    >
                      <v-list-tile-content @click.stop="changeCurrentClass(item.text)">
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                    </v-list-tile>
                    <v-divider v-if="index + 1 < queryResult.length" :key="index"></v-divider>
                  </template>
                </v-list>

                <v-fab-transition>
                <v-btn
                  absolute
                  small
                  dark
                  fab
                  bottom
                  right
                  color="pink"
                  @click.native.stop="dialog = !dialog"
                >

                  <v-icon>add</v-icon>
                </v-btn>
                </v-fab-transition>
              </v-card-text>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-text-field v-model="newClassName" label="Class name"></v-text-field>
                    <small class="grey--text">Introduzca un nuevo término a modelar como una clase.</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click.native="addClassHandler">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-card>

          </v-flex>
          <v-flex px-3 py-3 md6 xs12>

              <class-detail :class-name="currentClassName"></class-detail>


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
  import ClassDetail from '@/components/ClassDetail'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    computed: {...mapGetters(['dataset', 'queryResult', 'rdfProperties', 'owlProperties', 'owlClasses'])},
    components: {
      'v-treeview': Treeview,
      'class-detail': ClassDetail
    },
    data () {
      return {
        text: 'prueba',
        dialog: false,
        currentClassName: '',
        newClassName: null,
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
    methods: {...mapActions(['getSubjectListByPredicateAndObject', 'addClass']),
      addClassHandler () {
        this.addClass(this.newClassName)
        this.getSubjectListByPredicateAndObject({predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', object: 'https://www.w3.org/2002/07/owl#Class'})
        this.dialog = false
      },
      // TODO: changeCurrentClass mutation to change classdetail component data
      changeCurrentClass (className) {
        this.currentClassName = className
      }},
    beforeMount () {
      console.log(this.owlClasses.owl_Class)
      this.getSubjectListByPredicateAndObject({predicate: this.rdfProperties.rdf_type.value, object: this.owlClasses.owl_Class.value})
    },
    name: 'Model'
  }
</script>

<style scoped>


</style>
