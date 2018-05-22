<template>
  <div class="btn btn-primary jbtn-file"> {{ title }}<input
    type="file" @change="fileSelected"></div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'graph-loader',
    props: {
      title: String
    },
    methods: {...mapActions(['importN3']),
      fileSelected (ev) {
        const file = ev.target.files[0]
        const reader = new FileReader()
        reader.onload = e => this.$emit('load', e.target.result)
        reader.readAsText(file)
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
</style>
