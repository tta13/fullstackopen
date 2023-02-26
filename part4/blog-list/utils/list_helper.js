var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(b => b.likes))

  const result = blogs.find((b) => b.likes === maxLikes)
  
  if (!result) return {}

  delete result.__v
  delete result._id
  delete result.url
  return result
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, (b) => b.author)
  const authorFrequencies = Object.keys(authorCounts).map(key => { 
    return { author: key, blogs: authorCounts[key] }
  })
  return _.maxBy(authorFrequencies, 'blogs')
}

const mostLikes = (blogs) => {
  const authorBlogs = _.groupBy(blogs, 'author')
  const authorLikes = Object.keys(authorBlogs).map(key => {
    return { 
      author: key, 
      likes: _.sumBy(authorBlogs[key], 'likes')
    }
  })
  return _.maxBy(authorLikes, 'likes')
}

module.exports = { 
  dummy, 
  totalLikes, 
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
