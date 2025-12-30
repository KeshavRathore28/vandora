/* =====================================================
   VANDORA – FINAL PERMANENT SCRIPT
   Cart + Luxury Fade-in (Stable & Professional)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART SYSTEM ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.addToCart = function (name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    saveCart();
    alert("Added to cart");
  };

  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  function renderCart() {
    if (!cartItemsEl || !totalEl) return;

    let total = 0;
    cartItemsEl.innerHTML = "";

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <span>${item.name} × ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));
  }

});
