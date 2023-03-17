describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to the app')
  })

  describe('Login', function() {
    // creates a new user
    beforeEach(function () {
      const user = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Incorrect username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)') // check if the notification shown with unsuccessful login is displayed red
    })

    describe('When logged in', function() {
      beforeEach(function() {
        // log in by-passing the UI
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'mluukkai', password: 'salainen'
        }).then(response => {
          localStorage.setItem('loggedBlogListAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('input[placeholder="title"').type('New Blog')
        cy.get('input[placeholder="author"').type('New Blog\'s author')
        cy.get('input[placeholder="url"').type('http://www.blogs.com/new_blog')
        cy.get('#create-blog-button').click()

        cy.get('#blog-list').contains('New Blog')
      })
    })
  })
})