import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_BROWSER_KEY = 'loggedBlogListAppUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    }
  }, [])


  const handleLogin = (event) => {
    event.preventDefault()

      loginService.login({ username, password })
        .then(user => {
          window.localStorage.setItem(
            LOGGED_USER_BROWSER_KEY, JSON.stringify(user)
          )    
          setUser(user)
          setUsername('')
          setPassword('')
        })
        .catch (exception => {
          console.log('Incorrect username or password')
        })
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(LOGGED_USER_BROWSER_KEY)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to the app</h2>
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
      <span>{user.name} logged in</span><button onClick={handleLogout}>logout</button>
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