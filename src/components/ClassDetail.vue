<template>
<div>
  <v-card>
    <v-card-title primary-title>
      <div class="headline"> Clase
      </div>
    </v-card-title>
    <v-card-text>
      {{className}}
    </v-card-text>
  </v-card>

</div>
</template>

<script>
    export default {
      name: 'ClassDetail',
      props: {
        className: {
          type: String,
          required: true
        }
      }
    }
</script>

<style scoped>

</style>
