async function fetchCart() {
    const token = localStorage.getItem("userToken");
    const container = document.getElementById("cart-container");

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { 'token': token }
        });
        const result = await response.json();

        if (result.status === "success" && result.numOfCartItems > 0) {
            displayCart(result.data);
        } else {
            container.innerHTML = `<div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty!</p>
                <a href="products.html">Start Shopping</a>
            </div>`;
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}

function displayCart(data) {
    const container = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    const totalCountElement = document.getElementById("total-count");

    totalPriceElement.innerText = `${data.totalCartPrice} EGP`;
    totalCountElement.innerText = data.products.length;

    let cartHtml = "";
    data.products.forEach(item => {
        cartHtml += `
            <div class="cart-item-card">
                <img src="${item.product.imageCover}" alt="${item.product.title}">
                <div class="item-details">
                    <h4>${item.product.title.split(" ").slice(0, 3).join(" ")}</h4>
                    <p class="brand">${item.product.brand.name}</p>
                    <p class="price">${item.price} EGP</p>
                    <button class="remove-btn" onclick="deleteItem('${item.product._id}')">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity('${item.product._id}', ${item.count + 1})">+</button>
                    <span>${item.count}</span>
                    <button onclick="updateQuantity('${item.product._id}', ${item.count - 1})" 
                            ${item.count <= 1 ? 'disabled' : ''}>-</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = cartHtml;
}


fetchCart();

async function updateQuantity(productId, newCount) {
    const token = localStorage.getItem("userToken");
    
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ "count": newCount })
        });

        const result = await response.json();

        if (result.status === "success") {
            
            displayCart(result.data);
           
            if (typeof updateCartCount === "function") updateCartCount();
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
}


async function deleteItem(productId) {
    const token = localStorage.getItem("userToken");

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'token': token
            }
        });

        const result = await response.json();

        if (result.status === "success") {
          
            displayCart(result.data);
            if (typeof updateCartCount === "function") updateCartCount();
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}