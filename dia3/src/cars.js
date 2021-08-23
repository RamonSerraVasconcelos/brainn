const form = document.querySelector('[data-js="formcars"]')
const table = document.querySelector('[data-js="table"]')

const getFormElement = (event) => (elementName) =>{
  console.log(event.target.elements[elementName])
  return event.target.elements[elementName]
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor,
}

function createImage (value){
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = value
  img.width = 100
  td.appendChild(img)
  return td
}

function createText (value){
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor (value){
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = value
  td.appendChild(div)
  return td
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const getElement = getFormElement(e)

  const carros = [
    { type: 'image', value: getElement('imagem').value},
    { type: 'text', value: getElement('marca').value},
    { type: 'text', value: getElement('ano').value},
    { type: 'text', value: getElement('placa').value},
    { type: 'color', value: getElement('cor').value}
  ]


  const tr = document.createElement('tr')
  carros.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })
  table.appendChild(tr)
  e.target.reset()
  imagem.focus()
})
