//////////// fonction d'affichage du DOM ////////////////////
import { getElement,messagePanierVide,getStorageItem } from '../../utils/constants.js';
let cart = getStorageItem('cart');
const cartItemsDOM = document.getElementById('#cart__items');
const addToCartDOM =  ({_id:id,name,price,imageUrl:image,color,amount})=>{
const article = document.createElement('article');
 article.classList.add('cart__item');
  article.setAttribute('data-id', id);
  article.setAttribute('data-color', color);
   // injection dynamique des produits dans le DOM
   article.innerHTML = `
   <div class="cart__item__img">
                  <img src= "${image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" data-id="${id} class="itemQuantity" name="itemQuantity" min="1" max="100" value="${amount}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
   
   `;
if (cart !== null && cart.length !== 0) {
   cartItemsDOM.appendChild(article);
}else{
 return cartItemsDOM.innerHTML = messagePanierVide();
}
}

export default addToCartDOM;