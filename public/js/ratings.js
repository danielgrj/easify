const starsRating = document.querySelector('#star-rating')
const stars = document.querySelectorAll('.cr-star')
const rateBtn = document.querySelector('#rate-btn')
const ratingContent = document.querySelector('#rating-content')
const avatar = document.querySelector('#avatar')
const commentContainer = document.querySelector('#comments-container')
let calification

const paintStars = isClick => e => {
  const numberStars = parseInt(e.target.getAttribute('numberStar'))

  console.log(e.target)

  if (isClick && !Number.isNaN(numberStars)) calification = numberStars

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

  for (let i = 0; i < calification; i++) {
    stars += `<span class="icon is-small">
                <i class="fas fa-star is-yellow"></i>
              </span>`
  }

  console.log(stars)

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
              <br>
              ${stars}
            </small>
            <br>
            ${content}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item is-black">
              <span class="icon is-small"><i class="fas fa-thumbs-up"></i></span>
            </a>
            <a class="level-item is-black">
              <span class="icon is-small"><i class="fas fa-thumbs-down"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  `

  commentContainer.innerHTML += html
}
