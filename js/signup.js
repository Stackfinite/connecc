const request = axios.create({
  baseURL: 'https://connecc-api.herokuapp.com/users',
  timeout: 1000,
  headers: {
    Authorization: `Bearer token`
  }
});

const signupForm = $('#signup-form');
const signupUsername = $('#signup-username');
const signupEmail = $('#signup-email');
const signupPassword = $('#signup-password');
const signupButton = $('#button-signup');

// const loginForm =
// const loginEmail =
// const loginPassword

const signUp = () => {
  const data = {
    username: signupUsername.val(),
    email: signupEmail.val(),
    password: signupPassword.val()
  };

  request
    .post('/', data)
    .then(response => {
      swal('Sign up success!', response.data.message, 'success');
    })
    .catch(error => {
      swal('Sign up failed!', 'failed', 'error');
    });
};

signupForm.on('submit', event => {
  event.preventDefault();

  signUp();
});
