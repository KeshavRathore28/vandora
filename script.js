/* =====================================================
   VANDORA – FINAL SCRIPT (PRO LEVEL)
   Cart + Image + Badge + Fade-in
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART DATA ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  /* ================= ADD TO CART ================= */
  // CALL FORMAT:
  // addToCart("Product Name", price, "image-url")

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
    alert("Added to cart");
  };

  /* ================= CART COUNT BADGE ================= */

  function updateCartCount() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = totalQty;
    badge.style.display = totalQty > 0 ? "flex" : "none";
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
        <div style="display:flex; align-items:center; gap:15px;">
          <img src="${item.image}" alt="${item.name}"
               style="width:60px; height:60px; object-fit:cover; border-radius:8px;">
          <div>
            <strong>${item.name}</strong><br>
            <small>Qty: ${item.qty}</small>
          </div>
        </div>

        <div>
          ₹${item.price * item.qty}
          <button onclick="removeItem(${index})"
            style="margin-left:15px; cursor:pointer;">✕</button>
        </div>
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
      (entries) => {
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
