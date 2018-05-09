<template>
  <div>
  <v-tabs icons-and-text>
    <v-tabs-slider color="primary"></v-tabs-slider>
    <v-tab href="#tab-1">
      Clases
      <v-icon>mdi-file-tree</v-icon>
    </v-tab>
    <v-tab href="#tab-2">
      Relaciones
      <v-icon>mdi-human-male-female</v-icon>
    </v-tab>
    <v-tab href="#tab-3">
      Atributos
      <v-icon>mdi-format-list-bulleted-type</v-icon>
    </v-tab>
    <v-tab-item key="1" id="tab-1">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex px-3 py-3 md6 xs12>
            <v-card>
              <v-card-title primary-title>
                <div class="headline"> Classes</div>
              </v-card-title>

              <v-card-text>
                <v-list two-line>
                  <template v-for="(item, index) in queryResult">
                    <v-list-tile
                      :key="item.text"
                      ripple
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
                      </v-list-tile-content>

                    </v-list-tile>
                    <v-divider v-if="index + 1 < queryResult.length" :key="index"></v-divider>
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
              </v-card-text>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-text-field v-model="className" label="Class name"></v-text-field>
                    <small class="grey--text">* This doesn't actually save.</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click.native="addClassHandler">Submit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-card>

          </v-flex>
          <v-flex px-3 py-3 md6 xs12>
            <v-card>

              <v-card-text>
                <v-treeview :items="items"></v-treeview>
              </v-card-text>
              {{dataset}}
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-tab-item>
    <v-tab-item key="2" id="tab-2">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item key="3" id="tab-3">
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
  </div>
</template>

<script>
  import Treeview from '@/components/Treeview'
  import {mapState, mapActions, mapGetters} from 'vuex'
  export default {
    computed: {...mapState(['dataset', 'queryResult']),
      ...mapGetters({dataset: 'dataset'
      })},
    components: {
      'v-treeview': Treeview
    },
    data () {
      return {
        text: 'prueba',
        dialog: false,
        className: null,
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
    methods: {...mapActions(['getClassList', 'addClass']),
      addClassHandler () {
        this.addClass(this.className)
        this.getClassList()
        this.dialog = false
      }},
    beforeMount () {
      this.getClassList()
    },
    name: 'Model'
  }
</script>

<style scoped>


</style>
