import {Router} from "express"
import ProductManager from "../controllers/ProductManager.js"
const routerProduct = Router() //cambiamos app. por otro nombre
const productManager  = new ProductManager("./src/models/products.json");

//Ver todos los productos
routerProduct.get('/', async (req, res) => { 
    const { limit } = req.query; //Usamos req.query para realizar multiples consultas en un endpoint
    const productos = await productManager.getProducts()
    res.send(productos) //Respuesta al servidor (Siempre debe devolver un res.send)
})
  
//Ver un producto por su id
routerProduct.get('/:id', async (req, res) => { 
    const producto = await productManager.getProductById(req.params.id) //Utilizo req.params para realizar una consulta sobre 1 elemento en específico
    res.send(producto) 
}) 
  
//Agregar producto
routerProduct.post('/', async (req, res) => { 
    let mensaje = await productManager.addProduct(req.body) //re1.body, lo usamos para enviar información o actualizar en un servidor
    res.send(mensaje)
})

//Eliminar un producto  
routerProduct.delete('/:id', async (req, res) => {
    let mensaje = await productManager.deleteProduct(req.params.id) 
    res.send(mensaje)
})
  
//Actualizar un producto
routerProduct.put('/:pid', async (req, res) => { 
    let mensaje = await productManager.updateProduct(req.params.pid, req.body) 
    res.send(mensaje)
})

//Exportamos para llamar rutas en app.js
export default routerProduct