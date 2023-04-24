import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../../utils/constants.js';

import addToCartDOM from './addToCart.js';
import { findProduct } from '../store.js';

const cartItemCountDOM = document.getElementById("#totalQuantity");
const cartItemsDOM = document.getElementById('#cart__items');
const cartTotalDOM = document.getElementById('#totalPrice');

console.log(cartItemCountDOM,cartItemsDOM,cartTotalDOM);

//il faut daboarb recu recupere nos panier de la local storage
let cart = getStorageItem('cart');
console.log(cart,'cart')

// 
export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);
    if (!item) {
    let product = findProduct(id);
    // add item to the carte
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to the DOM;
    addToCartDOM(product);
  } 
}



function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

// parent function for calling all the methods 
const init = () => {
   // add all cart items to the dom
  displayCartItemsDOM();
}
// intialise all the functions
init();