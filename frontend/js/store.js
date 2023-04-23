import { getStorageItem, setStorageItem } from '../utils/constants.js';

// importer touts les donner de la storage locale
let store = getStorageItem('store');


// setupStore: This function takes in an array of products, likely retrieved from an API or database, and maps over them to create a new array. The new array is then stored in the store variable using setStorageItem. It's possible that this function is used to initially populate the store variable with product data.
const setupStore = (products) => {
  store = products.map((product) => {
    console.log(product, 'product');
    return product
  });
  setStorageItem('store', store);
};

// This function takes in an id parameter and uses the store array to find and return the product object with a matching id. It's likely used to retrieve a single product object for further use in the application.
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};

export { store, setupStore, findProduct };