const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('correct amount of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('making an HTTP POST request to the /api/blogs route successfully creates a new blog post', async () => {
  const newBlogPost = {
    title:"Out of Context Football",
    author:"Mark Carry",
    url:"https://twitter.com/nocontextfooty",
    likes:1825
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('Out of Context Football')
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlogPost = {
    title:"Out of Context Football",
    author:"Mark Carry",
    url:"https://twitter.com/nocontextfooty",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toEqual(0)
})

test('if the title or url properties are missing, the backend responds with status code 400', async () => {
  const newBlogPost = {
    author: "Mark Carry"
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
