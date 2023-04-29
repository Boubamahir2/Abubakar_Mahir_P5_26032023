// products url string for retrieving all products.
const allProductsUrl = 'http://localhost:3000/api/products'

// Le code définit une fonction appelée getElement qui prend un seul argument appelé selection. La fonction utilise la méthode document.querySelector pour sélectionner un élément du DOM en fonction du paramètre de sélection. Si un élément est trouvé, la fonction le renvoie. Cependant, si aucun élément n'est trouvé, la fonction lance un nouvel objet Error avec un message indiquant que le sélecteur qui a été transmis n'a sélectionné aucun élément.
const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}


// Cette fonction prend une clé d'élément et obtient la valeur correspondante de localStorage. Si la valeur existe, elle est analysée en tant qu'objet JSON et renvoyée. S'il n'existe pas, un tableau vide est retourné.
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item)
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item))
  } else {
    storageItem = []
  }
  return storageItem
}

// Cette fonction prend une clé de nom et une valeur d'élément et les définit comme une chaîne JSON dans localStorage. Il utilise JSON.stringify() pour convertir la valeur de l'élément en une chaîne JSON avant de la définir dans localStorage.
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

 const removeStorageItem= (item) => {
  localStorage.removeItem("item");
}

const messageCartVide = () =>{
	const cartTitle = document.querySelector(
		"#limitedWidthBlock div.cartAndFormContainer > h1"
	); //emplacement du message
	const emptyCartMessage = "Oups ! Votre panier est vide !";
	cartTitle.textContent = emptyCartMessage;
	cartTitle.style.fontSize = "40px";

	document.querySelector(".cart__order").style.display = "none"; //masque le formulaire si panier vide
	document.querySelector(".cart__price").style.display = "none"; // masque le prix total si panier vide
};

let cartValue = getStorageItem('cartValue');

function increaseAmount(id) {
  let newAmount;
  cartValue = cartValue.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.quantity + 1;
      cartItem = { ...cartItem, quantity: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cartValue = cartValue.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.quantity - 1;
      cartItem = { ...cartItem, quantity: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

// calculer les quatité de touts les products
function displayCartItemCount() {
  const amount = cartValue.reduce((total, cartItem) => {
    return (total += cartItem.quantity);
  }, 0);
  if(amount){
     setStorageItem('amount', amount);
  }
}

export {
  allProductsUrl,
  getElement,
  increaseAmount,
  getStorageItem,
  setStorageItem,
  decreaseAmount,
  messageCartVide,
  removeStorageItem,
  displayCartItemCount
}
