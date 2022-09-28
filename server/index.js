require('dotenv').config()
const express=require('express')
const cors = require('cors')
const morgan = require('morgan')
const notFound= require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const connection = require('./db')
const ProductRouter=require('./routes/product.route')
const app = express()
connection()
app.use(cors())
app.use(morgan())
app.use(express.urlencoded({extended:true }))
app.use(express.json())

app.use('/',ProductRouter)
app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}` )
})
