<template>
<div>
  <v-tabs icons-and-text>
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab href="#tab-1">
      Clases
      <v-icon>mdi-file-tree</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      Propiedades
      <v-icon>mdi-format-list-bulleted-type</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      Relaciones
      <v-icon>mdi-human-male-female</v-icon>
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
                <resource-list :dataset="dataset" :resources="classes" @add-resource="handleAddResource($event, 'class')" @change-resource="handleChangeResource($event)"></resource-list>
              </v-card-text>


            </v-card>

          </v-flex>
          <v-flex px-3 py-3 md6 xs12>

            <resource-detail :resource-name="currentResourceName" :editable-class-data="editableClassData"></resource-detail>

          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
    <v-tab-item key="2" id="tab-2">
      <v-card flat>
        <v-card-text>Texto de prueba</v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item key="3" id="tab-3">
      <v-card flat>
        <v-card-text>Texto de prueba</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>




</div>
</template>

<script>
  import ResourceList from '@/components/ResourceList'
  import ResourceDetail from '@/components/ResourceDetail'
  import {mapActions, mapGetters} from 'vuex'
  import Graph from '@/services/Graph'
  export default {
    components: {
      'resource-list': ResourceList,
      'resource-detail': ResourceDetail
    },
    name: 'ModelContainer',
    data () {
      return {
        classes: [],
        subclasses: [],
        editableClassData: ['rdfs_label', 'rdfs_comment'],
        currentResourceName: ''
      }
    },
    computed: {...mapGetters(['dataset', 'rdfConstructs'])},
    methods: {
      ...mapActions(['addClass']),
      async getClasses () {
        let [classes, subclasses] = await Promise.all([Graph.getSubjectListByPredicateAndObject({
          dataset: this.dataset,
          predicate: this.rdfConstructs.rdf_type.value,
          object: this.rdfConstructs.owl_Class.value
        }), Graph.getSubjectListByPredicate({
          dataset: this.dataset,
          predicate: this.rdfConstructs.rdfs_subClassOf.value
        })])
        this.classes = classes
        Array.prototype.push.apply(this.classes, subclasses)

        // impossible to merge classes with subclasses
      },
      handleAddResource (resourceName, type) {
        // using a string concatenation as parameter: 'add'+type to call the methods dynamically
        this['add' + type.charAt(0).toUpperCase() + type.slice(1)](resourceName)
        this[type.match('[ch|sh|s|x|z]$') ? 'get' + type.charAt(0).toUpperCase() + type.slice(1) + 'es' : 'get' + type.charAt(0).toUpperCase() + type.slice(1) + 's']()
      },
      handleCurrentResource (resourceName) {
        this.addClass(resourceName)
        this.getClasses() // replace by event to parent
      },
      handleChangeResource (resourceName) {
        this.currentResourceName = resourceName
      }
    },
    beforeMount () {
      this.getClasses()
    }
  }
</script>

<style scoped>

</style>
