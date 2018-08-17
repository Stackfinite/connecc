const signupForm = $('#signup-form');
const signupUsername = $('#signup-username');
const signupEmail = $('#signup-email');
const signupPassword = $('#signup-password');
const signupButton = $('#button-signup');

const API_URL = 'https://connecc-api.herokuapp.com/users';

const signUp = () => {
  const data = {
    username: signupUsername.val(),
    email: signupEmail.val(),
    password: signupPassword.val()
  };

  axios
    .post(`${API_URL}/signup`, data)
    .then(response => {
      swal('Sign up successed!', response.data.message, 'success');
    })
    .catch(error => {
      swal('Sign up failed!', response.data.message, 'error');
    });
};

signupForm.on('submit', event => {
  event.preventDefault();

  signUp();
});

signupButton.on('submit', event => {
  event.preventDefault();

  signUp();
});
