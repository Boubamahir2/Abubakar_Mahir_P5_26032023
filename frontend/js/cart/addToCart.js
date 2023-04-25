//////////// fonction d'affichage du DOM ////////////////////
import { getElement,messagePanierVide,getStorageItem } from '../../utils/constants.js';

function addToCart(product,name) {
  let cartValue = getStorageItem('cartValue');
  let availableItems = cartValue.find(
    /// on définit availableItems comme l'article à trouver
    (item) =>
      item.selectedProductID === product.selectedProductID &&
      item.SelectedProductColor === product.SelectedProductColor	
  ); //si les produits du panier et les produits du LS n'ont pas même ID et même couleur
    // il retournera undefined  
  if (
    availableItems == undefined &&
    colorOptions.value != "" &&			//si les consitions sont OK
    productQuantity.value > 0 &&
    productQuantity.value <= 100
  ) {
    product.quantity = productQuantity.value; //la quantité saisie est définie 
    cartValue.push(product);					 //dans le Ls
  } else {
    let newQuantity =
      parseInt(availableItems.quantity) +
      parseInt(productQuantity.value); //CUMUL Quantité si présent ID et color
    availableItems.quantity = newQuantity;
  }
  saveCart(cartValue);
  alert(
    `Le canapé ${name} ${colorOptions.value} a été ajouté en ${productQuantity.value} exemplaires à votre panier !`
  );
}

export default addToCart;