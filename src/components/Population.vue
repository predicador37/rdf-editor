<template>
<div id="population">
  <v-container fluid>
    <v-layout row wrap>
      <v-flex px-3 py-3 md6 xs12>
        <v-card height="100%">
          <v-card-title primary-title>
            <div class="headline">Poblamiento</div>
          </v-card-title>

          <v-card-text>
            <p>Desde aquí podrás añadir ternas arbitrarias a tu grafo. Puedes introducir cualquier URI en los distintos elementos del formulario, si bien se presentarán algunas sugerencias preparadas para crear instancias de clases ya existentes.</p>
            <v-text-field
              label="Introduce un recurso como sujeto"
              v-model="subject"
            ></v-text-field>

            <v-combobox
              v-model="predicate"
              :items="predicates"
              item-text="value"
              item-value="value"
              label="Selecciona un recurso como predicado"
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
    name: 'population',
    data () {
      return {
        snackbar: false,
        snackbarMessage: 'Terna añadida con éxito',
        color: 'primary',
        subjects: [],
        predicates: [],
        objects: [],
        subject: null,
        predicate: null,
        object: null,
        subjectSearchInput: null,
        predicateSearchInput: null,
        objectSearchInput: null
      }
    },
    computed: {...mapGetters(['rdfConstructs', 'getDefaultResources', 'getSubjectListByPredicateAndObject', 'getObjectListByPredicateAndSubject'])},
    methods: { ...mapActions(['addTriple']),
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
        try {
          this.addTriple({
            'subject': this.subject,
            'predicate': this.predicateSearchInput !== null ? this.predicateSearchInput : this.predicate,
            'object': this.objectSearchInput !== null ? this.objectSearchInput : this.object
          })
          this.handleSuccess('La terna ha sido añadida con éxito')
        } catch (error) {
          this.handleError(error.message)
          console.log(error)
        }
      },
      handleError (event) {
        this.snackbarMessage = event
        this.color = 'error'
        this.snackbar = true
      },
      handleSuccess(event) {
        this.snackbarMessage = event
        this.color = 'success'
        this.snackbar = true
      }
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
