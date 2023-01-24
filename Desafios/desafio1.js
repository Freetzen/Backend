class ProductManager{
    constructor(){
        this.products = []
    };

    addProduct(newProduct){
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)){
            console.log("Complete all the fields correctly")
        } else{
            const codeRepeated = this.products.find((codeProduct) => codeProduct.code === newProduct.code);
            if(codeRepeated){
                console.log("this Code: " + newProduct.code + " already exists")
            } else{
                this.products.push({...newProduct, id: this.products.length + 1})
                console.log("Product added correclty!!")
            }
        }
    }

    getProducts(){
        console.log("Produts: ")
        console.log(this.products)
        return this.products
    }

    getProductById(id){
        let foundId = this.products.find((prodId) => prodId.id === id);
        if(foundId){
            console.log("this id: " + id + "is found")
        } else{
            console.log("Not found.")
        }
    };

};



class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    };

};


//Test

const manager = new ProductManager();

manager.getProducts();

const product1 = new Product("iPhone 12 Pro Max", "256GB", 900, "img: not found", "iph789", 180);
manager.addProduct(product1);

const product2 = new Product("iPhone 13 Pro Max", "128GB", 1000, "img: not found", "iph435", 100);
manager.addProduct(product2);

const product3 = new Product("iPhone 14 Pro Max", "512GB", 1400, "img: not found", "iph567", 200);
manager.addProduct(product3);

manager.getProductById(1);
manager.getProductById(2);
manager.getProductById(3);

manager.getProducts();