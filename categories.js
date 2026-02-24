async function fetchCategories() {
    try{
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
        const result = await response.json();
    const categoriesContainer = document.querySelector(".category");
    categoriesContainer.innerHTML = "";
    
    result.data.forEach(category => {
        categoriesContainer.innerHTML += `
<div class="allcategory" onclick="window.location.href='products.html?category=${category._id}'" style="cursor: pointer;">

 <img src="${category.image}">
<h3>${category.name}</h3>
</div>
` }); }
    catch(error){
        console.error('Error fetching categories:', error);
    }
}
fetchCategories();