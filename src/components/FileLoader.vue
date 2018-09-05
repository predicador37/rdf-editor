<template>
  <div class="v-btn btn-primary jbtn-file">
    <span class="btn-txt">{{ title }} <i class="mdi mdi-upload mdi-18px"></i></span><input name="file-upload"
    type="file" accept="text/markdown" data-max-size="2048" @change="fileSelected">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: 'file-loader',
    props: {
      title: {
        default: 'Importar archivo',
        type: String
      },
      size: {
        default: 500000,
        type: Number
      },
      extension: {
        default: 'md',
        type: String
      }
    },
    methods: {
      fileSelected (ev) {
        this.loading = true
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.onload = e => this.$emit('load', e.target.result)
        if (file.name.split('.')[1] !== this.extension) {
          console.log(file.name)
          this.loading = false
          this.$emit('load-error', 'El fichero no tiene extensión .md')
          return
        }
        if (file.size > this.size) {
          console.log(file.size)
          this.loading = false
          this.$emit('load-error', 'El fichero sobrepasa el tamaño máximo de ' + this.size + ' bytes')
          return
        }
        reader.readAsText(file)
        this.loading = false
        this.$emit('file-loaded', 'El fichero se ha cargado en el almacenamiento interno.')
      }
    },
    data () {
      return {
        loading: false
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
