import {getStorageItem} from '../../utils/constants.js';

let cartValue = getStorageItem('cartValue');
let amount = getStorageItem('amount');

function addLastItemMarker(content) {
  const element = document.querySelector('.menu');
  const navItem = document.querySelector('.menu a:last-child');
  navItem.style.position = 'relative';
  
  const style = document.createElement('style');
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

  element.appendChild(style);
}

 if(cartValue.length > 0) {
    addLastItemMarker(amount);
  }

function addMarkSS(content) {
  const style = document.createElement('style');
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

  document.head.appendChild(style);
}

export {
  addLastItemMarker
}