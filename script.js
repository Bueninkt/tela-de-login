const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const errorMessage = document.getElementById("errorMessage");

async function loginUser(email, senha) {
    try {
        const response = await fetch("https://back-spider.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            alert("Login realizado com sucesso!");
            window.location.href = "https://bueninkt.github.io/tela-home/"; // Substituir pela URL correta
        } else {
            errorMessage.textContent = "Email ou senha inválidos. Tente novamente.";
        }
    } catch (error) {
        console.error("Erro ao tentar fazer login:", error);
        errorMessage.textContent = "Erro ao conectar ao servidor. Tente novamente mais tarde.";
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
        errorMessage.textContent = "Por favor, preencha todos os campos!";
        return;
    }

    loginUser(email, senha);
});
