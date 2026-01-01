/* =====================================================
   VANDORA – FINAL PERMANENT SCRIPT (FULL)
   Cart + Quantity + Image + Badge + Fade-in
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART SYSTEM ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* -------- CART COUNT BADGE -------- */
  function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    let count = 0;
    cart.forEach(item => count += item.qty);
    countEl.innerText = count;
  }

  /* -------- ADD TO CART -------- */
  window.addToCart = function (name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        qty: 1
      });
    }

    saveCart();
    updateCartCount();
    alert("Added to cart");
  };

  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  /* -------- RENDER CART -------- */
  function renderCart() {
    if (!cartItemsEl || !totalEl) return;

    let total = 0;
    cartItemsEl.innerHTML = "";

    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img">

        <div class="cart-info">
          <p class="cart-name">${item.name}</p>

          <div class="qty-box">
            <button onclick="decreaseQty(${index})">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>

        <div class="cart-right">
          <span class="cart-price">₹${item.price * item.qty}</span>
          <button class="remove-btn" onclick="removeItem(${index})">✕</button>
        </div>
      `;

      cartItemsEl.appendChild(div);
    });

    totalEl.innerText = "Total: ₹" + total;
  }

  /* -------- QUANTITY CONTROLS -------- */
  window.increaseQty = function (index) {
    cart[index].qty += 1;
    saveCart();
    renderCart();
    updateCartCount();
  };

  window.decreaseQty = function (index) {
    cart[index].qty -= 1;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
    updateCartCount();
  };

  /* -------- REMOVE ITEM -------- */
  window.removeItem = function (index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
  };

  /* -------- PLACE ORDER -------- */
  window.placeOrder = function () {
    alert("Order placed successfully!");
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
  };

  renderCart();
  updateCartCount();

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
