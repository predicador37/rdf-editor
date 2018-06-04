<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in resources">
        <v-list-tile
          :key="item.text"
          ripple
          @click=""
        >
          <v-list-tile-content @click.stop="changeCurrentResource(item.text)">
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
          </v-list-tile-content>

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
          <v-text-field v-model="newResourceName" label="Resource name"></v-text-field>
          <small class="grey--text">Introduzca un nuevo recurso.</small>
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
      dataset: {
        type: Object,
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
        newResourceName: '',
        classes: [],
        myDataset: '',
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
        this.dialog = false
      },
      // TODO: changeCurrentClass mutation to change classdetail component data
      changeCurrentResource (resourceName) {
        this.$emit('change-resource', resourceName)
        this.currentResourceName = resourceName
      }},

    name: 'ResourceList',
    created () {
      this.classes = this.resources  // Copy prop to local variable
      this.myDataset = this.dataset
      console.log(this.classes)
      console.log(this.myDataset)
    }
  }
</script>

<style scoped>


</style>
