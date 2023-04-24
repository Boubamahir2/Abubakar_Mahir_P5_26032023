// here For example, if the current URL is http://example.com/?id=123, then window.location.search would return ?id=123.
const urlParams = new URLSearchParams(window.location.search); //déclare une variable valant l'url de la page actuelle
const urlID = urlParams.get('id'); //récupère l'id contenu dans l'url de la page actuelle

import { allProductsUrl, getElement, formatPrice } from '../utils/constants.js';
import { addToCart } from '../js/cart/setUpCarte.js';


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
      const {_id,imageUrl,name,price,description,colors} = await response.json();
      productImg.innerHTML = `<img src="${imageUrl}" alt="Photographie d'un canapé">`;
      productName.textContent = name;
      productPrice.textContent= price;
      productDescription.textContent = description;
      colors.forEach(color => {
        colorOptions.innerHTML += `<option value="${color}">${color}</option>`;
      });

      // j'ai crée une fonction déclenchée au clic sur le bouton ADDTOCART
		const addToCartBtn = document.getElementById("addToCart");

    // une fonction d'ajout au panier avec argument product
    addToCartBtn.addEventListener('click', function (e) {
      	let cartValue = {
				//initialisation de la variable basketValue
				selectedProductID: _id,
				SelectedProductName: name,
				SelectedProductColor: colorOptions.value,
				quantity: productQuantity.value
			};

      	// une fonction de récupération du panier
        	function getBasket() {
				let basketValue = JSON.parse(localStorage.getItem("kanapLs"));
				if (basketValue === null) {
					return [];				//si le LocalStorage est vide, on crée un tableau vide
				} else {
					return basketValue
				}
			}

  });

    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="index.html" class="btn">back home</a>
    </div> 
     `;
    }

  } catch (error) {
    console.log(error);
  }
});