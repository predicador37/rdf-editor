

<template>
  <div>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height fluid>
        <v-layout align-center>
          <v-flex height="100%">
            <h3 class="display-3">{{welcome_message}}</h3>
            <span class="subheading">{{welcome_description}}</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3"> ¡Elige con qué quieres trabajar!</div>
            <v-btn large color="primary" class="mx-3" to="/ModelContainer">Modelar</v-btn>
            <v-btn large color="primary" class="mx-3" to="/ModelContainer">Poblar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>





  </div>
  <!--<v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <h1>Colección de términos</h1>

        <v-select tags multiple chips deletable-chips :items="selectedTags" :value="selectedTags"
                  v-model="selectedTags">


        </v-select>

        <v-select autocomplete :items="selectedTags" v-model="selectedSubject">
        </v-select>
        <v-select :items="rdfProperties" v-model="selectedOPredicate">


        </v-select>
        <v-select :items="owlClasses" v-model="selectedObject">


        </v-select>


      </v-layout>
    </v-slide-y-transition>
  </v-container>-->
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        welcome_message: 'Editor de ontologías de la UNED',
        welcome_description: 'Con el editor de ontologías podrás modelar tu dominio de conocimiento así como dotarlo de contenido semántico.',
        triples: [],
        msg: 'RDF editor proof of concept',
        // rdfProperties: this.getPredicates(),
        selectedPredicate: null,
        selectedObject: null,
        show: true,
        existingTags: {
          analisis: 'analisis',
          pruebas: 'pruebas',
          fase: 'fase',
          metodologia: 'metodologia',
          analista: 'analista',
          usuario: 'usuario',
          producto: 'producto',
          artefacto: 'artefacto',
          especificacion: 'especificacion funcional'
        },
        selectedTags: ['analisis', 'pruebas', 'fase', 'metodologia', 'analista', 'usuario', 'producto', 'artefacto', 'especificacion funcional'],
        terms: ['analisis', 'pruebas', 'fase', 'metodologia', 'analista', 'usuario', 'producto', 'artefacto', 'especificacion funcional'],
        selectedSubject: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
