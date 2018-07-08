<template>
<div>
  <v-card>
    <v-card-title primary-title>
      <div class="headline"> Propiedades de clase  {{resource.split('#')[1]}}
      </div>
    </v-card-title>
    <v-card-text>
      <v-list expand>
        <v-list-group
          v-for="(item,index) in editableClassData"
          :key="index"
          no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{rdfConstructs[item].desc_plural}}
               </v-list-tile-title>

            </v-list-tile-content>
            <v-tooltip top>
              <v-btn slot="activator" icon ripple @click.native.stop="addPropertyHandler(item)">
                <v-icon  color="primary lighten-1">add</v-icon>

              </v-btn>
              <span>Añadir</span>
            </v-tooltip>
          </v-list-tile>
          <v-list-tile v-for="(element, idx) in relatedClasses[item]"
                       :key="idx" @click="">
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ element.text ? element.text : element.value }}</v-list-tile-sub-title>
              <v-dialog v-model="deleteDialog" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline">¿Seguro que quieres eliminar para siempre este recurso?</v-card-title>
                  <v-card-text>Si lo haces, no podrás volver a recuperarlo del grafo (a no ser que lo vuelvas a añadir, claro).</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native.stop="deleteDialog = false">Cancelar</v-btn>
                    <v-btn color="red darken-1" flat @click.stop="deleteResourceHandler(currentItem, resourceToDelete)">Confirmar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon ripple @click.native.stop="">

                  <v-icon  color="primary lighten-1">create</v-icon>


                </v-btn>
                <span>Editar</span>
              </v-tooltip>

            </v-list-tile-action>

            <v-list-tile-action>
              <v-tooltip top>
                <v-btn slot="activator" icon ripple @click.native.stop="openDeleteDialog(rdfConstructs[item].value, element.value)">
                  <v-icon color="pink lighten-1">delete</v-icon>
                </v-btn>
                <span>Eliminar</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-text-field v-model="currentLiteral" :label="rdfConstructs[item].desc"></v-text-field>
                <small class="grey--text">Añadir {{ rdfConstructs[item].desc }} para la clase.</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click.native.stop="addClassLiteralPropertyHandler">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-group>
      </v-list>


    </v-card-text>

  </v-card>

</div>

</template>

<script>
  export default {
    name: 'ResourceDetail',
    props: {
      resource: {
        type: String,
        required: true
      },
      editableClassData: {
        type: Array,
        required: true
      },
      rdfConstructs: {
        type: Object,
        required: true
      },
      relatedClasses: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        currentProperty: null,
        currentLiteral: null,
        dialog: false,
        deleteDialog: false,
        resourceToDelete: '',
        currentItem: ''
      }
    },
    methods: {
      addPropertyHandler (property) {
        this.currentProperty = property
        this.dialog = !this.dialog
      },
      addClassLiteralPropertyHandler () {
        this.$emit('add-literal-property', {'resource': this.resource, 'propertyName': this.currentProperty, 'literal': this.currentLiteral})
        this.dialog = false
        this.currentLiteral = null
      },
      openDeleteDialog (item, resource) {
        this.resourceToDelete = resource
        this.currentItem = item
        this.deleteDialog = !this.deleteDialog
      },
      deleteResourceHandler (predicate, object) {
        this.$emit('remove-resource', {'subject': this.resource, 'predicate': predicate, 'object': object})
        this.deleteDialog = false
      }
    }
    // watch: {
    //   resourceName: function (newVal, oldVal) { // watch it
    //     for (const item of this.editableClassData) {
    //       this.getRelatedClasses(item)
    //     }
    //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    //   }
    // }
  }
</script>

<style scoped>

</style>
