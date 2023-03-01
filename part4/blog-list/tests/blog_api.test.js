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

test('if the id exists, the correct blog post is deleted and the backend responds with 204', async () => {
  let blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogs.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('if the id doesn\'t exist, no blog post is deleted, but the back still responds with 204', async () => {
  const blogs = await helper.blogsInDb()
  const validId = '63fb75ed0da424c326c18b37'

  await api
    .delete(`/api/blogs/${validId}`)
    .expect(204)

  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('if the id exists, the correct blog post is updated and the backend responds with status code 200', async () => {
  let blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[1]
  const newLikes = 12

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: newLikes })
    .expect(200)

    const blog = await helper.findBlogInDb(blogToUpdate.id)

    expect(blog).not.toEqual(null)
    expect(blog.likes).toEqual(newLikes)
})

test('if the id does not exist, no post is updated and the backend responds with status code 404', async () => {
  const validId = '63fb75ed0da424c326c18b37'
  const newLikes = 12

  await api
    .put(`/api/blogs/${validId}`)
    .send({ likes: newLikes })
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close()
})
