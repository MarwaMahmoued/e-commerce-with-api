const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const password = document.getElementById("userPassword").value;
    const confirmPassword = document.getElementById("rePassword").value;
    const errorElement = document.getElementById("error-message");

    if (password !== confirmPassword) {
        errorElement.textContent = "Passwords do not match!";
        errorElement.style.display = "block";
        return;
    } else {
        errorElement.style.display = "none";
    }

    if (password.length < 6) {
        errorElement.textContent = "Password must be at least 6 characters long.";
        errorElement.style.display = "block";
        return;
    }

    const userData = {
        name: username,
        email: email,
        password: password,
        rePassword: confirmPassword,
        phone: phone
    };

    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        } else {
            errorElement.textContent = data.message || "Registration failed. Please try again.";
            errorElement.style.display = "block";
        }
    } catch (error) {
        errorElement.textContent = "An error occurred. Please try again.";
        errorElement.style.display = "block";
    }
}); 
//////////////////////////////////////////
