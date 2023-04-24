import { getElement } from '../utils/constants.js';
const cartItemsDOM = getElement('#cart__items');
const addToCartDOM =  ({_id,name,price,description,altTxt,imageUrl})=>{
const article = document.createElement('article');
 article.classList.add('cart__item');
  article.setAttribute('data-id', id);
   article.innerHTML = `
   
   `;

   cartItemsDOM.appendChild(article);
}

export default addToCartDOM;