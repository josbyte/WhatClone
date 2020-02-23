var firebaseConfig = {
    apiKey: "AIzaSyCqi_CPS0F8BjmpF8WiAus7ERlt40fToWg",
    authDomain: "whatclone-jos.firebaseapp.com",
    databaseURL: "https://whatclone-jos.firebaseio.com",
    projectId: "whatclone-jos",
    storageBucket: "whatclone-jos.appspot.com",
    messagingSenderId: "71391479211",
    appId: "1:71391479211:web:b58b2854872990f868feee"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

username="";
estado="";
img="";
function connectForm(event) {
    event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
    const nombre = document.getElementById('nombre'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
    const estado = document.getElementById('estado');
    const img = document.getElementById('img');
    var usersOnline=firebase.database().ref("usersOnline");
     // Creamos un objecto con todos los elementos de nuestro formulario.
    usersOnline.child(nombre.value).set({nombre: nombre.value, estado: estado.value, img: img.value});
    document.cookie = "username="+nombre.value; 
    document.cookie = "estado="+estado.value; 
    document.cookie = "img="+img.value; 
    
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
