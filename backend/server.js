import express, { response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'
// import heroRouter from './routes/heroRoute.js'; 

// app config

const app = express()
const port = process.env.PORT || 4000

const startServer = async () => {
  await connectDB()
  connectCloudinary()

  // middlewares
  app.use(express.json())
  app.use(cors())

  // api endpoints
  app.use('/api/user', userRouter )
  app.use('/api/product', productRouter)
  app.use('/api/order', orderRouter)
  // app.use('/api', heroRouter); // Mount the hero router at '/api'

  app.get('/', (req, res) => {
    res.send('api working')
  })

  app.listen(port, () => console.log('server started on:' + port));
}

startServer()


