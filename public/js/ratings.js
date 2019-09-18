const starsRating = document.querySelector('#star-rating')
const stars = document.querySelectorAll('.cr-star')
const rateBtn = document.querySelector('#rate-btn')
const ratingContent = document.querySelector('#rating-content')
const avatar = document.querySelector('#avatar')
const commentContainer = document.querySelector('#comments-container')
let calification

const paintStars = isClick => e => {
  const numberStars = parseInt(e.target.getAttribute('numberStar'))
  calification = parseInt(e.target.getAttribute('numberStar'))

  if (isClick) {
    for (let i = 0; i < 5; i++) {
      stars[i].classList.add('far')
      stars[i].classList.remove('fas')
      stars[i].style.color = 'black'
    }
  }

  for (let i = 0; i < numberStars; i++) {
    if (isClick) stars[i].classList.add('fixed')
    stars[i].classList.remove('far')
    stars[i].classList.add('fas')
    stars[i].style.color = '#ffd300'
  }
}

starsRating.onclick = paintStars(true)

starsRating.onmouseover = paintStars()

starsRating.onmouseout = e => {
  for (let i = 0; i < 5; i++) {
    if (!stars[i].className.includes('fixed')) {
      stars[i].classList.add('far')
      stars[i].classList.remove('fas')
      stars[i].style.color = 'black'
    }
  }
}

rateBtn.onclick = async () => {
  const content = ratingContent.value
  let rating

  try {
    rating = await ratingApi.createOne({ content, calification })
  } catch (e) {
    console.log(e)
  }

  let stars = ''

  for (let i = 0; i < rating.calification; i++) {
    stars += `<span class="icon is-small">
                <i class="fas fa-star is-yellow"></i>
              </span>`
  }

  const html = `
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="${avatar.src}">
        </p>
      </figure>
      <div class="media-content">
        <div class="content" id="appoinment-content">
          <p>
            <strong>${name}</strong> <small>
              ${stars}
            </small>
            <br>
            ${content}
          </p>
        </div>
      </div>
    </article>
  `

  commentContainer.innerHTML += html
}
