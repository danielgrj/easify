const uploadCard = document.querySelector('#upload-card')
const uploadPicButton = document.querySelector('#upload-pic')
const cancelUpload = document.querySelector('#cancel-upload')
const closeButton = document.querySelector('#close-button')

const locationsCard = document.querySelector('#locations-card')
const showLocations = document.querySelector('#show-locations')
const editProfile = document.querySelector('#edit-profile')
const cancelEdit = document.querySelector('#edit-cancel')
const editCard = document.querySelector('#edit-card')
const closeEdit = document.querySelector('#close-edit')

const setDefaultLocation = document.querySelector('#set-default')
const cancelDefaultlocation = document.querySelector('#cancel-default')
const closeLocations = document.querySelector('#close-locations')
const defaultLocation = document.querySelector('#default-address')

const appoinmentCard = document.querySelector('#appoinment-card')
const editAppoinment = document.querySelector('#edit-appoinment-button')
const cancelEditAppoinment = document.querySelector('#cancel-edit-appoinment')
const closeEditAppoinment = document.querySelector('#close-edit-appoinment')

const reschuduleButton = document.querySelector('#res-button')
const acceptAppoinment = document.querySelector('#accept-app')
const cancelAppoinment = document.querySelector('#cancel-app')
const appoinmentId = document.querySelector('#appoinment-id')

const hideCard = () => {
  uploadCard.classList.remove('is-active')
}

const hideLocationsCard = () => {
  locationsCard.classList.remove('is-active')
}

const hideEditCard = () => {
  editCard.classList.remove('is-active')
}

const hideAppoinmentCard = () => {
  appoinmentCard.classList.remove('is-active')
}

showLocations.onclick = () => {
  locationsCard.classList.add('is-active')
}

cancelDefaultlocation.onclick = hideLocationsCard
closeLocations.onclick = hideLocationsCard

setDefaultLocation.onclick = async () => {
  const locationId = locationsSelect.options[locationsSelect.selectedIndex].value
  const { data: location } = await locationsApi.setDefault(locationId, 'default')

  defaultLocation.innerHTML = location.address

  hideLocationsCard()
}

uploadPicButton.onclick = e => {
  e.preventDefault()
  uploadCard.classList.add('is-active')
}

cancelUpload.onclick = hideCard
closeButton.onclick = hideCard

editProfile.onclick = () => {
  editCard.classList.add('is-active')
}
cancelEdit.onclick = hideEditCard
closeEdit.onclick = hideEditCard

editAppoinment.onclick = () => {
  appoinmentCard.classList.add('is-active')
}
cancelEditAppoinment.onclick = hideAppoinmentCard
closeEditAppoinment.onclick = hideAppoinmentCard


const appoinmentsApi = new apiHandler(
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000/appoiments'
    : `${window.location.protocol}//${window.location.hostname}/appoiments`
)
const dateInput = document.querySelector('#date')
const dateHelper = document.querySelector('#date-helper')

dateInput.onchange = () => {
  console.log(dateInput.value)
  if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(dateInput.value)) {
    dateInput.classList.remove('is-danger')
    dateInput.classList.add('is-success')
    dateHelper.classList.remove('is-danger')
    dateHelper.classList.add('is-success')
  }
}

reschuduleButton.onclick = () => {
  appoinmentCard.classList.add('is-active')
  appoinmentId.value = reschuduleButton.getAttribute('_id')
}
