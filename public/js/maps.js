const mapButton = document.querySelector('#view-map')
const closeMapButton = document.querySelector('#close-map-card')
const mapCard = document.querySelector('#map-card')
const backButtonMap = document.querySelector('#back-map-button')

mapboxgl.accessToken = 'pk.eyJ1IjoiYXRsMTUxIiwiYSI6ImNqeGRqbTlnMDBlcXIzeW8wYnk3Nnp6NTEifQ.074IOX-MXu4hf1p5A-aJZQ'
const mapEmp = new mapboxgl.Map({
  container: 'map-emp',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: place,
  zoom: 13
})

mapEmp.addControl(new mapboxgl.NavigationControl())

const popup = new mapboxgl.Popup().setText(name)
const marker = new mapboxgl.Marker()
  .setLngLat(place)
  .setPopup(popup)
  .addTo(mapEmp)

const hideMapCar = () => {
  mapCard.classList.remove('is-active')
}

mapButton.onclick = () => {
  mapCard.classList.add('is-active')
}

closeMapButton.onclick = hideMapCar
backButtonMap.onclick = hideMapCar
