// here For example, if the current URL is http://example.com/?id=123, then window.location.search would return ?id=123.
const urlParams = new URLSearchParams(window.location.search); //déclare une variable valant l'url de la page actuelle
const urlID = urlParams.get('id'); //récupère l'id contenu dans l'url de la page actuelle

import { allProductsUrl, getElement, setStorageItem,getStorageItem } from '../utils/constants.js';

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
      productQuantity.value = 1;
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
				//initialisation de la variable cartValue
				selectedProductID: _id,
				selectedProductImage: imageUrl,
				selectedProductName: name,
				selectedProductColor: colorOptions.value,
				quantity: productQuantity.value
			};

			//je crée une fonction d'ajout au panier avec argument product
			function addToCart(product) {
        let cartValue = getStorageItem('cartValue');
				let availableItems = cartValue.find(
					/// on définit availableItems comme l'article à trouver
					(item) =>
						item.selectedProductID === product.selectedProductID &&
						item.selectedProductColor === product.SelectedProductColor	
				); //si les produits du panier et les produits du LS n'ont pas même ID et même couleur
					// il retournera undefined  
				if (
					availableItems == undefined &&
					colorOptions.value != "" &&			//si les consitions sont OK
					productQuantity.value > 0 &&
					productQuantity.value <= 100
				) {
					product.quantity = productQuantity.value; //la quantité saisie est définie 
					cartValue.push(product);					 //dans le Ls
				} else {
					let newQuantity =
						parseInt(availableItems.quantity) +
						parseInt(productQuantity.value); //CUMUL Quantité si présent ID et color
					availableItems.quantity = newQuantity;
				}
				saveCart(cartValue);
				alert(
					`Le canapé ${name} ${colorOptions.value} a été ajouté en ${productQuantity.value} exemplaires à votre panier !`
				);
			}
			//une fonction de sauvegarde du panier
			function saveCart(cartValue) {
        setStorageItem('cartValue', cartValue);
			}

			// Si le choix de couleur est vide
			if (colorOptions.value === "") {
				alert("Veuillez choisir une couleur, SVP");
			}
			// Si la quantité choisie est nulle OU si elle dépasse 100
			else if (
				productQuantity.value <= 0 ||
				productQuantity.value > 100
			) {
				alert("Veuillez sélectionner une quantité correcte, SVP");
			} else {
				//Si tout est OK, on envoie le panier au LS
				addToCart(cartValue);
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