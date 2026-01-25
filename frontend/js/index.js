document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita recargar la página
        login();
    });
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorP = document.getElementById("loginError");

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }
        return response.json();
    })
    .then(data => {
        // login correcto → ir al menú
        window.location.href = "/menu.html";
    })
    .catch(error => {
        errorP.innerText = "Usuario o contraseña incorrectos";
    });
}
