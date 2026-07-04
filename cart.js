// =====================
// Add To Cart
// =====================

function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.name === name);

    if (item) {

        item.quantity++;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Product Added To Cart");

}


// =====================
// Load Cart
// =====================

function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");
    let total = document.getElementById("total");

    if (!cartItems || !total) return;

    cartItems.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your Cart is Empty</h3>";
        total.innerText = "0";
        return;

    }

    cart.forEach((item, index) => {

        let qty = item.quantity || 1;
        let subTotal = item.price * qty;

        grandTotal += subTotal;

        cartItems.innerHTML += `

        <div class="item">

            <h3>${item.name}</h3>

            <p>Price : ৳${item.price}</p>

            <p>Quantity : ${qty}</p>

            <p><b>Total : ৳${subTotal}</b></p>

            <button onclick="changeQty(${index},-1)">➖</button>

            <button onclick="changeQty(${index},1)">➕</button>

            <button class="remove" onclick="removeItem(${index})">
            Remove
            </button>

        </div>

        `;

    });

    total.innerText = grandTotal;

}


// =====================
// Change Quantity
// =====================

function changeQty(index, value) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}


// =====================
// Remove Item
// =====================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

window.onload = loadCart;