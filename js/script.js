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
