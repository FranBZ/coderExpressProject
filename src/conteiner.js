const Contenedor = require('./class.js')   // Importamos la clase
const contenedor1 = new Contenedor('productos.txt')  // Creamos la instancia de la clase y le pasamos el nombre del archivo que utilizará

// Creamos tres objetos que vamos a utilizar para insertar en el archivo
const objeto0 = {
    title: 'teclado hyperex alloy fps pro',
    price: 14250,
    thumbnail: 'https://puntodamia.com.ar/wp-content/uploads/2020/11/23908.jpg'
}
const objeto1 = {
  title: 'teclado redragon fizz pro',
  price: 7900,
  thumbnail: 'https://redragon.es/content/uploads/2022/04/fizz-gris-1.png'
}
const objeto2 = {
  title: 'teclado redragon dragonborn',
  price: 5900,
  thumbnail: 'https://redragon.es/content/uploads/2021/07/Dragonborn-Black-RGB-1.png'
}

// Cargando productos manualmente

contenedor1.save(objeto0)
contenedor1.save(objeto1)
contenedor1.save(objeto2)

module.exports = contenedor1
