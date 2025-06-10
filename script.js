// script.js
//complex
var path = window.location.pathname;
var page = path.split("/").pop();
// Load products and display them
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  let productsToShow = [];

  if (page === "index.html") {
    productsToShow = products.slice(0, 4); // Show only 4 on homepage
  } else  {
    productsToShow = products; // Show all products on product.html
  }

  productsToShow.forEach(product => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(item);
  });
});


// Add item to cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // <-- Update cart icon count
  // alert(`${product.name} added to cart`);
}

// Update the cart count on the cart icon
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Call on page load to show cart count if cart already exists
document.addEventListener("DOMContentLoaded", updateCartCount);

