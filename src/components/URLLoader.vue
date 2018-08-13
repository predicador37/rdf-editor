<template>
  <div >
    <v-text-field
                  v-model="url"
                  solo append-icon="search"
                  @click:append="getFromURL" hide-details single-line></v-text-field>

  </div>

</template>

<script>
  export default {
    name: 'url-loader',
    props: {
      title: {
        default: 'Importar URL',
        type: String
      }
    },
    methods: {
      getFromURL () {
        console.log('getting file from url')
        this.$http.get(this.url).then(response => {
          // get body data
          console.log(response.body)
          this.$emit('load', response.body)
        }, response => {
          // error callback
        })
      }
    },
    data () {
      return {
        url: ''
      }
    }
  }
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;

  }
  .btn-txt {
    padding: 20px;
  }
</style>
