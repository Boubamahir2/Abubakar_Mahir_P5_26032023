const displayAll = document.getElementById("items"); //je définis une variable dans la zone concernée par l'injection du HTML dynamique

const display = (products, element, filters) => {
  element.innerHTML = products.map((product) => {
    			//boucle pour importer chaque champ du JSON et lui attribuer une variable
    return `<a href="./product.html?id=${product.id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`; //les photos et infos des canapés sont insérées dynamiquement dans l'HTML de la page d'accueil

  }).join('');
}