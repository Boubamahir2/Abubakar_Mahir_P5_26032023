// dom selsectors
import {setError,setSuccess} from '../utils/messages.js'
// error messages elements
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

// input fields 
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

// déclaration des regex de contrôle des inputs du formulaire //
const regexFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const regexLastName = regexFirstName;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/; 
const regexCity = regexFirstName;
const regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;


// écoute du clic sur le bouton COMMANDER //
const orderBtn = document.querySelector("#order");


function validateForm() {
  // firstName
  if (firstNameInput.value.trim() == "") {
    setError(firstNameInput, "prénom ne peut pas être vide");
  } else if (firstNameInput.value.trim().length < 3) {
    setError(firstNameInput, "prénom doit comporter au moins 3 caractères");
  } else if (firstNameInput.value.trim().length > 20) {
    setError(firstNameInput, "prénom doit comporter au 20 caractères max");
  } else {
    setSuccess(firstNameInput);
  }

  // lastName
  if (lastNameInput.value.trim() == "") {
    setError(lastNameInput, "nom ne peut pas être vide");
  } else if (lastNameInput.value.trim().length < 3) {
    setError(lastNameInput, "nom doit comporter au moins 3 caractères");
  } else if (lastNameInput.value.trim().length > 20) {
    setError(lastNameInput, "prénom doit comporter 20 caractères max");
  } else {
    setSuccess(lastNameInput);
  }
  // Address
  if (addressInput.value.trim() == "") {
    setError(addressInput, "email ne peut pas être vide");
  } else if (addressInput.value.trim().length > 32) {
    setError(addressInput, "email doit comporter 32 caractères max");
  } else if (isEmailValid(addressInput)) {
    setError(addressInput, "Veuillez fournir une e-mail valide");
  } else {
    setSuccess(signupEmail);
  }

  // ville
  if (cityInput.value.trim() == "") {
    setError(cityInput, "email ne peut pas être vide");
  } else if (cityInput.value.trim().length > 32) {
    setError(cityInput, "email doit comporter 32 caractères max");
  } else if (isEmailValid(cityInput)) {
    setError(cityInput, "Veuillez fournir une e-mail valide");
  } else {
    setSuccess(cityInput);
  }

  // Email
  if (emailInput.value.trim() == "") {
    setError(emailInput, "email ne peut pas être vide");
  } else if (emailInput.value.trim().length > 32) {
    setError(emailInput, "email doit comporter 32 caractères max");
  } else if (isEmailValid(emailInput)) {
    setError(emailInput, "Veuillez fournir une e-mail valide");
  } else {
    setSuccess(emailInput);
  }

 
}


orderBtn.addEventListener("click", function(e) {
	e.preventDefault(); //une méthode qui permet d'annuler le comportement par défaut d'un événement déclenché par un élément HTML.

  validateForm()

  	// recupération des inputs du formulaire //
	let checkFirstName = firstNameInput.value;
	let checkLastName = lastNameInput.value;
	let checkAddress = addressInput.value;
	let checkCity = cityInput.value;
	let checkEmail = emailInput.value;

});