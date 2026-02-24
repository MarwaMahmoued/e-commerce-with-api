
window.onload = function() {
    const token = localStorage.getItem("userToken");

    if (!token) {
       
        alert("Please login first!");
        window.location.href = "login.html";
    }
};
async function fetchCategories() {
    try{
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const result = await response.json();
    const categoriesContainer = document.querySelector(".category");
    categoriesContainer.innerHTML = "";
    
    result.data.slice(0, 5).forEach(category => {
        categoriesContainer.innerHTML+=
`<div class="allcategory">

<img src="${category.image}">
<h3>${category.name}</h3>
</div>
` }); }
    catch(error){
        console.error('Error fetching categories:', error);
    }
}
fetchCategories();
async function fetchProducts() {
    try{
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
        const result = await response.json();
        console.log(result);
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";   
    result.data.slice(0, 6).forEach(product => {
        productsContainer.innerHTML+=
`<div class="product">
<img src="${product.imageCover}">
<h3>${product.title}</h3>
<p>${product.description}</p>
<span>Rating(<i class="fa-solid fa-star"></i> ${product.ratingsAverage} )</span>
<p class="price">Price $${product.price}</p>



</div>
` }); }
    catch(error){
        console.error('Error fetching products:', error);
    }
}
fetchProducts();
