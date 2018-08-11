<template>
  <vue-markdown pa-3 :source="mdText"></vue-markdown>
</template>

<script>
   import VueMarkdown from 'vue-markdown'
   export default {
     name: 'markdown-viewer',
     components: {
       VueMarkdown
     },
     props: {
       mdText: {
         default: '# Markdown example text',
         type: String
       }
     }
   }
</script>

<style scoped>

</style>
