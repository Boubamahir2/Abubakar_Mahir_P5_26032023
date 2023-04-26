import {
 removeItem,
  getElement,
  increaseAmount,
  getStorageItem,
  setStorageItem,
  decreaseAmount,
  messageCartVide
} from '../../utils/constants.js';

// meassage cart vide
import addToCartDOM from './addToCart.js';
import {addLastItemMarker} from './notification.js'

const cartItemsDOM = getElement("#cart__items");
const cartItemCountDOM = getElement("#totalQuantity");
const cartTotalDOM = getElement('#totalPrice');
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


// une fonction poour afichage des continus de panier /////////
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

////////Fonction addition quantités  Total dans le panier////////////////
function displayCartItemCount() {
  const amount = cartValue.reduce((total, cartItem) => {
    return (total += cartItem.quantity);
  }, 0);
  cartItemCountDOM.textContent = amount;
  if(amount){
     setStorageItem('amount', amount);
  }
  
  console.log(amount, 'amount')
}


function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

////////Fonction addition quantités et Prix pour Total////////////////
function displayCartTotal() {
  let total = cartValue.reduce((total, cartItem) => {
    
    console.log(cartItem, 'cartItem')
    return (total += cartItem.price * cartItem.quantity);
  }, 0);
  cartTotalDOM.textContent = total;
  console.log(total, 'total')
  
}


// parent function for calling all the methods 
const init = () => {
   // add all cart items to the dom
displayCart();         ////// affichage du DOM ( avec rappel du fetchApi //////

// display amount of cart items
displayCartItemCount()
 // display total
  displayCartTotal();
  setupCartFunctionality();
}

// intialise all the functions
init();