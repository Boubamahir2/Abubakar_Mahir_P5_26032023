//déclare une variable valant l'url de la page actuelle
let url = new URL(location.href);

//récupère l'id contenu dans l'url de la page actuelle
let orderId = url.searchParams.get("orderId"); 