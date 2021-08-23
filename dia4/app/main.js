import './style.css'
import { get, post, del } from './http.js'

const url = 'http://localhost:3333/cars'
const form = document.querySelector('[data-js="formcars"]')
const table = document.querySelector('[data-js="table"]')

const getFormElement = (event) => (elementName) => {
  console.log(event.target.elements[elementName])
  return event.target.elements[elementName]
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
}

function createImage({ src, alt }) {
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = src
  img.alt = alt
  img.width = 100
  td.appendChild(img)
  return td
}

function createText(value) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor(value) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = value
  td.appendChild(div)
  return td
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const getElement = getFormElement(e)

  const data = {
    imagem: getElement('imagem').value,
    marca: getElement('marca').value,
    ano: getElement('ano').value,
    placa: getElement('placa').value,
    cor: getElement('cor').value
  }

  const result = await post(url, data)

  if (result.error) {
    console.log('Erro no cadastro', result.message)
    return
  }

  const noContent = document.querySelector('[data-js="no-content"]')
  table.removeChild(noContent)

  createTableRow(data)

  e.target.reset()
  imagem.focus()
})


async function handleDelete(e) {
  const button = e.target
  const placa = e.target.dataset.placa

  const result = await del(url, {placa})

  if(result.error){
    console.log('Erro ao deletar', result.message)
    return
  }

  const tr = document.querySelector(`tr[data-placa="${placa}"]`)
  table.removeChild(tr)
  button.removeEventListener('click', handleDelete)
}

function createTableRow(data) {

  const carros = [
    { type: 'image', value: { src: data.imagem, alt: data.marca } },
    { type: 'text', value: data.marca },
    { type: 'text', value: data.ano },
    { type: 'text', value: data.palca },
    { type: 'color', value: data.cor }
  ]

  const tr = document.createElement('tr')
  tr.dataset.placa = data.placa
  carros.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.dataset.placa = data.placa

  button.addEventListener('click', handleDelete)

  table.appendChild(tr)
}

function createNoCarRow() {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thslength = document.querySelectorAll('table th').length
  td.setAttribute('colspan', thslength)
  td.textContent = 'Nenhum carro encontrado'

  tr.dataset.js = 'no-content'
  tr.appendChild(td)
  table.appendChild(tr)
}

async function main() {

  if(table.rows.lenght === 0){
    createNoCarRow()
  }

  const result = await get(url)

  if (result.error) {
    console.log('erro: ', result.message)
    return
  }

  if (result.lenght === 0) {
    createNoCarRow()
  }

  result.forEach(createTableRow)
}

main()
