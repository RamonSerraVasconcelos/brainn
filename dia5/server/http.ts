const request = (url: string, options: RequestInit) =>
  fetch(url, options)
    .then(r => r.json())
    .catch(e => ({ error: true, message: e.message }))

type Methods = 'POST' | 'DELETE'

type DataPost = {
  imagem: string
  placa: string
  marca: string
  ano: string
  cor: string
}

type DataDelete = {
  placa: string
}

type Data = DataPost | DataDelete
const createRequest = (method: Methods) => (url: string, data: Data) => request(url, {
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const get = request
export const post = createRequest('POST')
export const del = createRequest('DELETE')
