// Emp private perfil
const infoButton = document.querySelector('#info-button')
const appoimentsButton = document.querySelector('#appoiments-button')
const chartButton = document.querySelector('#chart-button')

const empInfo = document.querySelector('#emp-info')
const empAppoiments = document.querySelector('#emp-appoiments')
const empChart = document.querySelector('#emp-chart')

infoButton.onclick = () => {
  infoButton.classList.add('is-active')
  appoimentsButton.classList.remove('is-active')
  chartButton.classList.remove('is-active')

  empInfo.style.display = ''
  empAppoiments.style.display = 'none'
  empChart.style.display = 'none'
}

appoimentsButton.onclick = () => {
  infoButton.classList.remove('is-active')
  appoimentsButton.classList.add('is-active')
  chartButton.classList.remove('is-active')

  empInfo.style.display = 'none'
  empAppoiments.style.display = ''
  empChart.style.display = 'none'
}

chartButton.onclick = () => {
  infoButton.classList.remove('is-active')
  appoimentsButton.classList.remove('is-active')
  chartButton.classList.add('is-active')

  empInfo.style.display = 'none'
  empAppoiments.style.display = 'none'
  empChart.style.display = ''
}
