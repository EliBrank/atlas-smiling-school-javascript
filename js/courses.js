$(document).ready(function() {
  populateCourseVideos();

  $('.dropdown-menu .dropdown-item').on('click', function(event) {
    event.preventDefault();

    const $textSelection = $(this).text();

    // from clicked element, go to nearest selected-dropdown class span (within same dropdown)
    $(this).closest('.dropdown').find('.selected-dropdown').text($textSelection);

    populateCourseVideos();
  });

  $('#search-query').on('keypress', function(event) {
    // checks if keypress (event) was enter (num code 13)
    if (event.which === 13) {
      event.preventDefault();

      populateCourseVideos();
    }
  });

});
