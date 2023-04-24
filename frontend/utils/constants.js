// products url string for retrieving all products.
const allProductsUrl = 'http://localhost:3000/api/products'

// This function takes in a price value and returns a formatted currency string in Euro. It uses the Intl.NumberFormat object to format the number with a currency style and a EURO currency code. It also divides the price by 100 and uses toFixed(2) to ensure that the price has two decimal places.
const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2))
  return formattedPrice
}

// The code defines a function called getElement that takes in a single argument called selection. The function uses the document.querySelector method to select an element from the DOM based on the selection parameter. If an element is found, the function returns it. However, if no element is found, the function throws a new Error object with a message that indicates the selector that was passed in did not select any elements.
const getElement = (selection) => {
  const element = document.querySelector(selection)
  if (element) return element
  throw new Error(`Please check "${selection}" selector, no such element exist`)
}

// This function takes in an item key and gets the corresponding value from localStorage. If the value exists, it is parsed as a JSON object and returned. If it does not exist, an empty array is returned.
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item)
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item))
  } else {
    storageItem = []
  }
  return storageItem
}

// This function takes in a name key and an item value and sets them as a JSON string in localStorage. It uses JSON.stringify() to convert the item value into a JSON string before setting it in localStorage.
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export {
  allProductsUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
}
