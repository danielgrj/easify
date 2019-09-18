const appoinmentsApi = new apiHandler(
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/appoiments'
    : `${window.location.protocol}//${window.location.hostname}/appoiments`
)
const locationsApi = new apiHandler(
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/locations'
    : `${window.location.protocol}//${window.location.hostname}/locations`
)

const showAppoinmentBtn = document.querySelector('#appoinment')
const bookBtn = document.querySelector('#book-button')
const cancelBookBtn = document.querySelector('#cancel-book-button')
const bookCard = document.querySelector('#book-card')
const closeBtn = document.querySelector('#close')
const locationBtn = document.querySelector('#location-btn')
const locationBtnCancel = document.querySelector('#location-cancel')
const locationContainer = document.querySelector('#location-container')
const locationSubmit = document.querySelector('#location-submit')
const locationsSelect = document.querySelector('#locations-select')
const selectContainer = document.querySelector('#select-container')
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

locationBtn.onclick = () => {
  locationBtn.style.display = 'none'
  locationContainer.style.display = ''
}

locationBtnCancel.onclick = () => {
  locationBtn.style.display = ''
  locationContainer.style.display = 'none'
}

locationSubmit.onclick = async () => {
  const address = addressInput.value
  const lng = lngInput.value
  const lat = latInput.value

  if (!address || !lng || !lat) return console.log('error')

  const { data: location } = await locationsApi.createOne({
    address,
    lat,
    lng
  })

  locationsSelect.innerHTML += `<option value="${location._id}"  selected>${location.address}</option>`
  locationBtn.style.display = ''
  locationContainer.style.display = 'none'
  selectContainer.style.display = ''
}
