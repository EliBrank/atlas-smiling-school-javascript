function getQuotes() {
  displayLoader();
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function(response) {
      const quotes = [];
      response.forEach(entry => {
        
      });
    }

  });
}

function buildCarouselItem(item) {
  const $slide = $('div').addClass('swiper-slide d-flex justify-content-center');
  const $card = $('div').addClass('card');
  const $thumbnail = $('img').attr({
    'src': item.pic_url,
    'alt': 'Video thumbnail'
  }).addClass('card-img-top');
  const $playButtonContainer = $('div').addClass('card-img-overlay text-center');
  const $playButton = $('img').attr({
    'src': 'images/play.png',
    'alt': 'Play',
    'width': '64px'
  }).addClass('align-self-center play-overlay');

  $playButtonContainer.append($playButton);

  // card body
  const $cardBody = $('div').addClass('card-body');
  const $cardTitle = $('h5').addClass('card-title font-weight-bold').text('Diagonal Smile');
  const $cardText = $('p').addClass('card-text text-muted')
    .text('Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod.');
  const $videoAuthorContainer = $('div').addClass('creator d-flex align-self-center');
  const $videoAuthorPhoto = $('img').attr({
    'src': item.thumb_url,
    'alt': 'Creator of Video',
    'width': '30px',
  }).addClass('rounded-circle');
  const $videoAuthorName = $('h6').addClass('pl-3 m-0 main-color').text('Phillip Massey');
  
  $videoAuthorContainer.append($videoAuthorPhoto, $videoAuthorName);
  
  const $videoInfo = $('div').addClass('info pt-3 d-flex justify-content-between');
  const $videoRating = $('div').addClass('rating');

  // add stars to rating
  for (const i = 0; i < 5; i++) {
    const $starOn = ('img').attr({
      'src': 'images/star_on.png',
      'alt': 'star on',
      'width': '15px'
    });
    const $starOff = ('img').attr({
      'src': 'images/star_off.png',
      'alt': 'star off',
      'width': '15px'
    });
    if (i < item.star) {
      $videoRating.append($starOn);
    } else {
      $videoRating.append($starOff);
    }
  }

  const $videoLength = $('span').addClass('main-color').text(item.duration);

  // put elements together
  $videoInfo.append($videoRating, $videoLength);
  $cardBody.append($cardTitle, $cardText, $videoAuthorContainer, $videoInfo);
  $card.append($thumbnail, $playButtonContainer, $cardBody);
  $slide.append($card);
}

function buildMultiItemCarousel() {
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
  buildMultiItemCarousel();
});
