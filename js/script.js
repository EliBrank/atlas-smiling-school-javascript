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


$(document).ready(function() {

});
