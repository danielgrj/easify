const locationsApi = new apiHandler(
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/locations'
    : `${window.location.protocol}//${window.location.hostname}/locations`
)

const locationBtn = document.querySelector('#location-btn')
const locationBtnCancel = document.querySelector('#location-cancel')
const locationContainer = document.querySelector('#location-container')
const locationSubmit = document.querySelector('#location-submit')
const locationsSelect = document.querySelector('#locations-select')
const selectContainer = document.querySelector('#select-container')

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
