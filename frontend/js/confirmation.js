//déclare une variable valant l'url de la page actuelle
let url = new URL(location.href);

//récupère l'id contenu dans l'url de la page actuelle
let orderId = url.searchParams.get('orderId');

// récupère l'élément p par son nom de classe
const confirmationDiv = document.querySelector('.confirmation p');
// crée un nouvel élément de balise p
const newPTag = document.createElement('span');

// définit le contenu textuel de la nouvelle balise p
newPTag.innerHTML = 'Merci pour votre achat!  <br/> <br/> ';

// ajoute la nouvelle balise p comme premier enfant de la div
confirmationDiv.insertBefore(newPTag, confirmationDiv.firstChild);

// ajout de l'orderId dans le message de validation //
const orderIdDOM = document.getElementById('orderId');
orderIdDOM.innerHTML = `${orderId}`;

////// vide le LocalStorage /////////
localStorage.clear();
