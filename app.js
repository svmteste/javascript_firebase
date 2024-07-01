// Substitua as configurações do seu projeto Firebase abaixo
const firebaseConfig = {
  apiKey: "SuaApiKey",
  authDomain: "SeuDominio.firebaseapp.com",
  projectId: "SeuProjetoId",
  storageBucket: "SeuBucket.appspot.com",
  messagingSenderId: "SeuSenderId",
  appId: "SuaAppId",
  measurementId: "SuaMeasurementId"
 };
 
// Inicializa o Firebase com as configurações fornecidas
firebase.initializeApp(firebaseConfig);

// Inicializa as variáveis auth e database para facilitar o acesso aos serviços do Firebase
const auth = firebase.auth();
const database = firebase.database();

// Função de registro do usuário
function register() {
// Obtém os valores dos campos de email e senha do formulário
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Valida se o email e a senha são aceitáveis
if (validate_email(email) && validate_password(password)) {
  // Cria um novo usuário no Firebase com o email e senha fornecidos
  auth.createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Obtém o objeto do usuário recém-criado
      const user = userCredential.user;

      // Cria um objeto com dados do usuário
      const user_data = {
        email: email,
        registration_time: new Date().toString(),
      };

      // Adiciona os dados do usuário ao banco de dados do Firebase
      database.ref('users/' + user.uid).set(user_data);

      // Exibe uma mensagem de sucesso
      displayFeedback('Usuário criado!');
    })
    .catch(function(error) {
      // Exibe uma mensagem de erro
      displayFeedback(error.message, true);
    });
} else {
  // Exibe uma mensagem de erro se os dados do formulário são inválidos
  displayFeedback('Email ou senha não encontrados', true);
}
}

// Função de login do usuário
function login() {
// Obtém os valores dos campos de email e senha do formulário
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Valida se o email e a senha são aceitáveis
if (validate_email(email) && validate_password(password)) {
  // Autentica o usuário no Firebase com o email e senha fornecidos
  auth.signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Obtém o objeto do usuário autenticado
      const user = userCredential.user;

      // Atualiza o último horário de login no banco de dados do Firebase
      database.ref('users/' + user.uid).update({ last_login: new Date().toString() });

      // Exibe uma mensagem de sucesso
      displayFeedback('Usuário Logado!');
    })
    .catch(function(error) {
      // Exibe uma mensagem de erro se a autenticação falhar
      displayFeedback('Usuário não Logado!', true);
    });
} else {
  // Exibe uma mensagem de erro se os dados do formulário são inválidos
  displayFeedback('Email ou senha não encontrados', true);
}
}

// Função para exibir mensagens na página HTML
function displayFeedback(message, isError = false) {
// Obtém o elemento de feedback na página HTML
const feedbackContainer = document.getElementById('feedback');

// Define a cor do texto com base no tipo de mensagem (sucesso ou erro)
feedbackContainer.style.color = isError ? 'red' : 'green';

// Define o texto da mensagem no elemento de feedback
feedbackContainer.innerText = message;
}

// Função para validar um endereço de email usando uma expressão regular
function validate_email(email) {
const expression = /^[^@]+@\w+(\.\w+)+\w$/;
return expression.test(email);
}

// Função para validar a senha (no mínimo 6 caracteres)
function validate_password(password) {
return password.length >= 6;
}

// Adiciona event listener para o botão de login
document.getElementById('loginButton').addEventListener('click', function() {
login();
});

// Adiciona event listener para o botão de registro
document.getElementById('registerButton').addEventListener('click', function() {
register();
});