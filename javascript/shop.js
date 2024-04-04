import { cartPick, addToCart } from "./cart.js";
import { products } from "./products.js";
updateCartQuantity();
let productHTML = '';

products.forEach((product) => {
  productHTML += `
  <div class="product-content">
    <div class="check-cart-container">
      <img class="check-cart" src="img/check.png" alt="">
    </div>
    <img class="product-img" src="${product.image}">
      <div class="product-details">
        <p class="product-name">${product.name}</p>
        <p class="product-price">₱${product.price}</p>
        </div>
      <div class="add-to-cart">
        <button class="add-to-cart-button check-button" data-product-id="${product.id}">Add to Cart</button>
    </div>  
  </div>
  `
});
document.querySelector('.product-container').innerHTML = productHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cartPick.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  console.log(cartQuantity);
  console.log(cartPick);
};

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId)
    updateCartQuantity()

    const checkContainer = button.closest('.product-content').querySelector('.check-cart-container');
    checkContainer.style.display = 'block';
    
    const timeoutId = button.dataset.timeoutId;
    if (timeoutId) {
      clearTimeout(parseInt(timeoutId));
    }
    const newTimeoutId = setTimeout(() => {
      checkContainer.style.display = 'none';
    }, 1000);
    button.dataset.timeoutId = newTimeoutId;
  }); 
});



