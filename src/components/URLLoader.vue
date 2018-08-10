<template>
  <div >
    <v-text-field
                  v-model="URL"
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
        // axios
        //   .get('http://www.learningsparql.com/2ndeditionexamples/ex052.rq')
        // //   .then(response => (console.log(JSON.stringify(response))))
        // fetch('https://www.w3.org/2000/01/rdf-schema', {method: 'GET',
        //   mode: 'cors',
        //   headers: { 'Access-Control-Allow-Origin': '*' }}).then(function (result) {
        //     console.log(result)
        //   })
        // this.$emit('load', content)

        this.$http.get('http://www.learningsparql.com/2ndeditionexamples/ex052.rq', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => {
          // get body data
          console.log(response.body)
        }, response => {
          // error callback
        })
        this.$http.get('https://www.w3.org/2000/01/rdf-schema').then(response => {
          // get body data
          console.log(response.body)
        }, response => {
          // error callback
        })
      }
    },
    data () {
      return {
        URL: 'Desde URL'
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
