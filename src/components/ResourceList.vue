<template>
  <div>
    <v-card height="100%">
        <v-card-title primary-title>
          <div class="headline"> {{name}}
          </div>
          <v-fab-transition>
            <v-btn
              absolute
              small
              dark
              fab
              middle
              right
              color="pink"
              @click.native.stop="dialog = !dialog"
            >

              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card height="100%">
              <v-card-text>
                <v-text-field v-model="newResourceName" :label="name"></v-text-field>
                <small class="grey--text">Añadir {{name}}</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click.native="addResourceHandler">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-title>
<v-card-text>
    <v-data-table
      hide-headers
      :items="resources"
      rows-per-page-text="Filas por página"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr :key="props.item.value" class="tableRowCursor" @click="" @click.stop="changeCurrentResource(props.item.value)">
        <td> {{ props.item.value}} </td>
          <td class="text-xs-right">
            <v-menu bottom right>
              <v-btn
                slot="activator"
                light
                icon
              >
                <v-icon>more_vert</v-icon>
              </v-btn>

              <v-list>
                <v-list-tile
                  v-for="(action,j) in actions"
                  :key="j"
                  @click=""
                  @click.native.stop="executeAction(action, props.item.value)"
                >
                  <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </tr>
        <!--<td >{{ (props.item.get('?s') && props.item.get('?s').value) ? props.item.get('?s').value : 'Undefined'}}</td>-->
        <!--<td >{{ (props.item.get('?p') && props.item.get('?p').value) ? props.item.get('?p').value : 'Undefined' }}</td>-->
        <!--<td>{{ (props.item.get('?o') && props.item.get('?o').value) ? props.item.get('?o').value : 'Undefined' }}</td>-->
      </template>

    </v-data-table>

            <v-dialog v-model="deleteDialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">¿Seguro que quieres eliminar para siempre este recurso?</v-card-title>
                <v-card-text>Si lo haces, no podrás volver a recuperarlo del grafo (a no ser que lo vuelvas a añadir, claro).</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click.native.stop="deleteDialog = false">Cancelar</v-btn>
                  <v-btn color="red darken-1" flat @click.stop="deleteResourceHandler(resourceToDelete)">Confirmar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="editDialog" max-width="500px">
              <v-card>
                <v-card-text>
                  <v-text-field v-model="resourceToEdit" :label="name"></v-text-field>
                  <small class="grey--text">Editar {{name}}</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click.native.stop="editResourceHandler(oldResource, resourceToEdit)">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import Treeview from '@/components/Treeview'
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      resources: {
        type: Array,
        required: true
      }
    },
    components: {
      'v-treeview': Treeview
    },
    data () {
      return {
        text: 'prueba',
        headers: [],
        type: this.resourceType,
        dialog: false,
        deleteDialog: false,
        editDialog: false,
        resourceToDelete: '',
        resourceToEdit: '',
        oldResource: '',
        newResourceName: '',
        classes: [],
        actions: [
          {title: 'Editar', method: 'openEditDialog'},
          {title: 'Eliminar ', method: 'openDeleteDialog'},
          {title: 'Añadir subclase', method: ''}
        ],
        items2: {
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
    methods: {
      addResourceHandler () {
        // emit event to parent with the resourceName
        this.$emit('add-resource', this.newResourceName)
        this.newResourceName = ''
        this.dialog = false
      },
      deleteResourceHandler (resource) {
        this.$emit('remove-resource', resource)
        this.deleteDialog = false
      },
      editResourceHandler (oldResource, resource) {
        this.$emit('edit-resource', {oldResource, resource})
        this.editDialog = false
      },
      openDeleteDialog (resource) {
        this.resourceToDelete = resource
        this.deleteDialog = !this.deleteDialog
      },
      openEditDialog (resource) {
        this.resourceToEdit = resource
        this.oldResource = resource
        this.editDialog = !this.editDialog
      },
      executeAction (action, itemValue) {
        console.log(action.method)
        this[action.method](itemValue)
      },
      // TODO: changeCurrentClass mutation to change classdetail component data
      changeCurrentResource (resourceName) {
        this.$emit('change-resource', resourceName)
        this.currentResourceName = resourceName
      }},

    name: 'ResourceList',
    created () {
      this.classes = this.resources  // Copy prop to local variable
      this.headers.push({'text': this.name, 'value': this.name})
      console.log(this.headers)
    }
  }
</script>

<style scoped>
.tableRowCursor{
  cursor:pointer
}

</style>
