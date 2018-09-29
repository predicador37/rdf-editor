# Repo comunica

    $ git clone git@github.com:comunica/comunica
    // $ git checkout ff45932ef5deb1cc727db4bd76d10733b957815b
    $ git checkout 3b0080ec67c7f8b1ea7a5002c1e2a235171a9941
    $ cd comunica
    $ yarn install

# Repo rdf-editor
    $ cd node_modules
    $ ln -s ../../comunica/packages/ @comunica

**Cada vez que se instale un paquete con npm, eliminar el enlace simbólico a comunica o eliminará su contenido**
