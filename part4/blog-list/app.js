const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoUrl = 'mongodb+srv://tta:kM4650iZ020A0Dqn@fullstackopen.qou3pzj.mongodb.net/blogList?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
