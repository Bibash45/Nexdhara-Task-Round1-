import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

import morgan from "morgan"
import cookieParser from "cookie-parser"


const port = process.env.PORT

const app = express()
connectDB()

app.use(morgan("dev"))

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  };
  app.use(cors(corsOptions));

// cookie parser middleware
app.use(cookieParser())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// morgan
app.use(morgan("dev"))

import userRoute from "./routes/userRoutes.js"
import productRoute from "./routes/productRoutes.js"
import connectDB from "./config/db.js"

// routes 
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)
app.use("/", (req, res) => {
    res.send("server is running on")
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})