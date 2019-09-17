const button = document.querySelector('#add')

console.log('work')

button.onclick = async () => {
  const address = document.querySelector('#address')
  const lat = document.querySelector('#lat')
  const lng = document.querySelector('#lng')

  console.log('axios al pedo')

  const location = await locationsApi.createOne({
    address: address.value,
    coordinates: {
      lat,
      lng
    }
  })

  console.log(location)
}
