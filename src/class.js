/* >> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el
      nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
        ● save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        ● getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        ● getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        ● deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        ● deleteAll(): void - Elimina todos los objetos presentes en el archivo. */

const fs = require('fs')

class Contenedor {

  constructor (fileName) {  // Constuctor, recibe como parametro el nombre del archivo
    this.fileName = fileName  // Nombre del archivo
    this.products = []        // Array de productos
    this.id = 1               // Contador de IDs
  }

  getId () {   // Retorna ID
    return this.id
  }

  increaseID () { // Incrementa el ID
    this.id += 1
  }

  getProducts () {  // Retorna el array de productos
    return this.products
  }

  async save (product) {  // Guarda un archivo nuevo con todos los productos

    const id = this.getId()   // Obtenemos el ID que podemos usar para nuestro nuevo producto
    this.increaseID()       // Incrementamos el ID para Su posterior uso en caso de nuevos productos
    product.id = id          // Agregamos el ID al objeto que nos pasan por parametros
    this.products.push(product)  // Pusheamos el producto en el array de productos
    const data = JSON.stringify(this.products, null, 2)  // pasamos a string el producto para poder escribirlo en el txt
    try {
      await fs.writeFile(this.fileName, data, err => {  // Creamos el archivo y lo escribimos con los objetos del array
        if(err) throw err
      })
      console.log('Producto guardado con éxito - N° ID asignado:', id)
    } catch (error) {
      console.error(`El error es ${error}`)
    }
  }

  async readAndParseFile (file) {  // Esta funcion se utiliza para leer el archivo y parsear a JSON la informacion, para su posterior uso

    try {
      const data = await fs.promises.readFile(file, 'utf-8', (err, data) => {  // Consultamos por la informacion
        if(err) throw err
        return data
      })
      return JSON.parse(data)  // Retornamos la informacion parseada
    } catch (error) {
      console.error(`El error es: ${error}`)
    }
  } 

  async getById (id) {  // Esta funcion devuelve un producto segun su ID

    try {
      const data = await this.readAndParseFile(this.fileName)  // Nos traemos la info parseada a JSON del archivo leido
      const object = data.filter(product => product.id == id)  // Filtramos por ID y lo retornamos
      if (object.length !== 0) { return object } else { return null }      // Comprobamos si el array esta vacio o hay algun elemento e imprimimos por consola
    } catch (error) {
      return `El error es: ${error}`
    }
  }

  async getAll () {  // Esta funcion devuelve todos los productos del archivo
    try {
      const data = await this.readAndParseFile(this.fileName) // Nos traemos la info parseada a JSON del archivo leido e imprimimos por consola
      return data
    } catch (error) {
      console.error(`El error es: ${error}`)
    }
  }

  async deleteById (id) { // Esta funcion devuelve un producto segun su ID
    try {
      const data = await this.readAndParseFile(this.fileName)
      let newData = data.filter(product => product.id != id)

      await fs.writeFile(this.fileName, JSON.stringify(newData, null, 2), err => {
      if(err) throw err
      console.log('Producto borrado con éxito')
    })

    } catch (error) {
      console.error(`El error es: ${error}`)
    }
  }

  async delteAll () { //Esta funcion elimina todos los productos
    try {
      this.products = []  // Reasignamos un array vacio al array de productos
      await fs.writeFile(this.fileName, '[]', err => { // No eliminamos los productos, sino que reescribimos el archivo con un array vacio
        if(err) throw err
        console.log('Archivo vaciado con éxito')
      })
    } catch (error) {
      console.error(`El error es: ${error}`)
    }
  }
}

module.exports = Contenedor  // Exportamos la clase
