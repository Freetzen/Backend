import express from 'express'
import ProductManager from "./ProductManager.js";

const app = express()
const PORT = 4000
const manager = new ProductManager("./src/database.json");


app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send("Desafío 3 con Servidor Express <3")
});

app.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);
});

app.get("/products/:pid", async (req, res) => {
    const product = await manager.getProductById(parseInt(req.params.pid));
    product === null ? res.send("No se encontró el producto") : res.send(product);
});

app.listen(PORT, ()=>{
    console.log(`Server en linea en puerto ${PORT}`)
}) ;