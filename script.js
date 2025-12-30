/* =====================================================
   VANDORA – PERMANENT SAFE SCRIPT
   Cart + Luxury Fade-in (Merged & Bug-Free)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= CART SYSTEM ================= */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  window.addToCart = function (name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const cartItemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (cartItemsEl && totalEl) {
    let total = 0;

    cartItemsEl.innerHTML = cart
      .map((item) => {
        total += item.price;
        return `<p>${item.name} - ₹${item.price}</p>`;
      })
      .join("");

    totalEl.innerText = "Total: ₹" + total;
  }

  window.placeOrder = function () {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    location.reload();
  };

  /* ================= LUXURY FADE-IN ANIMATION ================= */

  const fadeElements = document.querySelectorAll(".fade-in, .fade-in-slow");

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }

});
