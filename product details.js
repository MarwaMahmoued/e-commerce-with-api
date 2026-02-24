
const queryParams = new URLSearchParams(window.location.search);
const productId = queryParams.get('id');


async function fetchProductDetails() {
    if (!productId) {
        console.error("No ID found in URL!");
        return;
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        const result = await response.json();
        
        if (result.data) {
            displayProductDetails(result.data);
          
            fetchRelatedProducts(result.data.category._id);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}


function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    

    const priceAfterDiscount = (product.price * 0.8).toFixed(2);

    productDetailsContainer.innerHTML = `
        <div class="details-wrapper">
            <div class="images-section">
                <div class="main-image-container">
                    <img src="${product.imageCover}" id="mainImg" alt="${product.title}">
                </div>
                <div class="thumbnails-container">
                    ${product.images.map(img => `
                        <img src="${img}" class="thumb" onclick="document.getElementById('mainImg').src='${img}'">
                    `).join('')}
                </div>
            </div>

            <div class="info-section">
                <h1 class="product-title">${product.title}</h1>
                <p class="category-tag">${product.category.name} | <span class="brand-name">${product.brand.name}</span></p>
                <p class="description">${product.description}</p>
                
                <p class="stock">Stock: ${product.stock > 0 ? `<span class="count">${product.stock} available</span>` : `<span class="out-of-stock">Out of Stock</span>`}</p>
                <p class="brand">Brand: <span class="brand-name">${product.brand.name}</span></p>
                <p class="sold">Sold: <span class="sold-count">${product.sold}</span> items</p>
                
                <div class="price-rating">
                    <div class="price-box">
                        <span class="price" style="text-decoration: line-through; color: #888;">${product.price} EGP</span>
                        <span class="discount-price" style="display: block; font-size: 24px; color: #28a745; font-weight: bold;">${priceAfterDiscount} EGP</span>
                    </div>
                    <div class="rating">
                        <i class="fa-solid fa-star" style="color: #ffc107;"></i>
                        <i class="fa-solid fa-star" style="color: #ffc107;"></i>
                        <i class="fa-solid fa-star" style="color: #ffc107;"></i>
                        <i class="fa-solid fa-star" style="color: #ffc107;"></i>
                        <i class="fa-solid fa-star" style="color: #ffc107;"></i>
                        <span>(${product.ratingsAverage})</span>
                    </div>
                </div>

                <div class="purchase-controls">
                    <div class="quantity-box">
                        <label>Quantity:</label>
                        <input type="number" id="quantity" value="1" min="1">
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${product._id}')">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}


async function fetchRelatedProducts(categoryId) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}&limit=5`);
        const result = await response.json();
        displayRelatedProducts(result.data);
    } catch (error) {
        console.error("Error fetching related products:", error);
    }
}

function displayRelatedProducts(products) {
    const container = document.getElementById('related-products-container');
    let cartona = "";

    products.forEach(product => {
     
        if (product._id !== productId) {
            cartona += `
                <div class="related-card" onclick="window.location.href='product details.html?id=${product._id}'">
                    <img src="${product.imageCover}" alt="${product.title}">
                    <div class="related-info">
                        <h3>${product.title.split(" ").slice(0, 2).join(" ")}</h3>
                        <p>${product.price} EGP</p>
                    </div>
                </div>
            `;
        }
    });
    container.innerHTML = cartona;
}


async function addToCart(id) {
    const token = localStorage.getItem("userToken");
    
    if (!token) {
        alert("You must login first!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ "productId": id })
        });

        const result = await response.json();
        
        if (result.status === "success") {
         
            window.location.href = "cart.html";
        } else {
            alert("Something went wrong, please try again.");
        }
    } catch (error) {
        console.error("Cart Error:", error);
    }
}

fetchProductDetails();