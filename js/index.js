// General variabel
let people = [];

// Component variabel
const formAdd = $("#form-add");
const navHome = $("#nav-home");
const navAbout = $("#nav-about");
const navAddContactState = $("#nav-add-contact-state");
const navShowContactState = $("#nav-show-contact-state");
const cardContentWrapper = $("#card-content-wrapper");
const dataPeopleField = $("#data-people-field");

// Form field variabel
let name = $("#name");
let phoneNumber = $("#phone-number");
let email = $("#email");
let address = $("#address");
const submit = $("#button-submit");
const reset = $("#button-reset");

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Function Definition
const cardTemplate = (name, phoneNumber, email, address) => {
  const card = `
    <div class="card text-white bg-info contact-person" style="max-width: 18rem;">
        <div class="card-header">${name}</div>
        <div class="card-body">
            <h4 class="card-title">Personal Information</h4>
            <p class="card-text"><b>Phone Number</b>: ${phoneNumber}</p>
            <p class="card-text"><b>Email</b>: ${email}</p>
            <p class="card-text"><b>Address</b>: ${address}</p>
    </div>
    </div>
    `;
  return dataPeopleField.append(card);
};

const addLocalStorage = () => {
  let newData = {
    name: document.getElementById("name").value,
    phoneNumber: document.getElementById("phone-number").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };

  people.push(newData);
  window.localStorage.setItem("contacts", JSON.stringify(people));
};

const getLocalStorage = () => {
  const getData = window.localStorage.getItem("contacts");

  if (getData) return (people = JSON.parse(getData));
  else return [];
};

const clearAll = () => {
  name[0].value = "";
  phoneNumber[0].value = "";
  email[0].value = "";
  address[0].value = "";
};

const showData = () => {
  // const dataPeople = get()
  // dataPeopleField.html('')

  // dataPeople.forEach(person => {
  //     let personInfo = ''
  //     for(let key in person){

  //     }
  // });
  return cardTemplate(
    "Arie Brainware",
    "08123456",
    "nobody@nowhere.net",
    "Nowhere"
  );
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Event listener
navAbout.on("click", function() {
  navHome.removeClass("active");
  navAbout.addClass("active");
});

navHome.on("click", function() {
  navHome.addClass("active");
  navAbout.removeClass("active");
});

navAddContactState.on("click", function() {
  navAddContactState.addClass("active");
  navShowContactState.removeClass("active");
  cardContentWrapper.removeClass("display-hidden");
});

navShowContactState.on("click", function() {
  navAddContactState.removeClass("active");
  navShowContactState.addClass("active");
  cardContentWrapper.addClass("display-hidden");
  dataPeopleField.removeClass("display-hidden");
  showData();
});

submit.on("click", function() {
  addLocalStorage();
  clearAll();
});
