// Ce code génère et ajoute un élément de style à un élément donné, en fonction de la valeur de cartValue et du window.innerWidth actuel. L'élément de style contient des styles CSS pour une icône de panier affichée dans le menu de navigation
import { getStorageItem } from '../../js/utils/constants.js';
function addLastItemMarker(content) {
  const element = document.querySelector('.menu');
  let cartValue = getStorageItem('cartValue');
  const navItem = document.querySelector('.menu a:last-child');
  navItem.style.position = 'relative';

  // Cette ligne obtient la largeur actuelle de la fenêtre du navigateur et l'affecte à la variable windowWidth
  const windowWidth = window.innerWidth;
  let height = '1.5rem';
  let width = '1.5rem';
  let top = '30%';
  let fontSize = '14px';

  const style = document.createElement('style');
  // Cette ligne vérifie s'il y a des articles dans le panier. si c'est le cas, affichez l'icône
  if (cartValue.length > 0) {
    // Cette ligne vérifie si la largeur de la fenêtre est inférieure à 576 pixels (c'est-à-dire le point d'arrêt pour les petits écrans).
    if (windowWidth < 576) {
      // Set new values for height, width, and top
      height = '1.1rem';
      width = '1.1rem';
      fontSize = '10px';
    }
    style.innerHTML = `ul a:last-child li::before {
    content: "${content}";
    background: var(--main-color);
    height: ${height};
    width: ${width};
    font-size: ${fontSize};
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: ${top};
    right: -15px;
  }`;
  }

  element.appendChild(style);
}

export { addLastItemMarker };
