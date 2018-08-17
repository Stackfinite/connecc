const signinForm = $('#signin-form');
const signinUsername = $('#signin-username');
const signinPassword = $('#signin-password');
const signinButton = $('#button-signin');

//------------------------------------------------------------------------

const API_URL = 'https://connecc-api.herokuapp.com/users';

//------------------------------------------------------------------------

const storeToken = token => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

//------------------------------------------------------------------------

const signIn = () => {
  const data = {
    username: signinUsername.val(),
    password: signinPassword.val()
  };

  axios
    .post(`${API_URL}/signin`, data)
    .then(response => {
      swal('Sign in successed!', response.data.message, 'success');
      storeToken(response.data.token);
    })
    .catch(error => {
      swal('Sign in failed!', response.data.message, 'error');
    });
};

signinForm.on('submit', event => {
  event.preventDefault();

  signIn();
});

signinButton.on('click', event => {
  event.preventDefault();

  signIn();
});
