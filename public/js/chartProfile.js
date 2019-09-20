const ctx = document.getElementById('last-month-activity')
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: uniqueDays,
    datasets: [
      {
        label: 'Appoinments per day',
        data: appoinmentsPerDay,
        backgroundColor: 'rgba(2, 200, 167, .5)',
        borderWidth: 1
      }
    ]
  },
  options: {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    responsive: true
  }
})
