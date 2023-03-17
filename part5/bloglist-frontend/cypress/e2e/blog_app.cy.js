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
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('a blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('input[placeholder="title"').type('New Blog')
        cy.get('input[placeholder="author"').type('New Blog\'s author')
        cy.get('input[placeholder="url"').type('http://www.blogs.com/new_blog')
        cy.get('#create-blog-button').click()

        cy.get('#blog-list').contains('New Blog')
      })

      describe('When there are blogs in the page', function () {
        beforeEach(function () {
          const blogs = [
            {
              title: 'React patterns',
              author: 'Michael Chan',
              url: 'https://reactpatterns.com/',
              likes: 7
            },
            {
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
              likes: 5
            },
            {
              title: 'Canonical string reduction',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
              likes: 12
            }
          ]
          // create multiple blogs
          blogs.forEach(blog => cy.createBlog(blog))
        })

        it('users can like a blog', function () {
          cy.contains('Canonical string reduction')
            .contains('show')
            .click()
            .parent()
            .parent()
            .contains('like').click()

          cy.contains('Canonical string reduction').parent().contains('likes 13')
        })

        it('the user who created a blog can delete it', function () {
          cy.contains('Canonical string reduction')
            .contains('show')
            .click()
            .parent()
            .parent()
            .contains('remove')
            .click()

          cy.on('window:confirm', (str) => {
            expect(str).to.eq('Remove blog Canonical string reduction by Edsger W. Dijkstra?')
          })
          cy.get('.success')
            .should('contain', 'Blog "Canonical string reduction" deleted')
        })
      })
    })
  })
})