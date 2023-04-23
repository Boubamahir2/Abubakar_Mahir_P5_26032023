let url = new URL(location.href); //déclare une variable valant l'url de la page actuelle
let productId = url.searchParams.get("id"); //récupère l'id contenu dans l'url de la page actuelle


const productImg = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");			// emplacements des différentes zones
const productDescription = document.querySelector("#description");	// d'insertion des variables dynamiques
const colorOptions = document.querySelector("#colors");
const productQuantity = document.querySelector("#quantity");

