import './style.css'

document.querySelector('[data-js="app"]').innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

const link = document.querySelector('[data-js="link"]')

link.addEventListener('click', (e) => {
 const app = document.querySelector('[data-js="app"]')
 app.classList.toggle('aula01')
});
