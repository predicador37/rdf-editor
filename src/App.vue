<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      dark
      class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-content>

        <router-view/>

    </v-content>

    <v-footer app>
      <span>UNED &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {

    data () {
      return {
        drawer: null,
        miniVariant: false,
        clipped: false,
        items: [{
          icon: 'mdi-home',
          title: 'Inicio',
          link: '/'
        },
        {
          icon: 'mdi-book-open-page-variant',
          title: 'Actividades',
          link: '/activity'
        },
        {
          icon: 'mdi-school',
          title: 'Vocabularios',
          link: '/vocabulary'
        },
        {
          icon: 'mdi-swap-vertical',
          title: 'Importar/Exportar',
          link: '/import-export'
        },
        {
          icon: 'mdi-cube-outline',
          title: 'Modelado',
          link: '/model'
        },
        {
          icon: 'mdi-account-multiple-plus',
          title: 'Poblamiento',
          link: '/population'
        },
        {
          icon: 'mdi-database-search',
          title: 'Consulta',
          link: '/sparql'
        }],
        title: 'RDFplay'
      }
    },
    name: 'App'
  }
</script>
