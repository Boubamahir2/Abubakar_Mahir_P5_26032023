import { showPopup } from './scripts.js';

const cartItemsDOM = document.querySelector('#cart__items');
const cartItemCountDOM = document.querySelector('#totalQuantity');
const cartTotalDOM = document.querySelector('#totalPrice');

//il faut daboarb recu recupere nos panier de la local storage
let cartValue = getStorageItem('cartValue');
// console.log(cartValue,'cartValue')

// recuperer tout les donnes paraport au donnée dans localhost
const fetchProduct = async () => {
  let cartArray = []; // tableau vide qui va contenir les objets créés en suite

  if (cartValue !== null) {
    for (let x = 0; x < cartValue.length; x++) {
      // console.log((cartValue[x].id))
      await fetch('http://localhost:3000/api/products/' + cartValue[x].id)
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
        })
        .catch((err) => console.log(err));
    }
  }
  // console.log('CartArray' , cartArray)
  return cartArray;
};

////////Fonction addition quantités et Prix pour Total////////////////
async function displayCartTotal() {
  const products = await fetchProduct();
  let total = 0;
  for (let i = 0; i < cartValue.length; i++) {
    const cartItem = cartValue[i];
    const product = products.find(
      (p) => p.id === cartItem.id && p.color === cartItem.color
    );
    if (!product) {
      console.error(
        `Product with id ${cartItem.id} and color ${cartItem.color} not found in products array`
      );
      continue;
    }
    if (typeof cartItem.quantity !== 'number' || cartItem.quantity <= 0) {
      showPopup(
        'Veuillez sélectionner une quantité correcte, SVP entre 1 - 100',
        'red'
      );
    } else {
      total += product.price * cartItem.quantity;
    }
  }
  if (cartTotalDOM) cartTotalDOM.textContent = total;
  return total;
}

// une fonction poour afichage des continus de panier /////////
const displayCart = async () => {
  const products = await fetchProduct();
  // console.log(products);

  if (cartValue !== null && cartValue.length !== 0) {
    products.forEach((product, index) => {
      // injection dynamique des produits dans le DOM
      addToCartDOM(product);
    });
  } else {
    return messageCartVide(); //si Ls vide, affichage du message Panier Vide
  }
};

////////Fonction addition quantités  Total dans le panier////////////////
export function displayCartItemCount() {
  const amount = cartValue.reduce((total, cartItem) => {
    if (cartItem.quantity <= 0 || typeof cartItem.quantity !== 'number') {
      showPopup(
        'Veuillez sélectionner une quantité correcte, SVP entre 1 - 100',
        'red'
      );
    } else {
      return (total += parseInt(cartItem.quantity));
    }
  }, 0);
  if (cartItemCountDOM) cartItemCountDOM.textContent = amount;
  addLastItemMarker(amount);
  // console.log(amount, 'amount')
}

//Fonction permettant de modifier le nombre d'éléments dans le panier
async function modifyQTY() {
  await fetchProduct();
  const quantityInputs = document.querySelectorAll('.itemQuantity');
  for (let input of quantityInputs) {
    input.addEventListener('change', function () {
      let itemID = this.closest('.cart__item').dataset.id;
      let itemColor = this.closest('.cart__item').dataset.color;
      let findId = cartValue.filter((element) => element.id === itemID);
      let findByColor = findId.find((element) => element.color === itemColor);
      if (!isNaN(this.value) && parseInt(this.value) > 0) {
        if (parseInt(this.value) > 100) {
          showPopup(
            'Veuillez sélectionner une quantité correcte, SVP entre 1 - 100',
            'red'
          );
          return;
        } else {
          findByColor.quantity = parseInt(this.value);
          setStorageItem('cartValue', cartValue);
          displayCartItemCount();
          displayCartTotal();
        }
      } else {
        showPopup(
          'Veuillez sélectionner une quantité correcte, SVP entre 1 - 100',
          'red'
        );
      }
    });
  }
}

////////Supprimer un item avec le bouton supprimer////////
async function removeItem() {
  await fetchProduct();
  const deleteItems = document.querySelectorAll('.deleteItem');
  deleteItems.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', function (e) {
      //On récupère l'ID de la donnée concernée
      const dataID = e.target.closest('article').getAttribute('data-id');
      //On récupère la couleur de la donnée concernée
      const dataColor = e.target.closest('article').getAttribute('data-color');

      // on cherche l'élément du Ls concerné
      const searchItem = cartValue.find(
        (item) => item.id == dataID && item.color == dataColor
      );

      // et on filtre le Ls avec l'élément comme modèle
      cartValue = cartValue.filter((item) => item !== searchItem);
      // on met à jour le Ls
      setStorageItem('cartValue', cartValue);
      // on supprime l'élément du DOM

      const article = e.target.closest('.cart__item');
      article.remove();
      if (cartValue !== null && cartValue.length === 0) {
        localStorage.clear(); //////// si le Ls est vide, on le clear et on affiche le message
        displayCartItemCount();
        return messageCartVide();
      }
      // display amount of cart items
      displayCartItemCount();
      // display total
      displayCartTotal();
    });
  });
}

