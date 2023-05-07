// importer une fonction réutilisable à partir d'utils
import { getStorageItem, setStorageItem } from '../js/utils/constants.js';

// importer touts les donner de la storage locale
let store = getStorageItem('store');

// setupStore : cette fonction prend un tableau de produits, probablement extraits d'une API ou d'une base de données, et les mappe pour créer un nouveau tableau. Le nouveau tableau est ensuite stocké dans la variable de magasin à l'aide de setStorageItem. Il est possible que cette fonction soit utilisée pour remplir initialement la variable de magasin avec des données produit.
const setupStore = (products) => {
  store = products.map((product) => {
    // console.log(product, 'product');
    return product;
  });
  setStorageItem('store', store);
};

export { store, setupStore };
