import {getStorageItem} from '../../utils/constants.js';


function addLastItemMarker(content) {
  const element = document.querySelector('.menu');
  let cartValue = getStorageItem('cartValue');
  const navItem = document.querySelector('.menu a:last-child');
  navItem.style.position = 'relative';
  
  const style = document.createElement('style');
  if(cartValue.length > 0) {
  style.innerHTML = `ul a:last-child li::before {
    content: "${content}";
    background: var(--main-color);
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: 30%;
    right: -15px;
  }`;
}

  element.appendChild(style);
}

 
export {
  addLastItemMarker
}