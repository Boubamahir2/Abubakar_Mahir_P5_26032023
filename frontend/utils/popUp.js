// Ce code crée une fonction showPopup qui accepte deux arguments : message et color. Il crée un nouvel élément div avec les styles et le texte spécifiés, l'ajoute à l'élément body de la page et définit un délai de 2 secondes pour supprimer la fenêtre contextuelle de la page.

// Pour utiliser la fonction, vous pouvez ajouter un écouteur d'événement click à un bouton (ou à tout autre élément) et appeler la fonction createPopup avec le message et la couleur souhaités comme arguments. Dans cet exemple, le message est "Hello, World!" et la couleur est "vert", mais vous pouvez personnaliser ces valeurs selon vos besoins.

export default function showPopup(message, color) {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '10%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '30px 50px';
  popup.style.background = color;
  popup.style.color = 'white';
  popup.style.fontSize = '20px';
  popup.style.borderRadius = '5px';
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}


