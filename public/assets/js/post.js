const addPost = () => {
  const newPost = {
    title: $('#title').val(),
    post: $('#newPost').val()
  }

  axios.post(`/api/posts/`, newPost)
    .then(res => {
      window.location.href = "/dashboard";
    })
    .catch(err => {
      console.log(err);

    })
}

const editPost = () => {
  const updatedPost = {
    title: $('#title').val(),
    post: $('#newPost').val()
  }
  const id = $('.postForm').attr('data-id');
  axios.put(`/api/posts/${id}`, updatedPost)
    .then(res => {
      window.location.href = "/dashboard";
    })
    .catch(err => {
      console.log(err);

    })
}

$(document).ready(() => {

  $('#newPostForm').submit(e => {
    e.preventDefault();
    if ($('#title').val() === '' || $('#newPost').val() === '') return;
    addPost();
  })

  $('#editPostForm').submit(e => {
    e.preventDefault();
    if ($('#title').val() === '' || $('#newPost').val() === '') return;
    editPost();
  })
})