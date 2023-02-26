const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const bigList = [...blogs]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when a bigger list is passed it equals to the combined amount of likes', () => { 
    expect(listHelper.totalLikes(bigList)).toBe(36)
  })

  test('when an empty list result is 0', () => { 
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when only one blog is passed, equals the likes of that', () => {
    expect(listHelper.favoriteBlog([blogs[0]]))
      .toEqual({
        title: "React patterns",
        author: "Michael Chan",
        likes: 7
      })
  })

  test('when a bigger list is passed it equals to the object with maximum amount of likes', () => {
    expect(listHelper.favoriteBlog(blogs))
      .toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
  })

  test('when an empty list is passed', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
})

describe('mostBlogs', () => {
  test('when a list is passed it returns the author who has the largest amount of blogs', () => {
    expect(listHelper.mostBlogs(blogs))
      .toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
  })

  test('when only one example is passed it returns the author and 1 as the number of blogs', () => {
    expect(listHelper.mostBlogs([blogs[0]]))
      .toEqual({
        author: "Michael Chan",
        blogs: 1
      })
  })

  test('when an empty list is passed it retuns undefined', () => {
    expect(listHelper.mostBlogs([]))
      .toBe(undefined)
  })
})

describe('mostLikes', () => {
  test('when receiving an array of blogs it returns the author whose blog posts have the largest amount of likes', () => {
    expect(listHelper.mostLikes(blogs))
      .toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
  })

  test('when receiving one blog it returns the author and its amount of likes', () => {
    expect(listHelper.mostLikes([blogs[0]]))
      .toEqual({
        author: "Michael Chan",
        likes: 7
      })
  })

  test('when receiving an empty list it returns undefined', () => {
    expect(listHelper.mostLikes([]))
      .toBe(undefined)
  })
})
