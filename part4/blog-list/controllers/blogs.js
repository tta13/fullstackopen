const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if(!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  if(!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const blog = await Blog.findById(request.params.id)
  
  if (blog && !(blog.user.toString() === user.id.toString())) {
    return response.status(403).send({ error: 'blogs can only be deleted by the user who created it' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  if(updatedBlog === null) {
    return response.status(404).send({ error: 'blog post not found' })
  }
  response.json(updatedBlog)
})

module.exports = blogsRouter
