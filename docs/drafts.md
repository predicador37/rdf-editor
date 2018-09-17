 <!--value="SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100"-->

   // resourceType = resourceType.split('#')[1].toLowerCase()
         // using a string concatenation as parameter: 'add'+type to call the methods dynamically
         // this['add' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1)](this.baseUrl + resourceName) // addClass
         // not necessary... a generic resource can be added. But getting classes is the result of joining two datasets...
         // how to generalize this?
         // this[resourceType.match('[ch|sh|s|x|z]$') ? 'get' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1) + 'es' : 'get' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1) + 's']() // getClasses
         // this.getClasses()


         ---------------

           <v-card tile="true" v-for="(element, idx) in relatedClasses[item]" :key="idx">
                       <v-card-title>
                           <h3 class="headline mb-0">{{element.text }}</h3>
                             <v-menu bottom right>
                               <v-btn
                                 slot="activator"
                                 light
                                 icon
                                 aria-label="Menú de acciones para propiedad"
                               >
                                 <v-icon>more_vert</v-icon>
                               </v-btn>
                               <v-list>
                                 <v-list-tile
                                   v-for="(action,j) in actions"
                                   :key="j"
                                   @click=""
                                   @click.native.stop="executeAction(action, item, element.value)"
                                 >
                                   <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                                 </v-list-tile>
                               </v-list>
                             </v-menu>
                             {{element.value}}.
                       </v-card-title>
                     </v-card>
