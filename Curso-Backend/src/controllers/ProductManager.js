import {promises as fs} from "fs"; 
const ruta = "../models/products.json"; 


class Product {
    constructor(title, description, price, status, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.status = status
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.addId()
    }

    static addId(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}
class ProductManager { 
    constructor(path) { 
        this.path = path; 
    }

    addId = async () => { 
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    addProduct = async ({title, description, price, status, thumbnail, code, stock}) => {
        const producto = {title, description, price, status, thumbnail, code, stock} //Desestructuración
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8')) //Lee el archivo JSON con los productos existentes y lo parsea a un objeto de JavaScript.
        if (prods.some((elem) => elem.code === producto.code)) { //Verifica si el código del nuevo producto ya existe en la lista de productos. Retornando True o False
            return `El código ${producto.code} ya existe, no se puede crear el producto`;
        } else{ //Si el código no existe, se asigna un nuevo ID al producto y se agrega a la lista de productos.
            let newID;
            //Operador ternario para asignar un nuevo id al producto
            !prods.length ? (newID = 1) : (newID = prods[prods.length - 1].id + 1) //si prods.length es igual a 0, newID se establece en 1. De lo contrario, se establece en el ID del último producto en la lista sumando 1.
            prods.push({ ...producto, 'id': newID }) //Agrega el objeto "producto" a la lista de productos "prods", mediante spread operator(copiando los datos)
        await fs.writeFile(this.path, JSON.stringify(prods)) //Escribimos el producto nuevo y lo pasamos a de objeto a JSON
        return "Producto creado"
        }
    }

    getProducts = async () => {
        const read = await fs.readFile(this.path, 'utf-8') //Leemos el archivo JSON
        const data = JSON.parse(read) //Pasamos de JSON a objeto JS
        if (data.length != 0) { //Si la longitud es diferente a 0, muestra los productos en el array.
            return (data)
        } else {
            return ("No se encuentran productos en el listado.") //Si no encuentra nada, retorna mensaje con error
        }
    }

    getProductById = async (id) => {
        const read = await fs.readFile(this.path, 'utf-8'); //Leemos el archivo JSON
        const data = JSON.parse(read); //Paseamos el JSON y convertimos a objeto JS
        const findProduct = data.find((prod) => prod.id === parseInt(id)); //Buscamos un producto en el arreglo que tenga una propiedad id igual al valor proporcionado en el argumento "id"
        if (findProduct) { //Si findProduct es verdadero (se encontró el id), lo devuelve
            return (findProduct)
        } else { //De lo contrario, retorna un mensaje de error
            return ("Producto no encontrado")
        }
    }

    deleteProduct = async (id) => {
        try {
            const read = await fs.readFile(this.path, "utf-8"); //Leemos el archivo JSON
            const data = JSON.parse(read); ////Paseamos el JSON y convertimos a objeto JS
            const index = data.findIndex((prod) => prod.id === parseInt(id)); //.findIndex para buscar la posición del producto en el array.
            if (index !== -1) { //Si es diferente a -1 (lo encontró) sigue con el código
                data.splice(index, 1); //Método .splice(index(posición del producto) , 1(elimina ese producto))
                await fs.writeFile(this.path, JSON.stringify(data), "utf-8"); //Escribe el JSON nuevamente y lo pasa a JSON
                return "Producto eliminado con éxito!"
            } else { //Si no lo encontró (devuelve -1) y mensaje de error
                throw "ID " + id + " not found";
            }
        } catch (err) {
            return (err);
        }
    }

    updateProduct = async (id, {title, description, price, status, thumbnail, code, stock}) => {//Tomamos como argumentos el id del producto a actualizar y un objeto literal con los nuevos valores para los atributos del producto.
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8')) //Pasamos de JSON a objeto JS y leemos
        if(prods.some(prod => prod.id === parseInt(id))) { //.some() verificamos si existe un producto con el id especificado en el arreglo de productos.
            let index = prods.findIndex(prod => prod.id === parseInt(id)) //Buscamos la posición del producto en el array con .findIndex()
            prods[index].title = title 
            prods[index].description = description
            prods[index].price = price
            prods[index].status = status                    //Actualizamos los atributos existentes por los valores ingresados
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods)) //Escribimos el archivo JSON con las modificaciones y pasamos de objeto JS a JSON
            return "Producto actualizado"
        } else { //Si no lo encuentra, devuelve error
            return "Producto no encontrado"
        }
    }
}

const manager = new ProductManager(ruta)

const product1 = new Product("Pubg", "acción", 600, true, ["src/public/images/games/p2.jpg"], "PB2", 20);
const product2 = new Product("Counter Strike 2", "accion", 900, true, ["src/public/images/games/cs2.jpg"], "CS2", 180);
const product3 = new Product("Resident Evil 8", "terror", 1000, true, ["src/public/images/games/re8.jpg"], "RE8", 100);
const product4 = new Product("Destiny 3", "accion", 1400, true, ["src/public/images/games/destiny3.png"], "D3", 200);

const test = async ()=>{
    await fs.writeFile(ruta, "[]");
    await manager.addProduct(product1)
    await manager.addProduct(product2)
    await manager.addProduct(product3)
    await manager.addProduct(product4)

}


export default ProductManager 