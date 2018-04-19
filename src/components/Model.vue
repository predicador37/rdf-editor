<template>
  <v-tabs icons-and-text>
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab href="#tab-1">
      Clases
      <v-icon>mdi-file-tree</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      Relaciones
      <v-icon>mdi-xbox-controller</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      Atributos
      <v-icon>account_box</v-icon>
    </v-tab>
    <v-tab-item
      v-for="i in 3"
      :key="i"
      :id="'tab-' + i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
    export default {
      data () {
        return {
          text: 'prueba'
        }
      },
      name: 'Model'
    }
</script>

<style scoped>
  @import '../assets/materialdesignicons.min.css';

</style>
