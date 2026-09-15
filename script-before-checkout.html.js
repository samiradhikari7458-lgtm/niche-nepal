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

  alert(
    "Checkout will be connected in the next stage. Your cart is working successfully!"
  );
});

updateCart();
