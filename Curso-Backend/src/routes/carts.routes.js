import {Router} from "express"
import CartManager from "../controllers/CartManager.js"
const cartProducts = Router() //cambiamos app. por otro nombre
const cartManager  = new CartManager("./src/models/cart.json");

cartProducts.get('/', async (req, res) => { 
    const { limit } = req.query; //Usamos req.query para realizar multiples consultas en un endpoint
    const productos = await cartManager.getProducts()
    res.send(productos) //Respuesta al servidor (Siempre debe devolver un res.send)
})


export default cartProducts