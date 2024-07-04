// Função para registrar novo usuário
document.getElementById('signup-btn').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Usuario cadastrado com sucesso!');
        })
        .catch((error) => {
            alert('Erro ao cadastrar usuario: ' + error.message);
        });
});

// Função para logar usuário
document.getElementById('login-btn').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redireciona para a página do jogo
            window.location.href = 'jogo.html';
        })
        .catch((error) => {
            alert('Erro ao logar: ' + error.message);
        });
});
