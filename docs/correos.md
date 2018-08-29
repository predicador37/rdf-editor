Resumen
Abstract
Índices
Introducción
  Motivación y objetivos
  Estado actual
  Estructura de la memoria
Desarrollo
  Metodología
  Planificación
  Recursos
  Análisis
    Necesidades
    Requisitos
  Diseño
    Componentes
  Implementación
  Pruebas
  Resultados
Conclusiones y líneas futuras de trabajo
  Conclusiones
  Líneas futuras de trabajo
Bibliografía
Anexos


23 Marzo 2018 

Ya tengo disponible una demo de lo que estoy haciendo en:

https://unedtfg-198720.firebaseapp.com/

Usaré esta URL para enseñaros los avances, con lo que conviene que cada vez que os avise de que hay cambios la recarguéis en vuestro navegador con CTRL+F5, dado que se trata de una SPA (Single Web Application) desarrollada 100% en front-end.

Funcionalidad desarrollada:

- Se recibe una lista de términos. He prefijado una lista estática que puede modificarse mediante un campo de entrada de etiquetas.
- Se carga parte del vocabulario rdfs en el campo de selección del predicado (concretamente, todos los términos del vocabulario que pertenecen a la clase Property).
- Con los tres campos de selección se permite construir una tripleta básica (de momento, en sujeto y objeto solo he cargado los términos estáticos).
- Una vez construida la tripleta (se puede ver en tiempo real), es posible exportarla a json-ld.

Por qué he tardado tanto:

- Estoy aprendiendo la base del estándar de Javascript ES6, que han cambiado bastantes cosas (a mejor) con respecto al ES5 tradicional.
- Estoy aprendiendo a utilizar el framework vue.js. Cuanto más profundizo, más me gusta. Pero es muy extenso y tengo que ir poco a poco. Estoy siguiendo un par de cursos de decenas de horas en Udemy y otra plataforma, además de haber comprado un par de libros.
- He tenido que estudiar las librerías de gestión de RDF en Javascript. Son unas cuántas (manejo de objetos quad, serializadores...). Estoy usando las liberías base, pero en los canales donde trabajan en esto comentan que el futuro es simplerfd. Probablemente evaluaré su uso en el proyecto.
- También estoy estudiando la gestión de proyectos en Javascript con Webpack y el transpiling con Babel, así como la gestión de librerías con npm, Webpack y Babel. Estos temas me quitan bastante tiempo porque algunas no están transpiladas a ES5 y dan errores, con lo que tengo que estar revisando, instalando plugins en el transpiler, etc. Ahora parece que lo tengo todo estable, hastaque tenga que importar más librerías, claro.
- He tenido que aprender lo básico para realizar despliegues en Firebase para que podáis ver la demo. No me ha quitado mucho tiempo, pero ahí está.

Qué líneas creo que tengo que seguir al margen de la funcionalidad:

- Hasta ahora estaba usando Bootstrap para los estilos, pero hay otros frameworks como vuetify que se integran mucho mejor con vue. Tendría que integrarlos.
- No he hecho nada de testing. Tendría que empezarlo.
- Ya que vue.js es un framework orientado a componentes, creo que tendría que estructurar la aplicación en un conjunto de componentes reutilizables. Veremos cómo puedo ir trabajando esto; básicamente consistirá en definir la arquitectura de la SPA y reordenar el código, además de añadir la funcionalidad que falta, claro.
- Como comentaba antes, creo que tendría que intentar probar la librería simplerdf.

Qué hacemos con la funcionalidad:

