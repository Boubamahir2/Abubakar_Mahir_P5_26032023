// //////////// fonction d'affichage du DOM ////////////////////
// import { getElement,messagePanierVide,getStorageItem } from '../../utils/constants.js';
const cartItemsDOM = document.querySelector("#cart__items");

function addToCartDOM(product) {
const article = document.createElement('article');
  article.classList.add('cart__item');
  article.setAttribute('data-id', product.id);
  article.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src= "${product.img}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
              cartItemsDOM.appendChild(article);
}

export default addToCartDOM;