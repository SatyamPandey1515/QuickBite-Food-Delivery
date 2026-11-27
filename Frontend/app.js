
const API_URL = "http://127.0.0.1:8000";

const foods = [
    { id: 1, name: "Veg Burger", price: 99, emoji: "🍔" },
    { id: 2, name: "Pizza", price: 199, emoji: "🍕" },
    { id: 3, name: "Paneer Roll", price: 129, emoji: "🌯" },
    { id: 4, name: "French Fries", price: 79, emoji: "🍟" },
    { id: 5, name: "Cold Coffee", price: 89, emoji: "☕" }
];

let cart = [];

function displayFoods() {
    const foodList = document.getElementById("food-list");

    foodList.innerHTML = foods.map(food => `
        <div class="food-card">
            <h2>${food.emoji}</h2>
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>
            <button onclick="addToCart(${food.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const food = foods.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    displayCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="food-card">
                <h3>${item.emoji} ${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    totalElement.textContent = `Total: ₹${total}`;
}


async function placeOrder() {
    const message = document.getElementById("message");

    const customerName =
        document.getElementById("customer-name").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    if (cart.length === 0) {
        message.textContent = "Please add food to your cart!";
        return;
    }

    if (!customerName || !address) {
        message.textContent = "Please enter your name and address!";
        return;
    }

    const orderData = {
        customer_name: customerName,
        address: address,
        items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }))
    };

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.detail || result.error || "Order failed");
        }

        message.textContent =
            `Order successful! Order ID: ${result.order_id}. Total: ₹${result.total}`;

        cart = [];
        displayCart();

    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
}



displayFoods();
displayCart();
