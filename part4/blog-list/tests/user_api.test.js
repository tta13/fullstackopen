const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  
  const userObjects = helper.initialUsers.map(u => new User(u))
  const promiseArray = userObjects.map(u => u.save())
  await Promise.all(promiseArray)
})

test('user without username and password are not created and the backend returns status code 400', async () => {
  const newUser = {
    name: 'Tales Alves'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersInDb = await helper.usersInDb()

  expect(usersInDb.length).toEqual(helper.initialUsers.length)
})

test('user without password are not created and the backend returns status code 400', async () => {
  const newUser = {
    name: 'Tales Alves',
    username: 'tta13',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  
  expect(response.body.error).toBeDefined()
  expect(response.body.error).toEqual('please, provide a valid password')

  const usersInDb = await helper.usersInDb()

  expect(usersInDb.length).toEqual(helper.initialUsers.length)
})

test('user with username with fewer than 3 characters are not created and the backend returns status code 400', async () => {
  const newUser = {
    name: 'Tales Alves',
    username: 'tt',
    password: '123456'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  
  expect(response.body.error).toBeDefined()
  expect(response.body.error).toEqual('User validation failed: username: Path `username` (`tt`) is shorter than the minimum allowed length (3).')

  const usersInDb = await helper.usersInDb()

  expect(usersInDb.length).toEqual(helper.initialUsers.length)
})

test('user with password with fewer than 3 characters are not created and the backend returns status code 400', async () => {
  const newUser = {
    name: 'Tales Alves',
    username: 'tta13',
    password: '12'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  
  expect(response.body.error).toBeDefined()
  expect(response.body.error).toEqual('please, provide a valid password')

  const usersInDb = await helper.usersInDb()

  expect(usersInDb.length).toEqual(helper.initialUsers.length)
})
