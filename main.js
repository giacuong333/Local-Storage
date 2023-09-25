fetch("products.json")
          .then((response => {
                    return response.json() // get from json file and parse to javascript
          }))
          .then(data => {
                    localStorage.setItem("products", JSON.stringify(data))
                    if (!localStorage.getItem("cart"))
                              localStorage.setItem("cart", "[]")
          })

// SETTING GLOBAL VARIABLES SO WE CAN ACCESS THEM FROM INSIDE THE FUNCTIONS
let products = JSON.parse(localStorage.getItem("products"))
let cart = JSON.parse(localStorage.getItem("cart"))

// Add the product in the cart
function addItemToCart(productId) {
          let product = products.find(product => {
                    return product.id === productId
          })

          if (cart.length === 0) {
                    cart.push(product)
          } else {
                    let res = cart.find(element => element.id === productId)
                    if (res === undefined) {
                              cart.push(product)
                    }
          }

          localStorage.setItem("cart", JSON.stringify(cart))
}

// Remove a product from the cart
function removeItemFromCart(productId) {
          let temp = cart.filter(item => item.id != productId)
          localStorage.setItem("cart", JSON.stringify(temp))
}

// Update the product quantity
function updateQuantity(productId, quantity) {
          for (let product of cart) {
                    if (product.id === productId) {
                              product.quantity = quantity
                    }
          }
          localStorage.setItem("cart", JSON.stringify(cart))
}

// Get the cart's total sum
function getTotal() {
          let temp = cart.map(item => {
                    return parseFloat(item.price)
          })

          let sum = temp.reduce((accumulate, item) => {
                    return accumulate + item
          }, 0)

          console.log(sum)
}

getTotal()