$(document).ready(() => {
  $('.card').click(function() {
      let id = $(this).attr("data-id");
      location.href = `/post/${id}`;
  })
})