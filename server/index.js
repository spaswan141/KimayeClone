require('dotenv').config()
const express=require('express')
const cors = require('cors')
const morgan = require('morgan')
const notFound= require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
app.use(cors())
app.use(morgan())
app.use(express.urlencoded({extended:true }))
app.use(express.json())
app.use(notFound())
app.use(errorHandler())
