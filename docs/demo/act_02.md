# Ingeniería y gestión del conocimiento

## Actividad 2: Interacción con RDF y SPARQL

### Carga desde URL, Poblamiento y consulta local

En primer lugar, el alumno deberá importar el grafo ubicado en la siguiente URL:

        https://raw.githubusercontent.com/ontop/ontop-examples/master/university/univ-ontology.ttl

A continuación, deberá añadir una instancia de ejemplo cuyo sujeto sea su nombre y primer apellido separado por guiones, especificando que la instancia es de tipo `:Student`.

Finalmente, lanzará la consulta ubicada en el fichero: `act02_q01.rq` y comprobará que el resultado es el siguiente:

|?s|
|--|
|http://uned.es/example#Nombre_Apellido|

### Modelado

El alumno deberá añadir una clase `:Proyectandum` al modelo de clases definido. Dicha clase será subclase de `:Student`.

Posteriormente, añadirá una anotación de tipo comentario que explique su propósito: "La presente clase incluye a todos los estudiantes que estén desarrollando su proyecto Fin de Carrera." Además, añadirá una anotación de tipo etiqueta con su descripción: "Proyectando."

### Adición desde fichero y consulta local

El alumno deberá añadir al grafo el contenido del fichero `ex074.ttl`.

A continuación, ejecutará la consulta ubicada en el fichero `ex075.rq`, comprobando el siguiente resultado:

|?s|?title|
|--|------|
|http://uned.es/example#Nombre_Apellido|
|http://example.org/voc#Proyectandum|"Proyectandum"|
|http://learningsparql.com/ns/papers#paperA|"Paper A"|
|http://learningsparql.com/ns/papers#paperB|"Paper B"|

### Consulta a endpoint remoto

Por último, se habilitará la consulta a un endpoint remoto y se introducirá la siguiente URL de wikidata:

        https://query.wikidata.org/sparql

Y ejecutar la consulta almacenada en la URL:

        https://gist.githubusercontent.com/predicador37/ee679e9de8b2cd1a223fbfbc80696442/raw/88c4bc9089f15ae9105553cb432b9e06fb923439/act02_q03.rq
