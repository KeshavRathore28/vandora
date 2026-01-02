/* =====================================================
   VANDORA – FINAL SCRIPT (PRO + LUXURY + STEP 5)
   Cart + Image + Badge + Checkout + Payment + Fade-in
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART DATA ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  /* ================= ADD TO CART ================= */
  // FORMAT:
  // addToCart("Product Name", price, "image-url")

  window.addToCart = function (name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }

    saveCart();
    alert("Product added to cart");
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

  /* ================= CART PAGE RENDER ================= */

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
        <div class="cart-left" style="display:flex; gap:15px; align-items:center;">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <strong>${item.name}</strong><br>
            <small>Qty: ${item.qty}</small>
          </div>
        </div>

        <div class="cart-right">
          ₹${item.price * item.qty}
          <button onclick="removeItem(${index})">✕</button>
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

  renderCart();

  /* ================= PLACE ORDER ================= */

  window.placeOrder = function () {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = "checkout.html";
  };

  /* ================= CHECKOUT FORM SUBMIT (STEP 5) ================= */

  const checkoutForm = document.getElementById("checkout-form");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
      ).value;

      const orderData = {
        customer: {
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          pincode: document.getElementById("pincode").value,
          landmark: document.getElementById("landmark").value
        },
        payment: paymentMethod,
        items: cart,
        orderDate: new Date().toLocaleString()
      };

      localStorage.setItem("orderDetails", JSON.stringify(orderData));

      cart = [];
      saveCart();

      window.location.href = "thankyou.html";
    });
  }

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
