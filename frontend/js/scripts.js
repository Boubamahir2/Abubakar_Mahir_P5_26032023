import { getStorageItem, addLastItemMarker } from './cart.js';
let cartValue = getStorageItem('cartValue');
export const allProductsUrl = 'http://localhost:3000/api/products';

// The code is an example of an asynchronous function that initializes the page once the DOM content is loaded. It starts by using the await keyword to asynchronously fetch products from an external source, which is presumably an API. Once the fetchProducts function completes and the products are returned, the setupStore function is called with the products as an argument to add them to the store. Finally, the display function is called to display the store on the webpage.
const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    const element = document.querySelector('#items');
    if (element) {
      // add products to the store
      displayCount(cartValue);
      // ...
      //boucle pour importer chaque champ du JSON et lui attribuer une variable
      element.innerHTML = products
        .map((product) => {
          // console.log(product._id)
          return `<a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
          </article>
      </a>`; //les photos et infos des canapés sont insérées dynamiquement dans l'HTML de la page d'accueil
        })
        .join('');
    }
  }
};

export function showPopup(message, color) {
  const windowWidth = window.innerWidth;
  let padding = '30px 50px';
  let fontSize = '20px';
  let width = '';
  let left = '50%';
  let top = '10%';
  const popup = document.createElement('div');
  if (windowWidth < 576) {
    top = '5%';
    padding = '20px';
    width = '100%';
    fontSize = '15px';
    popup.style.textAlign = 'center';
  }
  popup.style.position = 'fixed';
  popup.style.top = `${top}`;
  popup.style.left = `${left}`;
  popup.style.width = `${width}`;
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = `${padding}`;
  popup.style.background = color;
  popup.style.color = 'white';
  popup.style.fontSize = `${fontSize} `;
  popup.style.fontWeight = '600';
  popup.style.borderRadius = '5px';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}
// setError
export function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains('success')) {
    parent.classList.remove('success');
  }
  parent.classList.add('error');
  element.innerText = errorMessage;
}

// setSuccess
export function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
  element.innerText = '';
}

export function displayCount(cart) {
  const amount = cart.reduce((total, cartItem) => {
    return total + parseInt(cartItem.quantity);
  }, 0);
  addLastItemMarker(amount);
  // console.log(amount, 'amount')
}

//requete de l'API afin d'importer les données des canapés
const fetchProducts = async () => {
  const response = await fetch(allProductsUrl).catch((err) => console.log(err)); // retour d'un code d'erreur dans la console en cas de problème lors du fetch
  if (response) {
    return response.json(); //conversion des données reçues en format JSON exploitable par js
  }
  return response;
};

// The code is wrapped in an event listener that waits for the DOMContentLoaded event to fire before calling the init function. This ensures that the page is fully loaded before any code that depends on the DOM is executed.
window.addEventListener('DOMContentLoaded', init);
