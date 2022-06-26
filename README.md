# coderExpressProject
Este repositorio contiene un proyecto para ser entregado en el curso de coder

>> Consigna:

1)  Realizar un proyecto de servidor basado en node.js que utilice el módulo express e
    implemente los siguientes endpoints en el puerto 8080:

    a)  Ruta get '/productos' que devuelva un array con todos los productos disponibles
        en el servidor
    b)  Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos
        los productos disponibles

2)  Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío
    anterior para acceder a los datos persistidos del servidor.
    Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el
    ejemplo del desafío anterior.

# IMPORTANTE

Para poder ejecutar la aplicacion ejecutar el archivo app.js, 
luego dirigirse en su navegador a la direccion "http://localhost:8080/productos" o "http://localhost:8080/productoRandom"