// parent function for calling all the methods
const initialize = async () => {
  // add all cart items to the dom
  displayCart(); ////// affichage du DOM ( avec rappel du fetchApi //////

  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // setupCartFunctionality();
  removeItem();
  modifyQTY();
};

// intialise all the functions
initialize();

// Cette fonction prend une clé d'élément et obtient la valeur correspondante de localStorage. Si la valeur existe, elle est analysée en tant qu'objet JSON et renvoyée. S'il n'existe pas, un tableau vide est retourné.
export function getStorageItem(item) {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
}

// Cette fonction prend une clé de nom et une valeur d'élément et les définit comme une chaîne JSON dans localStorage. Il utilise JSON.stringify() pour convertir la valeur de l'élément en une chaîne JSON avant de la définir dans localStorage.
export function setStorageItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

// fonction qui renvoie votre carte est vide message si panier vide
export function messageCartVide() {
  const cartTitle = document.querySelector(
    '#limitedWidthBlock div.cartAndFormContainer > h1'
  ); //emplacement du message
  const emptyCartMessage = 'Oups ! Votre panier est vide !';
  cartTitle.textContent = emptyCartMessage;
  cartTitle.style.fontSize = '40px';

  document.querySelector('.cart__order').style.display = 'none'; //masque le formulaire si panier vide
  document.querySelector('.cart__price').style.display = 'none'; // masque le prix total si panier vide
}

// //////////// fonction d'affichage du DOM ////////////////////
// function addToCartDOM(product) {
//   const article = document.createElement('article');
//   if (cartItemsDOM) {
//     article.classList.add('cart__item');
//     article.setAttribute('data-id', product.id);
//     article.setAttribute('data-color', product.color);
//     article.innerHTML = `
//     <div class="cart__item__img">
//       <img src="${product.img}" alt="Photographie d'un canapé">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__description">
//         <h2>${product.name}</h2>
//         <p>${product.color}</p>
//         <p>${product.price} €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p data-id="${product.id}" class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>`;
//     cartItemsDOM.appendChild(article);
//   }
// }
function addToCartDOM(product) {
  if (cartItemsDOM) {
    const article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', product.id);
    article.setAttribute('data-color', product.color);

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('cart__item__img');
    const img = document.createElement('img');
    img.setAttribute('src', product.img);
    img.setAttribute('alt', "Photographie d'un canapé");
    imgDiv.appendChild(img);
    article.appendChild(imgDiv);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('cart__item__content');

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('cart__item__content__description');
    const nameHeading = document.createElement('h2');
    nameHeading.textContent = product.name;
    const colorPara = document.createElement('p');
    colorPara.textContent = product.color;
    const pricePara = document.createElement('p');
    pricePara.textContent = `${product.price} €`;
    descriptionDiv.appendChild(nameHeading);
    descriptionDiv.appendChild(colorPara);
    descriptionDiv.appendChild(pricePara);
    contentDiv.appendChild(descriptionDiv);

    const settingsDiv = document.createElement('div');
    settingsDiv.classList.add('cart__item__content__settings');

    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('cart__item__content__settings__quantity');
    quantityDiv.innerHTML = `
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">`;
    settingsDiv.appendChild(quantityDiv);

    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('cart__item__content__settings__delete');
    const deletePara = document.createElement('p');
    deletePara.setAttribute('data-id', product.id);
    deletePara.classList.add('deleteItem');
    deletePara.textContent = 'Supprimer';
    deleteDiv.appendChild(deletePara);
    settingsDiv.appendChild(deleteDiv);

    contentDiv.appendChild(settingsDiv);
    article.appendChild(contentDiv);

    cartItemsDOM.appendChild(article);
  }
}

// Il s'agit d'une fonction JavaScript qui affiche au dernier élément d'un menu de navigation pour indiquer qu'il a été ajouté au panier de l'utilisateur.
export function addLastItemMarker(content) {
  const element = document.querySelector('.menu');
  let cartValue = getStorageItem('cartValue');
  const navItem = document.querySelector('.menu a:last-child');
  navItem.style.position = 'relative';

  // Cette ligne obtient la largeur actuelle de la fenêtre du navigateur et l'affecte à la variable windowWidth
  const windowWidth = window.innerWidth;
  let height = '1.5rem';
  let width = '1.5rem';
  let top = '30%';
  let fontSize = '14px';

  const style = document.createElement('style');
  // Cette ligne vérifie s'il y a des articles dans le panier. si c'est le cas, affichez l'icône
  if (cartValue.length > 0) {
    // Cette ligne vérifie si la largeur de la fenêtre est inférieure à 576 pixels (c'est-à-dire le point d'arrêt pour les petits écrans).
    if (windowWidth < 576) {
      // Set new values for height, width, and top
      height = '1.1rem';
      width = '1.1rem';
      fontSize = '10px';
    }
    style.innerHTML = `ul a:last-child li::before {
    content: "${content}";
    background: var(--main-color);
    height: ${height};
    width: ${width};
    font-size: ${fontSize};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: ${top};
    right: -15px;
  }`;
  }

  element.appendChild(style);
}
