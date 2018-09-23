const data = require('./data.json')

/**
 * Mock GET method. Returns data based on numeric key.
 * @param {number} id   ID corresponding to key in the `data` object defined above. For mocking purposes, should be 1, 2, or 3.
 */
const get = id => new Promise((resolve, reject) => {
  const result = data[id]
  if(result) {
    setTimeout(() => resolve(result), 250)
  } else {
    setTimeout(reject, 250)
  }
})

/**
 * UPDATED to display UI states when completing an update request, and when the update is complete
 
 * @param {any} data 
 */
const post = data => new Promise((resolve, reject) => {
  if(Math.random() < .2) {
    console.log('Whoops – API error.')
    return ('Whoops – API error.')
    setTimeout(() => reject(data), 250)
  } else {
    console.log('Successful request!')
    return ('Successful request!')
    setTimeout(() => resolve(data), 250)
  }
})

export default ({
  get,
  post,
})
