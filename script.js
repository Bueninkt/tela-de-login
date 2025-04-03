document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const senhaInput = document.queryelector("input[type='password']");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    errorMessage.style.marginTop = "5px";
    loginForm.appendChild(errorMessage);

    let validEmail = "";
    let validSenha = "";

    async function fetchUserData() {
        try {
            console.log("Buscando dados do usuário...");
            const response = await fetch("https://back-spider.vercel.app/login");
            const data = await response.json();
            if (response.ok) {
                validEmail = data.email;
                validSenha = data.senha;
                console.log("Dados recebidos da API:", data);
            } else {
                console.error("Erro na resposta da API:", data);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    }

    fetchUserData();

    emailInput.addEventListener("input", () => {
        console.log("Email digitado:", emailInput.value);
        if (emailInput.value !== validEmail) {
            errorMessage.textContent = "Usuário não cadastrado";
        } else {
            errorMessage.textContent = "";
        }
    });

    senhaInput.addEventListener("input", () => {
        console.log("Senha digitada:", senhaInput.value);
        if (senhaInput.value !== validSenha) {
            errorMessage.textContent = "Senha incorreta";
        } else {
            errorMessage.textContent = "";
        }
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = emailInput.value;
        const senha = senhaInput.value;
        console.log("Tentativa de login com:", { email, senha });
        
        if (!email || !senha) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (email !== validEmail || senha !== validSenha) {
            console.warn("Credenciais inválidas");
            errorMessage.textContent = "Email ou senha inválidos. Tente novamente.";
            return;
        }
        
        alert("Login realizado com sucesso!");
        console.log("Redirecionando para a página home...");
        setTimeout(() => {
            window.location.href = "";
        }, 1000);
    });
});
