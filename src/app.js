const express = require('express')
const contenedor1 = require('./conteiner.js')

const app = express()
const PORT = 8080

app.listen(PORT, () => {
    console.log('App escuchando en puerto', PORT);
})

app.use(express.json())

app.get('/productos', async (req, res) => {   

        const data = await contenedor1.getAll()
        res.send(data)
})


app.get('/productoRandom', async (req, res) => { 

        const productos = await contenedor1.getAll()
        const IDs = productos.map(({ id }) => id)
        const randID = Math.floor(Math.random() * (IDs.length));
        const randProd = await contenedor1.getById(IDs[randID])
        res.send(randProd)

})


