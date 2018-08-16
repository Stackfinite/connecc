"use strict";

// Component/DOM variable
const formAdd = $("#form-add");
const navHome = $("#nav-home");
const navAbout = $("#nav-about");
const navAddContactState = $("#nav-add-contact-state");
const navShowContactState = $("#nav-show-contact-state");
const cardContentWrapper = $("#card-content-wrapper");
const dataPeopleField = $("#data-people-field");
const card = $(".card");

// Form field variable
const name = $("#name");
const phoneNumber = $("#phone-number");
const email = $("#email");
const address = $("#address");
const submit = $("#button-submit");
const reset = $("#button-reset");
const searchForm = $("#search-form");
const searchKeyword = $("#search-keyword");
const buttonSearch = $("#button-search");
const buttonClose = $("#button-close");
const loadingScreen = $("#loading");

// TODO: Use API_URL in each fetch function
const API_URL = "https://connecc-api.herokuapp.com/contacts";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Function definition

const successMessage = () => {
  swal("Success!", "Contact successfully saved!", "success");
};

// Add contact to database
const addContact = () => {
  let contacts = {
    name: $("#name").val(),
    phoneNumber: $("#phone-number").val(),
    email: $("#email").val(),
    address: $("#address").val()
  };

  fetch(API_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(contacts)
  });
};

// Clear all textbox
const clearAll = () => {
  name[0].value = "";
  phoneNumber[0].value = "";
  email[0].value = "";
  address[0].value = "";
};

const createTemplate = (contact, id) => {
  return `
  <div class="col-12 col-md-4">
    <div id="contact-${id}" class="card text-white bg-info contact-person" style="max-width: 18rem;">
      <div class="card-header">
        <h5 class="card-title">${contact.name}
        <button type="button" id="button-close" class="close" aria-label="Close" onClick="deleteContact(${id})">
        <span aria-hidden="true">&times;</span>
        </button>
        </h5>
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
// ShowContacts
const showContacts = (data) => {
  data.contacts.forEach(contact => {
    const { id } = contact;
    const card = createTemplate(contact, id);
    dataPeopleField.append(card);
  });
};

// Get data from database
const getContacts = () => {
  loadingScreen.show();

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      dataPeopleField.html("");

      showContacts(data);
      loadingScreen.hide();
    });
};

const searchContacts = () => {
  const keyword = $("#search-keyword").val();
  const keywordLowercase = keyword.toLowerCase();

  loadingScreen.show();

  fetch(`${API_URL}/search/?q=${keywordLowercase}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dataPeopleField.html("");

      showContacts(data)
      loadingScreen.hide();
    });
};

const deleteContact = id => {
  loadingScreen.show();
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(response => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        dataPeopleField.html("");

        showContacts(data)
        loadingScreen.hide();
      });
  });
};

// Validate if field empty
const validate = () => {
  if (
    name.val() === "" ||
    phoneNumber.val() === "" ||
    address.val() === "" ||
    email.val() === ""
  ) {
    swal("Error!", "Please fill every field!", "error");
  } else {
    addContact();
    successMessage();
    clearAll();
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Event listener
window.addEventListener("load", function() {
  navAbout.on("click", function() {
    navHome.removeClass("active");
    navAbout.addClass("active");
    card.addClass("animated fadeOut");
    searchForm.addClass("animated fadeOut");
  });

  navHome.on("click", function() {
    navHome.addClass("active");
    navAbout.removeClass("active");
  });

  navAddContactState.on("click", function() {
    navAddContactState.addClass("active");
    navShowContactState.removeClass("active");
    cardContentWrapper.removeClass("display-hidden");
    cardContentWrapper.addClass("animated fadeIn");
    dataPeopleField.addClass("display-hidden");
  });

  navShowContactState.on("click", function() {
    navAddContactState.removeClass("active");
    navShowContactState.addClass("active");
    cardContentWrapper.addClass("display-hidden");
    cardContentWrapper.addClass("animated fadeIn");
    dataPeopleField.removeClass("display-hidden");
    getContacts();
  });

  formAdd.on("submit", function(event) {
    event.preventDefault();
    validate();
  });

  searchForm.on("submit", function(event) {
    event.preventDefault();
    searchContact();
  });

  buttonSearch.on("click", function(event) {
    event.preventDefault();
    searchContact();
  });

  loadingScreen.hide();
});