function buildVideoElement(item, wrapperClasses = "") {
  const $videoElement = $('<div>').addClass(wrapperClasses);
  $videoElement.html(`
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

  let $videoRating = $videoElement.find('.rating')

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

  return ($videoElement);
}

function buildQuote(item, wrapperClasses = "") {
  const $quoteElement = $('<div>').addClass(wrapperClasses);
  $quoteElement.html(`
    <div class="row mx-auto align-items-center">
      <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
        <img src=${item.pic_url} class="quote-photo d-block align-self-center rounded-circle mx-auto" alt="Carousel Pic 1"/>
      </div>
      <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
        <div class="quote-text">
          <p class="text-white">
            « ${item.text}
          </p>
          <h4 class="text-white font-weight-bold">${item.name}</h4>
          <span class="text-white">${item.title}</span>
        </div>
      </div>
    </div>
  `);

  return ($quoteElement);
}

function buildSingleItemCarousel(section) {
  const $loader = $(`#${section}-loader`).addClass('loader');

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/' + section,
    method: 'GET',
    // api returns array of objects, iterate through
    success: function(response) {
      const $carouselContainer = $(`#carousel-${section} .swiper-wrapper`);
      response.forEach(item => {
        const swiperItemClasses = 'swiper-slide d-flex justify-content-center carousel-inner';
        $carouselContainer.append(buildQuote(item, swiperItemClasses));
      });
    },
    error: function(xhr, status, error) {
      console.error('error loading carousel:', error);
    },
    complete: function() {
      $loader.removeClass('loader');
    }
  });

  new Swiper(`#carousel-${section}`, {
    loop: true,
    navigation: {
      nextEl: `#${section}-next.swiper-button-next`,
      prevEl: `#${section}-prev.swiper-button-prev`
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }
  });
}


function buildMultiItemCarousel(section) {
  const $loader = $(`#${section}-loader`).addClass('loader');

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/' + section,
    method: 'GET',
    // api returns array of objects, iterate through
    success: function(response) {
      const $carouselContainer = $(`#carousel-${section} .swiper-wrapper`);
      response.forEach(item => {
        const swiperItemClasses = 'swiper-slide d-flex justify-content-center';
        $carouselContainer.append(buildVideoElement(item, swiperItemClasses));
      });
    },
    error: function(xhr, status, error) {
      console.error('error loading carousel:', error);
    },
    complete: function() {
      $loader.removeClass('loader');
    }
  });

  new Swiper(`#carousel-${section}`, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: `#${section}-next.swiper-button-next`,
      prevEl: `#${section}-prev.swiper-button-prev`
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


function populateCourseVideos() {
  const $searchQuery = $('#search-query').val();
  const $topicFilter = $('#selected-topic-filter').text();
  const $sortCategory = $('#selected-sort-category').text().replace(' ', '_');

  if ($topicFilter === 'All') {
    $topicFilter.text('');
  }

  const $loader = $('#course-video-loader').addClass('loader');

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    method: 'GET',
    data: {
      q: $searchQuery,
      topic: $topicFilter,
      sort: $sortCategory
    },
    success: function(response) {
      const $courseVideoResults = $('#video-results');
      $courseVideoResults.empty();
      $('#num-videos').text(response.courses.length);
      response.courses.forEach(item => {
        const courseVideoClasses = 'col-12 col-sm-4 col-lg-3 d-flex justify-content-center';
        $courseVideoResults.append(buildVideoElement(item, courseVideoClasses));
      });
    },
    error: function(xhr, status, error) {
      console.error('error performing search:', error);
    },
    complete: function() {
      $loader.removeClass('loader');
    }
  })
}
