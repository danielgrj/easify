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

const ctx = document.getElementById('last-month-activity')
var chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
})
