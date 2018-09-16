<template>
  <div>
    <v-card height="100%">
      <v-card-title primary-title>
        <div class="headline"> Descripción de {{name.toLowerCase()}} {{resource.split('#')[1]}}
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
                <v-btn aria-label="Añadir propiedad" slot="activator" icon ripple @click.native.stop="addPropertyHandler(item)">
                  <v-icon color="primary lighten-1">add</v-icon>
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
                    <v-card-title class="headline">¿Seguro que quieres eliminar para siempre este recurso?
                    </v-card-title>
                    <v-card-text>Si lo haces, no podrás volver a recuperarlo del grafo (a no ser que lo vuelvas a
                      añadir, claro).
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat @click.native.stop="deleteDialog = false">Cancelar</v-btn>
                      <v-btn color="red darken-1" flat
                             @click.stop="deleteResourceHandler(currentItem, resourceToDelete)">Confirmar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="editDialog" max-width="500px">
                  <v-card>
                    <v-card-text>
                      <v-text-field v-model="currentLiteral" :label="dialogText"></v-text-field>
                      <small class="grey--text">Editar {{ dialogText }} para la clase.</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click.native.stop="editClassLiteralPropertyHandler">Guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu bottom right>
                  <v-btn
                    slot="activator"
                    light
                    icon
                    aria-label="Menú de acciones para propiedad"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(action,j) in actions"
                      :key="j"
                      @click=""
                      @click.native.stop="executeAction(action, item, element.value)"
                    >
                      <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-text-field v-model="currentLiteral" :label="dialogText"></v-text-field>
                  <small class="grey--text">Añadir {{ dialogText }} para la clase.</small>
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
      name: {
        type: String,
        required: true
      },
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
        dialogText: '',
        deleteDialog: false,
        editDialog: false,
        resourceToDelete: '',
        resourceToEdit: '',
        currentItem: '',
        actions: [
          {title: 'Editar', method: 'openEditDialog'},
          {title: 'Eliminar ', method: 'openDeleteDialog'}
        ]
      }
    },
    methods: {
      addPropertyHandler (property) {
        this.currentProperty = property
        this.dialogText = this.rdfConstructs[property].desc
        this.dialog = !this.dialog
      },
      addClassLiteralPropertyHandler () {
        this.$emit('add-literal-property', {'resource': this.resource, 'propertyName': this.currentProperty, 'literal': this.currentLiteral})
        this.dialog = false
        this.currentLiteral = null
      },
      openDeleteDialog (item, resource) {
        this.resourceToDelete = resource
        this.currentItem = this.rdfConstructs[item].value
        this.deleteDialog = !this.deleteDialog
      },
      openEditDialog (item, resource) {
        this.resourceToEdit = resource // object
        this.currentItem = item // predicate
        console.log(item)
        this.dialogText = this.rdfConstructs[item].desc
        this.currentLiteral = resource
        this.editDialog = !this.editDialog
      },
      executeAction (action, item, resource) {
        console.log(action.method)
        this[action.method](item, resource)
      },
      deleteResourceHandler (predicate, object) {
        this.$emit('remove-resource', {'subject': this.resource, 'predicate': predicate, 'object': object})
        this.deleteDialog = false
      },
      editClassLiteralPropertyHandler () {
        this.$emit('edit-literal-property', {'subject': this.resource, 'predicate': this.currentItem, 'object': this.resourceToEdit, 'newObject': this.currentLiteral})
        this.editDialog = false
        this.currentLiteral = null
        this.resourceToEdit = ''
      }
    },
    beforeMount () {
      console.log(JSON.stringify(this.relatedClasses))
    }
  }
</script>

<style scoped>

</style>
