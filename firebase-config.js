// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBhycJZ7wHsFYGDcdoZRazutKVNfEKa2SQ",
    authDomain: "ifnmg-esporte.firebaseapp.com",
    projectId: "ifnmg-esporte",
    storageBucket: "ifnmg-esporte.appspot.com",
    messagingSenderId: "844194342463",
    appId: "1:844194342463:web:67655c8443b7a3c7e23a8a",
    measurementId: "G-CTVQNN48YC"
  };

// const firebaseConfig = {
//     apiKey: "SuaApiKey",
//     authDomain: "SeuDominio.firebaseapp.com",
//     projectId: "SeuProjetoId",
//     storageBucket: "SeuBucket.appspot.com",
//     messagingSenderId: "SeuSenderId",
//     appId: "SuaAppId",
//     measurementId: "SuaMeasurementId"
//    };
// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
