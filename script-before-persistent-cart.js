const cart = [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");

function formatPrice(price) {
  return `¥${price.toLocaleString("en-US")}`;
}

function updateCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';

    cartTotal.textContent = "¥0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)} each</p>
        <p><strong>${formatPrice(itemTotal)}</strong></p>
      </div>

      <div class="quantity-controls">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = formatPrice(total);
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
  alert(`${name} added to your cart.`);
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.querySelectorAll(".add-cart-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    addToCart(name, price);
  });
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add a product first.");
    return;
  }

  const checkoutSection = document.getElementById("checkout-section");

  if (checkoutSection) {
    checkoutSection.scrollIntoView({
      behavior: "smooth"
    });
    return;
  }

  const section = document.createElement("section");
  section.id = "checkout-section";
  section.className = "checkout-section";

  section.innerHTML = `
    <div class="section-heading">
      <p class="section-label">CHECKOUT</p>
      <h2>Complete Your Order</h2>
      <p>This is a demonstration checkout form. Online payment will be connected later.</p>
    </div>

    <form id="checkout-form" class="checkout-form">
      <label for="customer-name">Full Name</label>
      <input type="text" id="customer-name" required>

      <label for="customer-email">Email Address</label>
      <input type="email" id="customer-email" required>

      <label for="customer-country">Delivery Country</label>
      <select id="customer-country" required>
        <option value="">Select country</option>
        <option value="Nepal">Nepal</option>
        <option value="Japan">Japan</option>
      </select>

      <label for="customer-address">Delivery Address</label>
      <textarea id="customer-address" rows="4" required></textarea>

      <button type="submit" class="checkout-btn">
        Submit Demo Order
      </button>
    </form>
  `;

  document.body.appendChild(section);

  section.scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();

    alert(
      "Demo order submitted successfully. Payment and real order processing will be added later."
    );
  });
});

updateCart();
