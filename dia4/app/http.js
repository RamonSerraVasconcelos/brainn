const request = (url, options) =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

const createOptions = (method, data) => ({
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const get = (url) => request(url)
export const post = (url, data) => request(url, createOptions('POST', data))
export const del = () => (url, data) => request(url, createOptions('DELETE', data))
