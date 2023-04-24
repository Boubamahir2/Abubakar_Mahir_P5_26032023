import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../../utils/constants.js';

import addToCartDOM from './addToCartDOM.js';

const cartItemCountDOM = getElement('#totalQuantity');
const cartItemsDOM = getElement('#cart__items');
const cartTotalDOM = getElement('#totalPrice');

//if faut daboarb recu recupere nos panier de la local storage
let cart = getStorageItem('cart');