import {

  getElement,
  increaseAmount,
  getStorageItem,
  setStorageItem,
  decreaseAmount,
  messageCartVide
} from '../../utils/constants.js';

// meassage cart vide
import addToCartDOM from './addToCart.js';
import {addLastItemMarker} from './notification.js'

const cartItemsDOM = getElement("#cart__items");
const cartItemCountDOM = getElement("#totalQuantity");
const cartTotalDOM = getElement('#totalPrice');
// console.log(cartItemCountDOM,cartItemsDOM,cartTotalDOM);

//il faut daboarb recu recupere nos panier de la local storage
let cartValue = getStorageItem('cartValue');
// console.log(cartValue,'cartValue')

// recuperer tout les donnes paraport au donnée dans localhost
const fetchProduct = async () => {
let cartArray = []; // tableau vide qui va contenir les objets créés en suite

if (cartValue !== null) {
  for (let x = 0; x < cartValue.length; x++) {
    console.log((cartValue[x].id))
    await fetch("http://localhost:3000/api/products/" + cartValue[x].id)
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
		}).catch((err) => console.log(err));
  }
}
console.log('CartArray' , cartArray)
return cartArray;
}


// une fonction poour afichage des continus de panier /////////
const displayCart = async ()=>{
  const products = await fetchProduct();
  console.log(products);

  if (cartValue !== null && cartValue.length !== 0) {
		products.forEach((product,index) => { // injection dynamique des produits dans le DOM
		addToCartDOM(product)
		});
	} else {
		return messageCartVide() ; //si Ls vide, affichage du message Panier Vide
	}
}

////////Fonction addition quantités et Prix pour Total////////////////
function displayCartTotal() {
  let total = cartValue.reduce((total, cartItem) => {
    
    console.log(cartItem, 'cartItem')
    if (
				cartItem.quantity <= 0 ||
				cartItem.quantity > 100
			) {
				alert("Veuillez sélectionner une quantité correcte, SVP entre 1 - 100");
			}else{

        return (total += cartItem.price * cartItem.quantity);
      }
 
  }, 0);
  cartTotalDOM.textContent = total;
  // console.log(total, 'total')
  
}

////////Fonction addition quantités  Total dans le panier////////////////
export function displayCartItemCount() {
  const amount = cartValue.reduce((total, cartItem) => {
    if (
				cartItem.quantity <= 0 ||
				cartItem.quantity > 100
			) {
				alert("Veuillez sélectionner une quantité correcte, SVP entre 1 - 100");
			}else{

        return total += parseInt(cartItem.quantity);
      }
  }, 0);
  cartItemCountDOM.textContent = amount;
  addLastItemMarker(amount)
  // console.log(amount, 'amount')
}

//Fonction permettant de modifier le nombre d'éléments dans le panier
async function modifyQTY(){
   await fetchProduct();
   const quantityInputs = document.querySelectorAll(".itemQuantity"); 
   for (let input of quantityInputs) {
    // console.log(input,'input')
     //écoute du changement de qty
    input.addEventListener("change", function () {
      //On récupère l'ID de la donnée modifiée
			let itemID = this.closest(".cart__item").dataset.id;
      //On récupère la couleur de la donnée modifiée
			let itemColor = this.closest(".cart__item").dataset.color;

      //On filtre le panier avec l'iD dune article modifié
			let findId = cartValue.filter((element) => element.id === itemID);
      // /On filtre le panier avec le coleur dune article modifié
			let findByColor = findId.find((element) => element.color === itemColor);
      // si la couleur et l'id sont trouvés, on modifie la quantité en fonction
      if (this.value > 0) {
        if(this.value > 100){
          alert("Veuillez sélectionner une quantité correcte, SVP ");
          return
            }else{
              findByColor.quantity = parseInt(this.value);
                  // console.log(parseInt(this.value), 'this value')
                   // on met à jour le Ls
              setStorageItem('cartValue', cartValue);
                        // display amount of cart items
              displayCartItemCount()
             // display total
              displayCartTotal();
            }

			}
    })
   }
}


////////Supprimer un item avec le bouton supprimer////////
async function removeItem() {
  await fetchProduct();  
  const deleteItems = document.querySelectorAll('.deleteItem');
  deleteItems.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', function (e) {
      //On récupère l'ID de la donnée concernée
			const dataID = e.target.closest("article").getAttribute("data-id");
			//On récupère la couleur de la donnée concernée
			const dataColor = e.target.closest("article").getAttribute("data-color");

      // on cherche l'élément du Ls concerné 
      const searchItem = cartValue.find(  
				(item) => item.id == dataID && item.color == dataColor
			);

       // et on filtre le Ls avec l'élément comme modèle
      cartValue = cartValue.filter( 
				(item) => item !== searchItem
			);
        // on met à jour le Ls
      setStorageItem('cartValue', cartValue);
      // on supprime l'élément du DOM

      const article = e.target.closest(".cart__item");
      article.remove();
      if (cartValue !== null && cartValue.length === 0) {
		localStorage.clear();       //////// si le Ls est vide, on le clear et on affiche le message 
		return messageCartVide();
	}
      // display amount of cart items
    displayCartItemCount()
   // display total
    displayCartTotal();
    })
  });
 
}

// parent function for calling all the methods 
const init = async() => {
   // add all cart items to the dom
displayCart();         ////// affichage du DOM ( avec rappel du fetchApi //////

// display amount of cart items
displayCartItemCount()
 // display total
  displayCartTotal();
  // setupCartFunctionality();
  removeItem()
  modifyQTY()
}


// intialise all the functions
init();

