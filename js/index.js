'use strict';
// General variabel


// Component variabel
const formAdd = $("#form-add");
const navHome = $("#nav-home");
const navAbout = $("#nav-about");
const navAddContactState = $("#nav-add-contact-state");
const navShowContactState = $("#nav-show-contact-state");
const cardContentWrapper = $("#card-content-wrapper");
const dataPeopleField = $("#data-people-field");

// Form field variabel
const name = $("#name");
const phoneNumber = $("#phone-number");
const email = $("#email");
const address = $("#address");
let keyword = $("#search-keyword");
const submit = $("#button-submit");
const reset = $("#button-reset");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Function definition

const successMessage = () => {
  swal(
    'Success!',
    'Contact successfully saved!',
    'success'
  )
}

// Add data to localstorage
const addLocalStorage = () => {
  let newData = {
    name: $('#name').val(),
    phoneNumber: $('#phone-number').val(),
    email: $('#email').val(),
    address: $('#address').val()
  };

  people.push(newData);
  window.localStorage.setItem("contacts", JSON.stringify(people));

};

// Get data from local storage
const getLocalStorage = () => {
  const getData = window.localStorage.getItem("contacts");

  if (getData) {
    return JSON.parse(getData);
  } else {

    return []

  };
}
let people = []

// Clear all textbox
const clearAll = () => {
  name[0].value = "";
  phoneNumber[0].value = "";
  email[0].value = "";
  address[0].value = "";
};

// Show data retrieved from localstorage
const showData = () => {
  let people = getLocalStorage();
  dataPeopleField[0].innerHTML = "";

  people.map((contact, index) => {
    const card = `
    
    <div id="contact-${index}" class="card text-white bg-info contact-person" style="max-width: 18rem;">
        <div class="card-header">${contact.name}</div>
        
        <div class="card-body">
            <h5 class="card-title">Personal Information</h5>
            <p class="card-text"><b>Phone Number</b>: ${contact.phoneNumber}</p>
            <p class="card-text"><b>Email</b>: ${contact.email}</p>
            <p class="card-text"><b>Address</b>: ${contact.address}</p>
    </div>
    </div>
    `;
    return dataPeopleField.append(card);
  });
};

const searchContact = () => {
  let keyword = document.getElementById("search-keyword").value;
  let keywordLowercase = keyword.toLowerCase();
  let people = getLocalStorage();
  dataPeopleField[0].innerHTML = "";

  people.map((contact, index) => {
    if (
      contact.name.toLowerCase().indexOf(keywordLowercase) !== -1 ||
      contact.phoneNumber.toLowerCase().indexOf(keywordLowercase) !== -1 ||
      contact.email.toLowerCase().indexOf(keywordLowercase) !== -1 ||
      contact.address.toLowerCase().indexOf(keywordLowercase) !== -1
    ) {
      const card = `
    <div id="contact-${index}" class="card text-white bg-info contact-person" style="max-width: 18rem;">
        <div class="card-header">${contact.name}</div>
        <div class="card-body">
            <h4 class="card-title">Personal Information</h4>
            <p class="card-text"><b>Phone Number</b>: ${contact.phoneNumber}</p>
            <p class="card-text"><b>Email</b>: ${contact.email}</p>
            <p class="card-text"><b>Address</b>: ${contact.address}</p>
    </div>
    </div>
    `;
      return dataPeopleField.append(card);
    }
  });
};

// Validate if field empty
const validate = () => {
  if (name.val() == "" || phoneNumber.val() == "" || address.val() == "" || email.val() == "") {
    swal(
      'Error!',
      'Please fill every field!',
      'error'
    )
  } else {
    addLocalStorage();
    successMessage();
    clearAll();
  }

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Event listener
window.addEventListener('load', function () {

  navAbout.on("click", function () {
    navHome.removeClass("active");
    navAbout.addClass("active");
  });

  navHome.on("click", function () {
    navHome.addClass("active");
    navAbout.removeClass("active");
  });

  navAddContactState.on("click", function () {
    navAddContactState.addClass("active");
    navShowContactState.removeClass("active");
    cardContentWrapper.removeClass("display-hidden");
    dataPeopleField.addClass("display-hidden");

  });

  navShowContactState.on("click", function () {
    navAddContactState.removeClass("active");
    navShowContactState.addClass("active");
    cardContentWrapper.addClass("display-hidden");
    dataPeopleField.removeClass("display-hidden");
    showData();
  });

  submit.on("click", function () {
    event.preventDefault();
    validate();
  });

  keyword.on("input", function () {
    searchContact();
  });
})