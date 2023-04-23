// global imports
import fetchProducts from '../utils/fetchProducts.js';
import { setupStore, store } from './store.js';

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    // add products to the store
    setupStore(products);
  }
};

window.addEventListener('DOMContentLoaded', init);