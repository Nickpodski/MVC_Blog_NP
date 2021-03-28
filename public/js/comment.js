
const addComment = () => {
  let newComment = {
      comment: $('#newComment').val()
  }

  let id = $('.card').attr('data-id')

  axios.post(`/api/comments/${id}`, newComment)
      .then(res => {
          window.location.href = `/post/${id}`;
      })
      .catch(err => {
          console.log(err);

      })
}

$(document).ready(() => {

  $('#commentBtn').click(() => {
      $('.commentForm').removeClass('hidden');
  })

  $('#newCommentForm').submit(e => {
      e.preventDefault();
      if ($('#newComment').val() === '') return;
      addComment();
  })
})