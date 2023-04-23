// global imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    setupStore(products);
    const featured = store.filter((product) => product.featured === true);
    display(featured, getElement('.featured-center'));
  }
};

window.addEventListener('DOMContentLoaded', init);