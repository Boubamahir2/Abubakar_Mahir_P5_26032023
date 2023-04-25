import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../../utils/constants.js';

import {fetchSingleProduct} from '../../utils/fetchProducts.js';

import addToCartDOM from './addToCart.js';
import { findProduct } from '../store.js';

const cartItemCountDOM = document.getElementById("#totalQuantity");
const cartItemsDOM = document.getElementById('#cart__items');
const cartTotalDOM = document.getElementById('#totalPrice');
// console.log(cartItemCountDOM,cartItemsDOM,cartTotalDOM);


//il faut daboarb recu recupere nos panier de la local storage
let cartValue = getStorageItem('cartValue');
// console.log(cartValue,'cartValue')

const fetchProduct = async () => {
  let CartArray = []; // tableau vide qui va contenir les objets créés en suite

if (cartValue !== null) {
  for (let x = 0; x < cartValue.length; x++) {
    console.log((cartValue[x].id))
    const product =  await fetchSingleProduct(cartValue[x].id);
    console.log(product);
  }
}
}


/////////////// déclaration de la fonction du fetch pour acceder aux infos Hors Scope/////////


// parent function for calling all the methods 
const init = () => {
   // add all cart items to the dom
fetchProduct();
}
// intialise all the functions
init();