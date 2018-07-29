//JavaScript to add contact details to localstorage
let contacts = [];

const addLocalStorage = (name,array) => {
    localStorage.setItem(name, JSON.stringify(array));
}

const storeContact = () => {
let newContact = {
    name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    phoneNumber = document.getElementById("phone-number").value,
    address = document.getElementById("address").value
};

    contacts.push(newContact);
    addLocalStorage("contactList", contacts)
}