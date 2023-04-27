

// setError
export const setError = (element, errorMessage) => {
  const parent = element.parentElement;
  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }
  parent.classList.add("error");
  element.innerText = errorMessage;
};

// setSuccess
export const setSuccess = (element) => {
  const parent = element.parentElement;
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
  parent.classList.add("success");
  element.innerText = "";
};


// setform error
export const formError = (element, errorMessage) => {
  const err = element.querySelector(".submitError");
  if (err) {
    err.style.display = "block";
    err.innerText = errorMessage;
  }
};

export const formSuccess = (element) => {
  const err = element.querySelector(".submitError");
  if (err) {
    err.style.display = "none";
    err.innerText = "";
  }
};



export const showMsg = (message) => {
  welcome.innerHTML = message;
  welcome.style.transform = "translateY(0)";
  setTimeout(() => {
    welcome.style.transform = "translateY(-100%)";
    clearTimeout();
  }, 2000);
};