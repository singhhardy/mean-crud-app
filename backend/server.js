const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000
const cors = require('cors')
const connectDB = require('./Config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const path = require('path')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', require('./Routes/userRoutes'))

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.status(200).json({message: 'Welcome to My Website'})
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
