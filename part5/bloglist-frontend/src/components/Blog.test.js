import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const user = {
    username: 'tales'
  }

  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
    user
  }

  const mockLike = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} like={mockLike}/>).container
  })

  test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    // check title and author
    const title = screen.getByText(/canonical string reduction/i)
    expect(title).toBeDefined()
    const author = screen.getByText(/edsger w. dijkstra/i)
    expect(author).toBeDefined()
    // check likes and url
    const div = container.querySelector('.toggableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('URL and number of likes are shown when the button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.toggableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
