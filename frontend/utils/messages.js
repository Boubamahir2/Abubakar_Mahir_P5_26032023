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
