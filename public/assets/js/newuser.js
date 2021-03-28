function addUser() {
  const userInfo = {
    name: $('#name').val(),
    password: $('#password').val()
  }
  axios.post('/api/users', userInfo)
    .then(res => {
      if (res.status = 200) window.location.href = "/dashboard";
    }).catch(err => {
      console.log(err);
    })
}

$(document).ready(() => {

  $('#newUserForm').submit((e) => {
    e.preventDefault();
    if ($('#name').val() === '' || $('#password').val() === '') return;
    addUser();
  })
})