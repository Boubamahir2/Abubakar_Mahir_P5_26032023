// here For example, if the current URL is http://example.com/?id=123, then window.location.search would return ?id=123.
const urlParams = new URLSearchParams(window.location.search); //déclare une variable valant l'url de la page actuelle
const urlID = urlParams.get('id'); //récupère l'id contenu dans l'url de la page actuelle
console.log(urlID);

import { allProductsUrl, getElement, formatPrice } from '../utils/constants.js';


const productImg = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");			// emplacements des différentes zones
const productDescription = getElement("#description");	// d'insertion des variables dynamiques
const colorOptions = getElement("#colors");
const productQuantity = getElement("#quantity");

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch(`${allProductsUrl}/${urlID}`);
    // The if statement checks whether the status code of the response is within the 200 to 299 range, which indicates a successful response.
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      console.log(product, 'single')
      productImg.innerHTML = `<img src="${product.imageUrl}" alt="Photographie d'un canapé">`;
      productName.textContent = product.name;
      productPrice.innerHTML = product.price;
      productDescription.textContent = product.description;
    }
  } catch (error) {
    console.log(error);
  }

});