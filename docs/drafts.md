 <!--value="SELECT ?s WHERE {?s <http://www.w3.org/1999/02/22-rdf-syntax-ns#type>  <http://www.w3.org/2002/07/owl#Class> .} LIMIT 100"-->

   // resourceType = resourceType.split('#')[1].toLowerCase()
         // using a string concatenation as parameter: 'add'+type to call the methods dynamically
         // this['add' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1)](this.baseUrl + resourceName) // addClass
         // not necessary... a generic resource can be added. But getting classes is the result of joining two datasets...
         // how to generalize this?
         // this[resourceType.match('[ch|sh|s|x|z]$') ? 'get' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1) + 'es' : 'get' + resourceType.charAt(0).toUpperCase() + resourceType.slice(1) + 's']() // getClasses
         // this.getClasses()
