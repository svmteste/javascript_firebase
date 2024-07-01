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

document.getElementById('registerButton').addEventListener('click', function() {
register();
});
