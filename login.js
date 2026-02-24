const loginForm = document.getElementById("login-form");
const errorElement = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("userEmail").value;
    const password = document.getElementById("userPassword").value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok) {
        
            localStorage.setItem("userToken", data.token);
            
            alert("Welcome back!");
            window.location.href = "index.html"; 
        } else {
            errorElement.textContent = data.message;
            errorElement.style.display = "block";
        }
    } catch (error) {
        errorElement.textContent = "Error connecting to server.";
        errorElement.style.display = "block";
    }
});