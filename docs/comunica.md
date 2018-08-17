# Repo comunica

    $ git clone git@github.com:comunica/comunica
    $ git checkout ff45932ef5deb1cc727db4bd76d10733b957815b
    $ cd comunica
    $ yarn install

# Repo rdf-editor
    $ cd node_modules
    $ ln -s ../../comunica/packages/ @comunica

**Cada vez que se instale un paquete con npm, eliminar el enlace simbólico a comunica o eliminará su contenido**
