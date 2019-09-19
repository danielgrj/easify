const appoinmentsApi = new apiHandler(
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/appoiments'
    : `${window.location.protocol}//${window.location.hostname}/appoiments`
)

const showAppoinmentBtn = document.querySelector('#appoinment')
const bookBtn = document.querySelector('#book-button')
const cancelBookBtn = document.querySelector('#cancel-book-button')
const bookCard = document.querySelector('#book-card')
const closeBtn = document.querySelector('#close')
const dateInput = document.querySelector('#date')
const dateHelper = document.querySelector('#date-helper')

const errorMessage = `
<div class="notification is-danger">
  <button class="delete"></button>
  We are sorry but this day and hour is already booked, please select another date.
</div>
`

const closeAppoinment = () => {
  bookCard.classList.remove('is-active')
}

dateInput.onchange = () => {
  console.log(dateInput.value)
  if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(dateInput.value)) {
    dateInput.classList.remove('is-danger')
    dateInput.classList.add('is-success')
    dateHelper.classList.remove('is-danger')
    dateHelper.classList.add('is-success')
  }
}

showAppoinmentBtn.onclick = () => {
  bookCard.classList.add('is-active')
}

bookBtn.onclick = async () => {
  const date = dateInput.value
  const locationId = locationsSelect.options[locationsSelect.selectedIndex].value
  const employeeId = bookBtn.getAttribute('profileId')

  try {
    const appoinment = await appoinmentsApi.createOne({ date, locationId }, `user/${employeeId}`)
  } catch (err) {}

  bookCard.classList.remove('is-active')
}

cancelBookBtn.onclick = closeAppoinment
closeBtn.onclick = closeAppoinment
