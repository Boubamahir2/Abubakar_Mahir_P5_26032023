// global imports
import fetchProducts from '../utils/fetchProducts.js';
import { setupStore, store } from './store.js';
import display from './displayProducts.js'
import { getElement } from '../utils/constants.js';


// The code is an example of an asynchronous function that initializes the page once the DOM content is loaded. It starts by using the await keyword to asynchronously fetch products from an external source, which is presumably an API. Once the fetchProducts function completes and the products are returned, the setupStore function is called with the products as an argument to add them to the store. Finally, the display function is called to display the store on the webpage.
const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    setupStore(products);
    display(store, getElement('#items') )
  }
};

// The code is wrapped in an event listener that waits for the DOMContentLoaded event to fire before calling the init function. This ensures that the page is fully loaded before any code that depends on the DOM is executed.
window.addEventListener('DOMContentLoaded', init);