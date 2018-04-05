

<template>
  <v-container fluid grid-list-xl>

      <v-layout row wrap pb-3>
      <v-flex d-flex xs12 sm12 md12>
        <v-layout column>
        <h1>Colección de términos</h1>

        <v-select tags multiple chips deletable-chips :items="selectedTags" :value="selectedTags"
                  v-model="selectedTags">


        </v-select>
        </v-layout>

      </v-flex>

    </v-layout>


      <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout column>
            <v-select autocomplete :items="selectedTags" v-model="selectedSubject">
            </v-select>
              <v-select :items="rdfProperties" v-model="selectedPredicate">
              </v-select>
              <v-select :items="owlClasses" v-model="selectedObject">
              </v-select>
            </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

        <v-flex d-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex d-flex offset-xs1>
              <v-layout column>
                <v-flex d-flex >
             <h4>Tu tripleta</h4>
                </v-flex>
                <v-flex d-flex >
              Subject: {{qualifiedSubject}}
                </v-flex>
                <v-flex d-flex >
              Predicate: {{selectedPredicate}}
                </v-flex>
                <v-flex d-flex >
              Object: {{qualifiedObject}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        </v-layout>



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
        lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
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

      qualifiedObject: function () {
        // `this` points to the vm instance
        var prefix = 'http://www.uned.es/semantic/'
        if (this.selectedObject != null) {
          return prefix + this.selectedObject.charAt(0).toUpperCase() + this.selectedObject.slice(1)
        } else {
          return null
        }
      }

    },
    methods: {
      getPredicates: function () {
        var rdfProperties = []
        let formats = {
          parsers: new this.$rdf.Parsers({
            'text/turtle': this.$N3Parser
          })
        }

// use the Stream API to read the opening date of the Eiffel Tower
        this.$rdfFetch('https://www.w3.org/2000/01/rdf-schema', {formats: formats}).then((res) => {
          return res.quadStream()
        }).then((stream) => {
          stream.on('data', (quad) => {
            if ((quad.object.equals(this.$rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'))) && (quad.predicate.equals(this.$rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')))) {
              // console.log('Subject ' + quad.subject.value + ' Predicate ' + quad.predicate.value + ' Object ' + quad.object.value)
              if (!rdfProperties.includes(quad.subject.value)) {
                var shortName = quad.subject.value.split('http://www.w3.org/2000/01/rdf-schema#')
                rdfProperties.push({text: shortName[1], value: quad.subject.value})
              }
            }
          })

          // return this.$rdf.waitFor(stream)
        }).catch((err) => {
          console.error(err.stack || err.message)
        })
        return rdfProperties
      },
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        console.log(this.selected)
      },
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */

        this.selected = null

        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => { this.show = true })
      },
      exportJsonLD: function () {
        // create a prefix map and fill it
        const prefixMap = this.$rdf.prefixMap({
          ex: this.$rdf.namedNode('http://www.uned.es/semantic/')
        })

        const quad = this.$rdf.quad(
          prefixMap.resolve('ex:' + this.selectedSubject.charAt(0).toUpperCase() + this.selectedSubject.slice(1)),
          this.$rdf.namedNode(this.selectedPredicate),
          prefixMap.resolve('ex:' + this.selectedObject.charAt(0).toUpperCase() + this.selectedObject.slice(1))
        )

        // create a quad stream to feed the serializer
        const quadStream = new this.$Readable({
          objectMode: true,
          read: () => {}
        })

        // create a JSON-LD serializer instance which returns strings and compacts the JSON-LD
        const serializer = new this.$JsonLdSerializer({outputFormat: 'string', compact: true})

        // forward the quads to the serializer
        const jsonStream = serializer.import(quadStream)

        // pipe the serializer output to stdout
        // jsonStream.pipe(process.stdout)
        // console.log(jsonStream)
        // forward the prefix map...
        prefixMap.export(quadStream)

        // ...and the quad
        quadStream.push(quad)
        quadStream.push(null)

        let result

        jsonStream.on('data', (data) => {
          result = data
        })

        return this.$rdf.waitFor(jsonStream).then(() => {
          var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(result)
          var downloadAnchorNode = document.createElement('a')
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

.tags-input-default-class {
  padding: .5rem .25rem;

  background: #fff;

  border: 1px solid transparent;
  border-radius: .25rem;
  border-color: #dbdbdb;
}

.tags-input-remove {
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  overflow: hidden;
}

.tags-input-remove:before, .tags-input-remove:after {
  content: '';
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  background: #5dc282;

  height: 2px;
  margin-top: -1px;
}

.tags-input-remove:before {
  transform: rotate(45deg);
}
.tags-input-remove:after {
  transform: rotate(-45deg);
}

</style>
