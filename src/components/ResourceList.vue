<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in resources">
        <v-list-tile
          :key="item.text"
          ripple
          @click=""
        >
          <v-list-tile-content @click.stop="changeCurrentResource(item.value)">
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ item.text }}</v-list-tile-sub-title>
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
                  <v-btn flat color="primary" @click.native.stop="editResourceHandler(resourceToEdit)">Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-tooltip top>
              <v-btn slot="activator" icon ripple @click.native.stop="openEditDialog(item.value)">

                <v-icon  color="primary lighten-1">create</v-icon>


              </v-btn>
              <span>Editar</span>
            </v-tooltip>

          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple @click.native.stop="openDeleteDialog(item.value)">
              <v-icon color="pink lighten-1">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < resources.length" :key="index"></v-divider>

      </template>
    </v-list>

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
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
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
        type: this.resourceType,
        dialog: false,
        deleteDialog: false,
        editDialog: false,
        resourceToDelete: '',
        resourceToEdit: '',
        newResourceName: '',
        classes: [],
        items: {
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
      editResourceHandler (resource) {
        this.$emit('edit-resource', resource)
        this.editDialog = false
      },
      openDeleteDialog (resource) {
        this.resourceToDelete = resource
        this.deleteDialog = !this.deleteDialog
      },
      openEditDialog (resource) {
        this.resourceToEdit = resource
        this.editDialog = !this.editDialog
      },
      // TODO: changeCurrentClass mutation to change classdetail component data
      changeCurrentResource (resourceName) {
        this.$emit('change-resource', resourceName)
        this.currentResourceName = resourceName
      }},

    name: 'ResourceList',
    created () {
      this.classes = this.resources  // Copy prop to local variable
    }
  }
</script>

<style scoped>


</style>
