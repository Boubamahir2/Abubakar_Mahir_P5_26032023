// récupérez l'URL de l'ID,  ici Par exemple, si l'URL actuelle est http://example.com/?id=123, alors window.location.search renverra ?id=123.
const urlParams = new URLSearchParams(window.location.search); //déclare une variable valant l'url de la page actuelle
const urlID = urlParams.get('id'); //récupère l'id contenu dans l'url de la page actuelle

// importer une fonction réutilisable à partir d'utils
import { allProductsUrl,displayCartItemCount, getElement, setStorageItem,getStorageItem } from '../utils/constants.js';

// variables  pour l'image de la product
const productImg = document.querySelector(".item__img");
// variables  pour le nom de la product
const productName = document.querySelector("#title");
// variables  pour le prix de la product
const productPrice = document.querySelector("#price");			
// variables  pour la description de la product
const productDescription = getElement("#description");	
// variables  pour la coleur de la product
const colorOptions = getElement("#colors");
// variables  pour la quatité de la product
const productQuantity = getElement("#quantity");
// calacule les quatité 
displayCartItemCount()

// affiche les produits dynamiquement lors du chargement de la page
window.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch(`${allProductsUrl}/${urlID}`);
   // L'instruction if vérifie si le code d'état de la réponse est compris entre 200 et 299, ce qui indique une réponse réussie. 
    if (response.status >= 200 && response.status <= 299) {
      productQuantity.value = 1;
      const {_id,imageUrl,name,price,description,colors} = await response.json();

      productImg.innerHTML = `<img src="${imageUrl}" alt="Photographie d'un canapé">`;
      productName.textContent = name;
      productPrice.textContent= price;
      productDescription.textContent = description;
      productQuantity.setAttribute('data-id', _id);
      colors.forEach(color => {
        colorOptions.innerHTML += `<option value="${color}">${color}</option>`;
      });

      // j'ai crée une fonction déclenchée au clic sur le bouton ADDTOCART
		const addToCartBtn = document.getElementById("addToCart");

    // une fonction d'ajout au panier avec argument product
    addToCartBtn.addEventListener('click', function (e) {
      let cart = {
				//initialisation de la variable cartValue
				id: _id,
				image: imageUrl,
        price:price,
				name,
				color: colorOptions.value,
				quantity: productQuantity.value
			};

			//une fonction d'ajout au panier avec argument product
			function addToCart(product) {
        let cartValue = getStorageItem('cartValue');
				let availableItems = cartValue.find(
					/// on définit availableItems comme l'article à trouver
					(item) =>
						item.id === product.id &&
						item.color === product.color	
				); //si les produits du panier et les produits du LS n'ont pas même ID et même couleur
					// il retournera undefined  
				if (
					availableItems == undefined &&
					colorOptions.value != "" &&			//si les consitions sont OK
					productQuantity.value > 0 &&
					productQuantity.value <= 100
				) {
					product.quantity = parseInt(productQuantity.value); //la quantité saisie est définie 
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
				addToCart(cart);
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