El propósito de esta demo no es otro que el que podáis concretarme un poco mejor la funcionalidad requerida. Esta línea es la que yo he entendido de nuestras charlas por Skype, pero podría haberlo entendido mal o, al ver vosotros la demo, podríais querer otras cosas. Yo creo que es un buen punto de partida para seguir. Hay cosas que no he hecho, como permitir la generación de un grafo completo (de momento sólo exporta una tripleta) o cargar un grafo en un formato dado de manera previa. Todo eso se puede hacer. También creo que se pueden mejorar los controles de entrada, dado que no sé si el input-tag es el componente más adecuado para la selección de los términos (me parece que no está mal) y solo uno de los tres selects es de tipo typeahead (que ayude con la búsqueda). Habíamos hablado también de incluir un componente gráfico que represente la red del grafo; esto es complicado, pero creo que sí debería intentar al menos conseguir su representación.

Tengo también bastantes dudas en el ámbito puramente RDF. Por ejemplo: ¿qué namespace ponemos para los términos nuevos? ¿qué vocabularios cargo para construir las tripletas? ¿cómo cargo esos vocabularios? (de momento he cargado sólo propiedades para el predicado, pero habría que definir qué es posible cargar para cada elemento S-P-O).

Con respecto a la integración con un posible servicio REST, creo que puede ser lo más fácil. Si consigo "componentizar" bien la aplicación, la lista de términos podría ser un parámetro de entrada para un componente de edición. En mi TFG esa lista será estática, pero en el futuro podría recuperarse de un servicio REST usando la libería axios dentro del propio vue.js.

Qué pasa con los plazos:

Estamos a finales de marzo y me veo todavía en pañales. No es porque no haya trabajado; no soy desarrollador de frontend y mis conocimientos de RDF son sólo teóricos y no a nivel de experto. Estoy yendo a un ritmo más lento de lo que pensaba. No sé si esto podrá estar para Junio, sobre todo teniendo en cuenta que el tiempo de desarrollo ni siquiera sería de tres meses, según lo que le entendí a José Luis en una conversación. No sé cómo lo véis... es verdad que el arranque es lo más duro, pero temo.

Dicho esto, agradecería todo el feedback que me pudiérais dar, tanto por correo como a través de otro Skype si lo consideráis necesario. Como os digo, es posible que esto no sea para nada lo que me pedíais; consideradlo como una forma más precisa de capturar requisitos. Espero que a partir de ahora pueda ir con más agilidad, ya que lo más difícil (que es montar el proyecto, ver cómo van los frameworks y empezar a trastear con RDF) ya está en marcha.


Febrero 2018


Hola, Miguel.

En el apartado de visualizadores de ontologías y datasets hay cosas hechas, como estás mostrando, que por supuesto siempre se pueden mejorar. El valor añadido que se propone es que el interfaz esté al servicio sobre todo de la conceptualización por parte del usuario: eventos al servicio de que declare que una clase es subclase de otra, o una subpropiedad, o una instancia. Para eso es muy importante la visualización correcta, porque no tiene sentido presentar de golpe toda la ontología y mucho menos todas las instancias, sino la perspectiva adecuada sobre la que trabajar.

Tenemos todo un mundo por desarrollar que lleve a un docente no técnico hacia una conceptualización razonable de su área para ser utilizada por un agente inteligente. De ahí que citáramos ese dominio de aplicación como una de la aplicaciones de referencia del TFG. Pero, si favorecemos esta perspectiva, el interfaz tiene que hacer inteligible a un profesor de Derecho Romano qué le estamos pidiendo y qué potenciales beneficios, vía sistema que lo explote, van a obtener sus estudiantes.

Estoy bastante disponible toda la semana, salvo el miércoles por la mañana. Podemos fijar un skype cuando quieras
--------------------------------------------------------------
Hola de nuevo:

No sé por qué Outlook me había metido tu correo en spam. Lo he visto de milagro...

Mi idea era construir el editor de manera que pudiese explorar un grafo leyéndolo de varias fuentes (punto SPARQL, fichero con el grafo serializado...). No veo mayor inconveniente en usar un WS restful para recuperar términos y luego construir con ellos ternas. Eso sí, la comunicación con el WS debería hacerse en forma de módulo independiente, en mi opinión, para que el editor estuviera lo más desacoplado posible y así pudiera tratarse como un componente reutilizable. También necesitaré la descripción de la API de dicho WS y las estructuras de datos que devuelve (entiendo que JSON). Esto tendrá que estar lo más detallado posible para poder construir el editor sin que exista aún el WS (tendré que hacer tests unitarios).

