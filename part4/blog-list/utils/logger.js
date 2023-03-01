require('dotenv').config()

const info = (...params) => {
  if(process.env.NODE_ENV === 'test') return

  console.log('[INFO]', ...params)
}

const error = (...params) => {
  if(process.env.NODE_ENV === 'test') return
  
  console.error('[ERROR]', ...params)
}

module.exports = {
  info, error
}