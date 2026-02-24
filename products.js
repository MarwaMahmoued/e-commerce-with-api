
async function fetchFilteredButtin() {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const result = await response.json();
        
        const filtersContainer = document.getElementById('filters-container');
        
       
        filtersContainer.innerHTML = `<button class="filter-btn active" onclick="fetchProducts(1, '')">All</button>`;
        
        result.data.forEach((category) => {
            filtersContainer.innerHTML += `
                <button class="filter-btn" onclick="fetchProducts(1, '${category._id}')"> ${category.name}</button>
            `;
        });
    } catch (error) {
        console.error('Error fetching filters:', error);
    }
}


async function fetchProducts(page = 1, categoryId = "") {
    try {
        let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=12`;
        
      
        if (categoryId) {
            url += `&category[in]=${categoryId}`;
        }

        const response = await fetch(url);
        const result = await response.json();
        
        const productsContainer = document.querySelector(".products");
        productsContainer.innerHTML = "";   

        result.data.forEach(product => {
            productsContainer.innerHTML += `
             <div class="product" onclick="window.location.href='product details.html?id=${product._id}'" style="cursor: pointer;">
                    <img src="${product.imageCover}">
                    <h3>${product.title.split(" ").slice(0, 3).join(" ")}</h3>
                    <span>Rating(<i class="fa-solid fa-star"></i> ${product.ratingsAverage})</span>
                    <p class="price">Price $${product.price}</p>
                </div>`;
        });

     
        setupPagination(result.metadata, categoryId);

    } catch(error) {
        console.error('Error fetching products:', error);
    }
}


function setupPagination(metadata, categoryId = "") {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = "";

   
    if (metadata.currentPage > 1) {
        paginationContainer.innerHTML += `
            <button class="page-btn nav-btn" onclick="goToPage(${metadata.currentPage - 1}, '${categoryId}')">Prev</button>
        `;
    }

  
    for (let i = 1; i <= metadata.numberOfPages; i++) {
        paginationContainer.innerHTML += `
            <button class="page-btn ${i === metadata.currentPage ? 'active' : ''}" 
                    onclick="goToPage(${i}, '${categoryId}')">${i}</button>
        `;
    }

 
    if (metadata.currentPage < metadata.numberOfPages) {
        paginationContainer.innerHTML += `
            <button class="page-btn nav-btn" onclick="goToPage(${metadata.currentPage + 1}, '${categoryId}')">Next</button>
        `;
    }
}

function goToPage(page, categoryId = "") {
    fetchProducts(page, categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


fetchFilteredButtin();

const urlParams = new URLSearchParams(window.location.search);
const categoryIdFromUrl = urlParams.get('category'); 

fetchFilteredButtin();

if (categoryIdFromUrl) {

    fetchProducts(1, categoryIdFromUrl);
} else {
    fetchProducts(1);
}
const productsContainer = document.querySelector(".products");

