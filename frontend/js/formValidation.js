// dom selsectors
import {setError,setSuccess} from '../utils/messages.js'
import {getStorageItem} from '../utils/constants.js'
let cartValue = getStorageItem('cartValue');
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


// // mise en place des conditions de validation des champs du formulaire //
function validateForm() {
  // si une erreur est trouvée, un message est retourné et la valeur false également //
  // firstName
  if (firstNameInput.value.trim() == "") {
    setError(firstNameErrorMsg, "prénom ne peut pas être vide");
  } 
  else if (regexFirstName.test(firstNameInput.value) == false) {
    setError(firstNameErrorMsg, "Merci de renseigner un prénom valide");
  } 
  else if (firstNameInput.value.trim().length < 3) {
    setError(firstNameErrorMsg, "prénom doit comporter au moins 3 caractères");
  }
   else if (firstNameInput.value.trim().length > 20) {
    setError(firstNameErrorMsg, "prénom doit comporter au 20 caractères max");
  } else {
    setSuccess(firstNameInput);
  }

  // lastName
  if (lastNameInput.value.trim() == "") {
    setError(lastNameErrorMsg, "nom ne peut pas être vide");
  }
  else if (regexLastName.test(lastNameInput.value) == false) {
    setError(lastNameErrorMsg, "Merci de renseigner un nom valide");
  }
   else if (lastNameInput.value.trim().length > 20) {
    setError(lastNameErrorMsg, "nom doit comporter au moins 3 caractères");
  }
   else if (lastNameInput.value.trim().length < 3) {
    setError(lastNameErrorMsg, "nom doit comporter au moins 3 caractères");
  } 
  else {
    setSuccess(lastNameInput);
  }

  // Address
  if (addressInput.value.trim() == "") {
    setError(addressErrorMsg, "address ne peut pas être vide");
  } 
  else if (regexAddress.test(addressInput.value) == false) {
    setError(addressErrorMsg, "Merci de renseigner une address valide");
  }
  else if (addressInput.value.trim().length > 32) {
    setError(addressErrorMsg, "address doit comporter 32 caractères max");
  } 
   else {
    setSuccess(addressInput);
  }

  // ville
  if (cityInput.value.trim() == "") {
    setError(cityErrorMsg, "ville ne peut pas être vide");
  }
   else if (regexCity.test(cityInput.value) == false) {
    setError(addressErrorMsg, "Merci de renseigner une address valide");
  } 
  else if (cityInput.value.trim().length > 32) {
    setError(cityErrorMsg, "ville doit comporter 32 caractères max");
  } 
  else {
    setSuccess(cityInput);
  }

  // Email
  if (emailInput.value.trim() == "") {
    setError(emailErrorMsg, "email ne peut pas être vide");
  }
   else if (regexEmail.test(emailInput.value) == false) {
    setError(emailErrorMsg, "Merci de renseigner un email valide");
  }
  else if (emailInput.value.trim().length > 32) {
    setError(emailErrorMsg, "email doit comporter 32 caractères max");
  }
   else {
    setSuccess(emailInput);
  }

}

// validate form
function isFormValid() {
  const inputContainer = document.querySelectorAll(".cart__order__form__question");
  let result = true;
  inputContainer.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}


orderBtn.addEventListener("click", function(e) {
	e.preventDefault(); //une méthode qui permet d'annuler le comportement par défaut d'un événement déclenché par un élément HTML.

  validateForm()

  async function handleSubmit(e) {
    if(isFormValid() == true){
    let contact = {
			firstName: firstNameInput.value,
			lastName: lastNameInput.value,
			address: addressInput.value,
			city: cityInput.value,
			email: emailInput.value,
		};

		// on crée un tableau vide qui va récupérer les articles du panier à envoyer à l'API //

		let products = [];

    // On ne push donc QUE les ID des canapés du panier dans le tableau créé //
    for(let product of cartValue){
      products.push(product.id)
    }

    	// un 'objet contenant les infos de la commande //
		let orderObject = { contact, products };

    // récupération de l'ID de commande après fetch POST vers API   //
   const response = fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			body: JSON.stringify(orderObject),
			headers: {
				"Content-type": "application/json",
			},
		})

    response.then(async function (response) {
			// réponse de l'API //
			const data = await response.json();
			//renvoi vers la page de confirmation avec l'ID de commande //
			window.location.href = `confirmation.html?orderId=${data.orderId}`;
      // console.log(data);
      
    })
  }
}

handleSubmit()

});