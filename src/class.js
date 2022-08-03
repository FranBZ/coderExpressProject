/*    Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el
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
    }

    async readAndParseFile (file) {  // Esta funcion se utiliza para leer el archivo y parsear a JSON la informacion, para su posterior uso

        try {
            const data = await fs.promises.readFile(file, 'utf-8', (err, data) => {         // Consultamos por la informacion
                if(err) throw err
                return data
            })
            return JSON.parse(data)                                                         // Retornamos la informacion parseada
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async save (product) {        // Guarda un archivo nuevo en el array de productos

        try {
            if (fs.existsSync(this.fileName)){                                                      // Si existe
                const data = await this.readAndParseFile(this.fileName)                             // Nos traemos la info parseada a JSON del archivo leido
                const idProduct = data[data.length -1].id + 1                                       // Asignamos el ID siguiente al ultimo asignado
                product.id = idProduct                                                              // Insertamos el ID en el producto
                data.push(product)                                                                  // Pusheamos el producto en el array
                await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2), err => {  // Creamos el archivo y lo escribimos con los objetos del array
                    if(err) throw err
                })
                console.log(`El ID asignado a ${product.title} es: ${product.id}`)
            } else {                                                                                // Si no existe
                product.id = 1                                                                      // Asignamos ID 1 al rpoducto
                const data = [product]                                                              // Pusheamos el producto en el array
                await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2), err => {  // Creamos el archivo y lo escribimos con los objetos del array
                    if(err) throw err
                })
                console.log(`El ID asignado a ${product.title} es: 1`)
            }     
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async getById (id) {  // Esta funcion devuelve un producto segun su ID

        try {
            const data = await this.readAndParseFile(this.fileName)             // Nos traemos la info parseada a JSON del archivo leido
            const object = data.filter(product => product.id == id)             // Filtramos por ID y lo retornamos
            if (object.length !== 0) { return object } else { return null }     // Comprobamos si el array esta vacio o hay algun elemento e imprimimos por consola
        
        } catch (error) {
            console.error(`El error es: ${error}`)
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

    async deleteById (id) { // Esta funcion elimina un producto segun su ID
        try {
            const data = await this.readAndParseFile(this.fileName)
            let newData = data.filter(product => product.id != id)

            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2), err => {
                if(err) throw err
            })

        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }

    async deleteAll () { //Esta funcion elimina todos los productos
        try {
            await fs.promises.writeFile(this.fileName, '[]', err => { // No eliminamos los productos, sino que reescribimos el archivo con un array vacio
                if(err) throw err
            })
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    }
}

module.exports = Contenedor  // Exportamos la clase
