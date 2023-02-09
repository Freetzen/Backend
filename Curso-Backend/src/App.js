import express from 'express'
import ProductManager from "./controllers/ProductManager.js";
import { __dirname } from './path.js';

const app = express()
const PORT = 8080
const productManager  = new ProductManager("./src/models/DataBase.json");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', async (req, res) => { 
    const { limit } = req.query; 
    const productos = await productManager.getProducts()
    res.send(productos)
})
  
app.get('/:id', async (req, res) => { 
    const producto = await productManager.getProductById(req.params.id)
    res.send(JSON.stringify(producto))
})
  
app.post('/', async (req, res) => { 
    let mensaje = await productManager.addProduct(req.body)
    res.send(mensaje)
})
  
app.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})
  
app.put('/:id', async (req, res) => { 
    let mensaje = await productManager.updateProduct(req.params.id, req.body)
    res.send(mensaje)
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})