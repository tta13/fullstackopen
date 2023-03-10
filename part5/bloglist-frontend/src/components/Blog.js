import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddinBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const buttonLabel = detailsVisible ? 'hide' : 'show'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => like(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button
          style={{ display: user.username === blog.user.username ? '' : 'none' }}
          onClick={() => remove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
