// une function reutilsable pour importer les donneés
import { allProductsUrl } from './constants.js';

//requete de l'API afin d'importer les données des canapés
const fetchProducts = async () => {
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));  // retour d'un code d'erreur dans la console en cas de problème lors du fetch
  if (response) {
    return response.json(); //conversion des données reçues en format JSON exploitable par js
  }
  return response;
};
const fetchSingleProduct = async ({id}) => {
  const response = await fetch(`${allProductsUrl}/${id}`).catch((err) => console.log(err));  // retour d'un code d'erreur dans la console en cas de problème lors du fetch
  if (response) {
    return response.json(); //conversion des données reçues en format JSON exploitable par js
  }
  return response;
};

export  {fetchProducts,
  fetchSingleProduct
};
