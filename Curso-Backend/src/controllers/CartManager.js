import {promises as fs} from "fs";
const ruta = "./cart.json";


class CartManager{
    constructor(path) { 
        this.path = path; 
    }

    getCart = async () => {
        const read = await fs.readFile(this.path, 'utf-8')
        const data = JSON.parse(read)
        if (data.length != 0) {
            return (data)
        } else {
            return ("No se encuentran productos en el listado.")
        }
    }
}

export default CartManager