import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../../utils/constants.js';

// meassage cart vide
import {messageCartVide} from '../../utils/constants.js'
import addToCartDOM from './addToCart.js';

const cartItemCountDOM = document.getElementById("#totalQuantity");

const cartTotalDOM = document.getElementById('#totalPrice');
// console.log(cartItemCountDOM,cartItemsDOM,cartTotalDOM);


//il faut daboarb recu recupere nos panier de la local storage
let cartValue = getStorageItem('cartValue');
// console.log(cartValue,'cartValue')

// recuperer tout les donnes paraport au donnée dans localhost
const fetchProduct = async () => {
let cartArray = []; // tableau vide qui va contenir les objets créés en suite

if (cartValue !== null) {
  for (let x = 0; x < cartValue.length; x++) {
    console.log((cartValue[x].id))
    await fetch("http://localhost:3000/api/products/" + cartValue[x].id)
    .then((res) => res.json())
		.then((item) => {
			const article = {
				//création d'un objet qui va regrouper les infos nécessaires à la suite
				id: item._id,
				name: item.name,
				price: item.price,
				color: cartValue[x].color,
				quantity: cartValue[x].quantity,
				alt: item.altTxt,
				img: item.imageUrl,
			};
			cartArray.push(article); //ajout de l'objet article au tableau 
		}).catch((err) => console.log(err));
  }
}
console.log('CartArray' , cartArray)
return cartArray;
}


/////////////// une fonction du fetch pour acceder aux infos Hors Scope/////////
const displayCart = async ()=>{
  const products = await fetchProduct();
  console.log(products);

  if (cartValue !== null && cartValue.length !== 0) {
		products.forEach((product) => { // injection dynamique des produits dans le DOM
		addToCartDOM(product)

		});
	} else {
		return messageCartVide() ; //si Ls vide, affichage du message Panier Vide
	}
}

// parent function for calling all the methods 
const init = () => {
   // add all cart items to the dom
displayCart();         ////// affichage du DOM ( avec rappel du fetchApi //////
}

// intialise all the functions
init();