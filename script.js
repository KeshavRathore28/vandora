let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

if (document.getElementById("cart-items")) {
  let total = 0;
  document.getElementById("cart-items").innerHTML =
    cart.map(item => {
      total += item.price;
      return `<p>${item.name} - ₹${item.price}</p>`;
    }).join("");
  document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
}
