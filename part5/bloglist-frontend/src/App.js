import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_BROWSER_KEY = 'loggedBlogListAppUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_BROWSER_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = ({ title, author, url }) => {
    // grabs ref to the togglable and access the function to toggle its state
    blogFormRef.current.toggleVisibility()
    blogService
      .create({ title, author, url})
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setMessage({ text: `New blog "${newBlog.title}" added`, type: 'success' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLogin = (event) => {
    event.preventDefault()

      loginService
        .login({ username, password })
        .then(user => {
          window.localStorage.setItem(
            LOGGED_USER_BROWSER_KEY, JSON.stringify(user)
          )    
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        })
        .catch (exception => {
          setMessage({ text: 'Incorrect username or password', type: 'error' })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(LOGGED_USER_BROWSER_KEY)
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to the app</h2>      
      <Notification message={message}/>
      <Login handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} />
    </div>
  )
  
  const blogList = () => (
    <div>
      <h2>blogs</h2>      
      <Notification message={message}/>
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="new blog" visible={false} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
    {user === null ?
      loginForm() :
      blogList()
    }      
    </div>
  )
}

export default App