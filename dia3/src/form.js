const nome = document.querySelector('[data-js="nome"]')
const block = ['da', 'das', 'de', 'do', 'dos']

nome.addEventListener('input', (e) =>{
  const array = e.target.value.split(' ')
  console.log('Array:', array)
  e.target.value = array.map((word) => {

    return block.includes(word.toLowerCase())
    ? word.toLowerCase()
    : fixCase(word)
  }).join(' ')
})

function fixCase (word){
  if(word.length === 0){
    return ''
  }

  return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
}

// EXERCICIO 02

var select = '<select multiple data-js="colors">'
select = select.concat(' <option value="red">Red</option>', ' <option value="blue">blue</option>', ' <option value="yellow">yellow</option>', ' <option value="green">green</option>', ' <option value="black">black</option></select>')

document.querySelector('[data-js="exercicio02"]').innerHTML = select

const selects = document.querySelector('[data-js="colors"]')
const container = document.createElement('div')
selects.addEventListener('change', (e) =>{
  const div = document.createElement('div')

  div.style.width = '50px'
  div.style.height = '50px'
  div.style.backgroundColor = selects.value
  container.appendChild(div)
})

document.body.appendChild(container)
