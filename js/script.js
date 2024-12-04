function buildMultiCarouselItem(item) {
  const $slide = $('<div>').addClass('swiper-slide d-flex justify-content-center');
  $slide.html(`
    <div class="card">
      <img src=${item.thumb_url} class="card-img-top" alt="Video thumbnail" />
      <div class="card-img-overlay text-center">
        <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold">${item.title}</h5>
        <p class="card-text text-muted">${item['sub-title']}</p>
        <div class="creator d-flex align-items-center">
          <img src=${item.author_pic_url} alt="Creator of Video" width="30px" class="rounded-circle" />
          <h6 class="pl-3 m-0 main-color">${item.author}</h6>
        </div>
        <div class="info pt-3 d-flex justify-content-between">
          <div class="rating">
          </div>
          <span class="main-color">${item.duration}</span>
        </div>
      </div>
    </div>
  `);

  let $videoRating = $slide.find('.rating')

  // create stars
  // initialize empty object of length 5, loop through values
  const stars = Array.from({ length: 5 }, (_, i) => {
    return $('<img>').attr({
      'src': i < item.star ? 'images/star_on.png' : 'images/star_off.png',
      'alt': i < item.star ? 'star on' : 'star off',
      'width': '15px'
    });
  });

  $videoRating.append(stars);

  return ($slide);
}


function buildMultiItemCarousel(section) {

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/' + section,
    method: 'GET',
    // api returns array of objects, iterate through
    success: function(response) {
      const carouselContainer = $(`#carousel-${section} .swiper-wrapper`);
      response.forEach(item => {
        carouselContainer.append(buildMultiCarouselItem(item));
      });
    }
  });

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 4
      }
    }
  });
}

$(document).ready(function() {
  buildMultiItemCarousel('latest-videos');
});
