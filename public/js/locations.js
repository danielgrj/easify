const appoinmentsApi = new apiHandler('http://localhost:3000/appoiments')
const locationsApi = new apiHandler('http://localhost:3000/locations')

const showAppoinmentBtn = document.querySelector('#appoinment')
const bookBtn = document.querySelector('#book-button')
const cancelBookBtn = document.querySelector('#cancel-book-button')
const bookCard = document.querySelector('#book-card')
const locationBtn = document.querySelector('#location-btn')
const locationBtnCancel = document.querySelector('#location-cancel')
const locationContainer = document.querySelector('#location-container')
const locationSubmit = document.querySelector('#location-submit')
const locationsSelect = document.querySelector('#locations-select')
const selectContainer = document.querySelector('#select-container')
const dateInput = document.querySelector('#date')

showAppoinmentBtn.onclick = () => {
  bookCard.classList.add('is-active')
}

bookBtn.onclick = async () => {
  const date = dateInput.value
  const locationId = locationsSelect.options[locationsSelect.selectedIndex].value
  const employeeId = bookBtn.getAttribute('profileId')

  const appoinment = await appoinmentsApi.createOne({ date, locationId }, `user/${employeeId}`)
  bookCard.classList.remove('is-active')

  console.log(appoinment)
}

cancelBookBtn.onclick = () => {
  bookCard.classList.remove('is-active')
}

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

  console.log(location)

  locationsSelect.innerHTML += `<option value="${location._id}"  selected>${location.address}</option>`
  locationBtn.style.display = ''
  locationContainer.style.display = 'none'
  selectContainer.style.display = ''
}
