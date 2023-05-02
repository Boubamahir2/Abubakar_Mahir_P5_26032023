// Ce code crée une fonction showPopup qui accepte deux arguments : message et color. Il crée un nouvel élément div avec les styles et le texte spécifiés, l'ajoute à l'élément body de la page et définit un délai de 2 secondes pour supprimer la fenêtre contextuelle de la page.

// Pour utiliser la fonction, vous pouvez ajouter un écouteur d'événement click à un bouton (ou à tout autre élément) et appeler la fonction showPopup avec le message et la couleur souhaités comme arguments.

export default function showPopup(message, color) {
  const windowWidth = window.innerWidth;
  let padding = '30px 50px';
  let fontSize = '20px';
  let width = '';
  let left = '50%';
  let top = '10%';
  const popup = document.createElement('div');
  if (windowWidth < 576) {
    top = '5%';
    padding = '20px';
    width = '100%';
    fontSize = '15px';
    popup.style.textAlign = 'center';
  }
  popup.style.position = 'fixed';
  popup.style.top = `${top}`;
  popup.style.left = `${left}`;
  popup.style.width = `${width}`;
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = `${padding}`;
  popup.style.background = color;
  popup.style.color = 'white';
  popup.style.fontSize = `${fontSize} `;
  popup.style.fontWeight = '600';
  popup.style.borderRadius = '5px';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// setError
export const setError = (element, errorMessage) => {
  const parent = element.parentElement;
  if (parent.classList.contains('success')) {
    parent.classList.remove('success');
  }
  parent.classList.add('error');
  element.innerText = errorMessage;
};

// setSuccess
export const setSuccess = (element) => {
  const parent = element.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
  element.innerText = '';
};
