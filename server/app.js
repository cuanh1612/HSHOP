const express = require('express')
const app = express()
const cookierPaser = require('cookie-parser')
const port = 3000
const database = require('./config/database')
const cors = require('cors')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')


//Handle Uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})

database()

app.use(cors({
  origin: 'http://localhost:4000',
  methods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  preflightContinue: false,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookierPaser())
app.use(fileUpload())

//Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

//Import erro handler
const {erroHandler} = require('./middlewares/erroHandler')

//Import all router
const products = require('./routers/product')
const auth = require('./routers/auth')
const order = require('./routers/order')
const payment = require('./routers/payment')

//Mount the route
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Unhandled Route
app.all('*', (req, res, next)=>{
  const err = new Error('The route can not be found')
  err.statusCode = 404
  next(err)
})

app.use(erroHandler)

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//Handle Unhandled Promise rekection
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`)
  console.log('Shutting down the server due to Unhandled Promise rejection')
  server.close(() => {
    process.exit(1)
  })
})