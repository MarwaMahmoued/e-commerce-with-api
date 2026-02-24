
function checkDarkMode() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}
checkDarkMode(); 


function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}


function handleAuth() {
    const token = localStorage.getItem("userToken");
    const loginBtn = document.getElementById("nav-login-btn");
    const logoutBtn = document.getElementById("nav-logout-btn");

    if (token) {
        if (loginBtn) loginBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        if (loginBtn) loginBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    handleAuth();

   
    const themeBtn = document.getElementById("btn-dark"); 
    if (themeBtn) {
        themeBtn.addEventListener("click", toggleDarkMode);
    }

    const logoutBtn = document.getElementById("nav-logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("userToken"); 
            window.location.href = "login.html";  
        });
    }
});
async function updateCartCount() {
    const token = localStorage.getItem("userToken");
    const cartCountElement = document.getElementById("cart-count");

    if (token && cartCountElement) {
        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { 'token': token }
            });
            const result = await response.json();
            
            if (result.status === "success") {
                cartCountElement.innerText = result.numOfCartItems;
            }
        } catch (error) {
            console.log("Cart count error:", error);
        }
    }
}


document.addEventListener("DOMContentLoaded", updateCartCount);