Si queréis podemos tener un Skype esta semana. Yo menos el martes podría cualquier día por la tarde, por ejemplo. Cuando me digáis.

Por cierto, lo que os proponía en el correo anterior es definitivamente el camino a seguir (al menos en cuanto a la librería rdf-ext). No puedo evitar enviaros una captura de ese chat... mirad quién habla justo después de darles yo las gracias... el mismísimo Tim Berners-Lee !!!
--------------------------------------------------------------
Encantados de ver que ya estás de lleno en el TFG. En este espacio de tiempo hemos ensamblado algunas ideas y hemos propuesto un piloto a la UNED en la que la línea de tu TFG es importante.

Lo que hemos propuesto funciona por capas. Hay un TFG que va a construir un servicio web de diseño de curso (contenidos, términos relevantes, etc). De este módulo ('más clásico')  se pueden beneficiar los docentes porque obtendrán resultados exportables: p.ej. una colección de páginas html interrelacionadas y con el despliegue de contenidos y demás. Como en este servicio se va a facilitar que se resaltan palabras relevantes, o que se inserten directamente en cada uno de las secciones donde se desee, tendremos al final una colección de términos asignados a apartados.

De esta forma, tu TFG no tiene por qué partir de un cuaderno en blanco. Un posible punto de partida puede ser una colección de términos que se pueden ir haciendo aparecer en pantalla para que el usuario construya ternas RDF y relaciones entre ellas. El resultado ya no sería la colección de términos sin más sino una relación de qué es instancia de qué, qué es subclase o subpropiedad de qué, etc. El interfaz aquí es crítico para declarar cómodamente estas relaciones entre términos y para visualizar cada parte de la ontología que se está construyendo. La explicación más detallada de este punto requeriría mejor una conexión Skype. Seguimos en la línea d e lo que propusimos, pero (si parece oportuno) consideramos que el cuaderno está poblado inicialmente por una información terminológica cualquiera (o se permite añadir los términos que se desee sobre la marcha).
---------------------------------------
Hola, José Luis y Rafael:

Supongo que os hayáis olvidado un poco de mí después de 4 meses. Solo quería deciros que ya estoy dedicado plenamente al TFG. Por si no lo recordáis, se trataba de desarrollar una especie de editor RDF. Quería comentaros mis avances a este respecto para confirmar con vosotros la línea de trabajo a seguir.

Como se trata de un proyecto con mucho front-end, he revisado el estado del arte de RDF en el mundo Javascript. Digamos que hay alguna librería no oficial como Jassa [1] o Rdforms [2], que construyen su propio modelo del grafo. La primera tiene hasta una pequeña integración con Angular.js (la primera versión). Me pareció curioso que cada una tuviera su propia implementación en Javascript de un modelo de grafo RDF, y no me gustaría hacer una desde cero porque considero que no aporta valor y va en contra de la reutilización de estándares. Por eso indagué un poco más y di con lo más parecido a un estándar de RDF sobre Javascript que hay: un grupo de trabajo del W3C. Tienen un par de canales en gitter y he preguntado; parece ser que la mejor implementación hasta la fecha del borrador de la especificación [3] es rdf-ext [4]. Me han indicado claramente que es el camino a seguir.

También me han aconsejado que utilice vue.js [5] como framework Javascript. He estado valorando y comparando sus características con las de Angular y React.js. Parece que vue.js puede encajar mejor al seguir las mejores filosofías de ambos (orientación a componentes, desacoplamiento de vista/modelo, etc.) y presentar una curva de aprendizaje más suave. He estado leyendo la documentación y me resulta cómodo.

