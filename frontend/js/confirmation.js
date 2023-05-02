//déclare une variable valant l'url de la page actuelle
let url = new URL(location.href);

//récupère l'id contenu dans l'url de la page actuelle
let orderId = url.searchParams.get('orderId');

// ajout de l'orderId dans le message de validation //
const orderIdDOM = document.getElementById('orderId');
orderIdDOM.innerHTML = `${orderId}`;

////// vide le LocalStorage /////////
localStorage.clear();
