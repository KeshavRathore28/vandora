/* =====================================================
   VANDORA – FINAL SCRIPT
   Cart with Image + Quantity + Cart Count + Fade-in
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART DATA ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  /* ================= ADD TO CART ================= */
  // image = image url
  window.addToCart = function (name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        name,
        price,
        image,
        qty: 1
      });
    }

    saveCart();
    alert("Added to cart");
  };

  /* ================= CART COUNT (NAVBAR) ================= */
  function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    let count = 0;
    cart.forEach(item => count += item.qty);
    countEl.innerText = count;
  }

  updateCartCount();

  /* ================= RENDER CART PAGE ================= */

  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  function renderCart() {
    if (!cartItemsEl || !totalEl) return;

    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <span>Qty: ${item.qty}</span>
        </div>
        <div class="cart-price">₹${item.price * item.qty}</div>
        <button onclick="removeItem(${index})">✕</button>
      `;

      cartItemsEl.appendChild(div);
    });

    totalEl.innerText = "Total: ₹" + total;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  };

  window.placeOrder = function () {
    alert("Order placed successfully!");
    cart = [];
    saveCart();
    renderCart();
  };

  renderCart();

  /* ================= LUXURY FADE-IN ================= */

  const fadeElements = document.querySelectorAll(".fade-in, .fade-in-slow");

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach(el => observer.observe(el));
  }

});
