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
            @click=""
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
                  @click.native.stop="dialog = !dialog"
                >

                  <v-icon>add</v-icon>
                </v-btn>
              </v-fab-transition>
              <v-list-tile-title>{{ rdfConstructs[item].value }}

              </v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ }}</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>
          <v-divider v-if="index + 1 < editableClassData.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-text>
  </v-card>

</div>
</template>

<script>
  import {mapGetters} from 'vuex'
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
        editableClassData: ['owl_EquivalentClass', 'rdfs_subClassOf'],
        equivalentClasses: []
      }
    },
    methods: {
      async getEquivalentClasses () {
        console.log(Graph.baseURL + this.className)
        let classes = await Graph.getObjectListByPredicateAndSubject({dataset: this.dataset, predicate: this.rdfConstructs.owl_EquivalentClass.value, subject: Graph.baseURL + this.className})
        this.equivalentClasses = classes
      }
    },
    watch: {
      className: function (newVal, oldVal) { // watch it
        this.getEquivalentClasses()
        console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      }
    }
  }
</script>

<style scoped>

</style>
