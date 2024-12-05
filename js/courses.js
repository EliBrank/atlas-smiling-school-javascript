$(document).ready(function() {
  populateCourseVideos();

  $('.dropdown-menu .dropdown-item').on('click', function(event) {
    event.preventDefault();

    const $textSelection = $(this).text();

    // from clicked element, go to nearest selected-dropdown class span (within same dropdown)
    $(this).closest('.dropdown').find('.selected-dropdown').text($textSelection);

    populateCourseVideos();
  });

  $('#search-query').on('input', function(event) {
    populateCourseVideos();
  });

});
