

<template>
  <v-container fluid grid-list-xl>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">{{welcome_message}}</h3>
            <span class="subheading">{{welcome_description}}</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3"> ¡Elige con qué quieres trabajar!</div>
            <v-btn large color="primary" class="mx-3" to="/Model">Modelar</v-btn>
            <v-btn large color="primary" class="mx-3" to="/Model">Poblar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>





  </v-container>
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
        selectedSubject: null,
        rdfProperties: [
          {text: 'rdf:type', value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'},
          {text: 'rdfs:subClassOf', value: 'http://www.w3.org/2000/01/rdf-schema#subClassOf'},
          {text: 'rdfs:subPropertyOf', value: 'http://www.w3.org/2000/01/rdf-schema#subPropertyOf'},
          {text: 'rdfs:domain', value: 'http://www.w3.org/2000/01/rdf-schema#domain'},
          {text: 'rdfs:range', value: 'http://www.w3.org/2000/01/rdf-schema#range'}

        ],
        owlClasses: [
          {text: 'owl:Thing', value: 'https://www.w3.org/2002/07/owl#Thing'},
          {text: 'owl:Class', value: 'https://www.w3.org/2002/07/owl#Class'},
      {text: 'owl:DatatypeProperty', value: 'https://www.w3.org/2002/07/owl#DatatypeProperty'},
  {text: 'owl:ObjectProperty', value: 'https://www.w3.org/2002/07/owl#ObjectProperty'},
  {text: 'rdf:XMLLiteral', value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral'}
        ]
      }
    },
    computed: {
      qualifiedSubject: function () {
        // `this` points to the vm instance
        var prefix = 'http://www.uned.es/semantic/'
        if (this.selectedSubject != null) {
          return prefix + this.selectedSubject.charAt(0).toUpperCase() + this.selectedSubject.slice(1)
        } else {
          return null
        }
      },
      dataset: function () {
        return this.$rdf.dataset(this.triples)
      }

    },
    methods: {
      addToGraph: function () {
        this.triples.push(this.$rdf.quad(this.$rdf.namedNode(this.selectedSubject), this.$rdf.namedNode(this.selectedPredicate), this.$rdf.namedNode(this.selectedObject)))
        console.log(this.triples)
      },
      exportJsonLD: function () {
        // create a prefix map and fill it
        const prefixMap = this.$rdf.prefixMap({
          ex: this.$rdf.namedNode('http://www.uned.es/semantic/')
        })
        let quadStream = this.dataset.toStream()

        // create a JSON-LD serializer instance which returns strings and compacts the JSON-LD
        const serializer = new this.$JsonLdSerializer({outputFormat: 'string', compact: true})
        // forward the quads to the serializer
        const jsonStream = serializer.import(quadStream)

        prefixMap.export(quadStream)

        let result

        jsonStream.on('data', (data) => {
          result = data
        })

        return this.$rdf.waitFor(jsonStream).then(() => {
          let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
          let downloadAnchorNode = document.createElement('a')
          downloadAnchorNode.setAttribute('href', dataStr)
          downloadAnchorNode.setAttribute('download', 'dataset.json')
          document.body.appendChild(downloadAnchorNode)
          downloadAnchorNode.click()
          downloadAnchorNode.remove()
          console.log(dataStr)
        })
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
