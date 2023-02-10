import express from 'express'
import routerProduct from './routes/products.routes.js';
import cartProducts from './routes/carts.routes.js';
import { __dirname } from './path.js';
import multer from 'multer'


//MULTER
//const upload = multer({dest:'src/public/images/imgUsers'}) //Destino para alojar imágenes cargadas por el usuario. (FORMA BÁSICA)
const storage = multer.diskStorage({ //multer.diskStorage, es un método para definir como guardar las imágenes
    destination: (req,file,cb)=>{ //Primer atributo es destination.
        cb(null,'src/public/images/imgUsers') //cb es una función para manejar la información de multer (callback)
    },
    filename: (req,file,cb)=>{ //filename es el atributo para decirle como guardamos la imagen, en este caso, con el nombre original
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage}) //Constante  upload y enviamos por parametro la constante storage
const app = express()
const PORT = 8080

//Middleware
app.use(express.json()); //Permite trabajar con JSON
app.use(express.urlencoded({extended:true})); //Permite trabajar con url extendidos

app.use('/static', express.static(__dirname + '/public')) //Definir carpeta publica.
app.use('/api/products', routerProduct) //Crear ruta para productos, llamando a routerProduct
app.use('/api/cart', cartProducts)

app.post('/upload',upload.single('product'),(req,res)=>{ //Ruta para cargar un solo archivo con .single
    console.log(req.body)
    console.log(req.file) //Ver contenido (información) de la imágen
    res.send('imagen cargada')
})

app.listen(PORT, () => { 
    console.log(`Server on port ${PORT}`)
})