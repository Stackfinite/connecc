'use strict';

// Component/DOM variable
const formAdd = $('#form-add');
const navHome = $('#nav-home');
const navAbout = $('#nav-about');
const navAddContactState = $('#nav-add-contact-state');
const navShowContactState = $('#nav-show-contact-state');
const cardContentWrapper = $('#card-content-wrapper');
const dataPeopleField = $('#data-people-field');

// Form field variable
const name = $('#name');
const phoneNumber = $('#phone-number');
const email = $('#email');
const address = $('#address');
const submit = $('#button-submit');
const reset = $('#button-reset');
const searchForm = $('#search-form');
const searchKeyword = $('#search-keyword');

// TODO: Use API_URL in each fetch function
const API_URL = 'https://connecc-api.herokuapp.com/contacts/';

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Function definition

const successMessage = () => {
  swal('Success!', 'Contact successfully saved!', 'success');
};

// Add contact to database
const addContact = () => {
  let contacts = {
    name: $('#name').val(),
    phoneNumber: $('#phone-number').val(),
    email: $('#email').val(),
    address: $('#address').val()
  };

  fetch(API_URL, {
    method: 'post',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(contacts)
  });
};

// Clear all textbox
const clearAll = () => {
  name[0].value = '';
  phoneNumber[0].value = '';
  email[0].value = '';
  address[0].value = '';
};

const createTemplate = (contact, index) => {
  return `
  <div class="col-12 col-md-4">
    <div id="contact-${index}" class="card text-white bg-info contact-person" style="max-width: 18rem;">
      <div class="card-header">
        <h5 class="card-title">${contact.name}</h5>          
      </div>
      <div class="card-body">
        <p class="card-text"><b>Phone Number</b>: ${contact.phone_number}</p>
        <p class="card-text"><b>Email</b>: ${contact.email}</p>
        <p class="card-text"><b>Address</b>: ${contact.address}</p>
      </div>
    </div>
  </div>
  `;
};

// Get data from database
const showContact = () => {
  fetch(API_URL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer'
  })
    .then(response => response.json())
    .then(data => {
      dataPeopleField.html('');

      data.contact.forEach((contact, index) => {
        const card = createTemplate(contact, index);

        dataPeopleField.append(card);
      });
    });
};

const searchContact = () => {
  const keyword = $('#search-keyword').val();
  const keywordLowercase = keyword.toLowerCase();

  fetch(`https://connecc-api.herokuapp.com/contacts/`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrer: 'no-referrer'
  })
    .then(response => response.json())
    .then(data => {
      data.contact.forEach((contact, index) => {
        const found =
          contact.name.toLowerCase().indexOf(keywordLowercase) !== -1 ||
          contact.phone_number.toLowerCase().indexOf(keywordLowercase) !== -1 ||
          contact.email.toLowerCase().indexOf(keywordLowercase) !== -1 ||
          contact.address.toLowerCase().indexOf(keywordLowercase) !== -1;

        if (found) {
          dataPeopleField.html('');

          const card = createTemplate(contact, index);
          dataPeopleField.append(card);
        }
      });
    });
};

// Validate if field empty
const validate = () => {
  if (
    name.val() === '' ||
    phoneNumber.val() === '' ||
    address.val() === '' ||
    email.val() === ''
  ) {
    swal('Error!', 'Please fill every field!', 'error');
  } else {
    addContact();
    successMessage();
    clearAll();
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Event listener
window.addEventListener('load', function() {
  navAbout.on('click', function() {
    navHome.removeClass('active');
    navAbout.addClass('active');
  });

  navHome.on('click', function() {
    navHome.addClass('active');
    navAbout.removeClass('active');
  });

  navAddContactState.on('click', function() {
    navAddContactState.addClass('active');
    navShowContactState.removeClass('active');
    cardContentWrapper.removeClass('display-hidden');
    dataPeopleField.addClass('display-hidden');
  });

  navShowContactState.on('click', function() {
    navAddContactState.removeClass('active');
    navShowContactState.addClass('active');
    cardContentWrapper.addClass('display-hidden');
    dataPeopleField.removeClass('display-hidden');
    showContact();
  });

  formAdd.on('submit', function(event) {
    event.preventDefault();
    validate();
  });

  searchForm.on('submit', function(event) {
    event.preventDefault();
    searchContact();
  });

  searchKeyword.on('input', function() {
    searchContact();
  });
});
