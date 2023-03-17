import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await userEvent.type(title, 'New Blog')
  await userEvent.type(author, 'New Blog\'s author')
  await userEvent.type(url, 'http://www.blogs.com/new_blog')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog',
    author: 'New Blog\'s author',
    url: 'http://www.blogs.com/new_blog'
  })
})