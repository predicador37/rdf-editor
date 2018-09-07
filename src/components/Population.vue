<template>
<div>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <div class="headline">Poblamiento</div>
          </v-card-title>

          <v-card-text>
            <p>Desde aquí podrás añadir tripletas arbitrarias a tu grafo.</p>
            <v-text-field
              label="Selecciona un recurso como sujeto"
              v-model="subject"
            ></v-text-field>

            <v-combobox
              v-model="predicate"
              :items="predicates"
              item-text="value"
              item-value="value"
              label="Introduce un recurso como predicado"
              :search-input.sync="predicateSearchInput"
            ></v-combobox>

            <v-combobox
              v-model="object"
              :items="objects"
              item-text="value"
              item-value="value"
              label="Selecciona un recurso como objeto"
              :search-input.sync="objectSearchInput"
            ></v-combobox>
            <v-btn type="submit" variant="primary" @click="addTripleToGraph()">Añadir instancia</v-btn>
            <p>{{subject.value}} {{predicate.value}}  {{object.value}}</p>
            <p>{{subjectSearchInput}} {{predicateSearchInput}}  {{objectSearchInput}}</p>


            </v-select>

          </v-card-text>
          <v-snackbar
            v-model="snackbar"
            :color="color"
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
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'vocabulary',
    data () {
      return {
        snackbar: false,
        snackbarMessage: 'Vocabulario importado',
        color: 'primary',
        subjects: [],
        predicates: [],
        objects: [],
        subject: '',
        predicate: '',
        object: '',
        subjectSearchInput: '',
        predicateSearchInput: '',
        objectSearchInput: ''
      }
    },
    computed: {...mapGetters(['rdfConstructs', 'getAllSubjectList', 'getDefaultResources', 'getSubjectListByPredicateAndObject', 'getObjectListByPredicateAndSubject'])},
    methods: { ...mapActions(['addResource']),
      async getSubjects ({predicate, object}) {
        let resources = await this.getSubjectListByPredicateAndObject({predicate, object})
        return resources
    // TODO: order array
    // TODO: generalize classes to resources
     },
      async getObjects ({predicate, subject}) {
        let resources = await this.getObjectListByPredicateAndSubject({predicate, subject})
        return resources
        // TODO: order array
        // TODO: generalize classes to resources
      },
      addTripleToGraph () {
        if (this.subject != null && this.predicate != null && this.object != null) {
          this.addResource({'subject': this.subject, 'predicate': this.predicate, 'object': this.object})
        }
      }
    // todo implement enableVocabulary and disableVocabulary
    // add vocabulary to graph from URL
    // delete vocabulary from graph
    },
    beforeMount () {

      this.getSubjects({'predicate': null, 'object': null}).then((results) => {
        this.subjects = results
      })
      this.getObjects({'predicate': null, 'subject':null}).then((results) => {
        this.subjects.push(...results)
      })

      this.objects = this.getDefaultResources('class')
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_Class.value}).then((results) => {
        this.objects.push(...results)
      })
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.rdfs_Class.value}).then((results) => {
        this.objects.push(...results)
      })
      this.predicates = this.getDefaultResources('property')
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_DatatypeProperty.value}).then((results) => {
        this.predicates.push(...results)
      })
      this.getSubjects({'predicate': this.rdfConstructs.rdf_type.value, 'object': this.rdfConstructs.owl_ObjectProperty.value}).then((results) => {
        this.predicates.push(...results)
      })
    }
  }
</script>

<style scoped>

</style>
