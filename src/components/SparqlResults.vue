<template>
  <v-data-table
    :headers="headers"
    :items="resultList"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td >{{ (props.item.get('?s') && props.item.get('?s').value) ? props.item.get('?s').value : 'Undefined'}}</td>
      <td >{{ (props.item.get('?p') && props.item.get('?p').value) ? props.item.get('?p').value : 'Undefined' }}</td>
      <td>{{ (props.item.get('?o') && props.item.get('?o').value) ? props.item.get('?o').value : 'Undefined' }}</td>
    </template>
  </v-data-table>
</template>

<script>
    export default {
      name: 'SparqlResults',
      props: {
        results: {
          type: Array,
          required: true
        }
      },
      data () {
        return {
          resultList: [],
          headers: [
            {text: 'Sujeto', value: 's'},
            {text: 'Predicado', value: 'p'},
            {text: 'Objeto', value: 'o'}
          ]
        }
      },
      created () {
        this.resultList = this.results  // Copy prop to local variable
      },
      watch: {
        results: function (newVal, oldVal) { // watch it
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
          this.resultList = newVal
          newVal.forEach((item) => {
            if (item.get('?s') && item.get('?s').value) {
              console.log(item.get('?s').value)
            }
            if (item.get('?p') && item.get('?p').value) {
              console.log(item.get('?p').value)
            }
            if (item.get('?o') && item.get('?o').value) {
              console.log(item.get('?o').value)
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
