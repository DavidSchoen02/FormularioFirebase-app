const firebaseConfig = {
    apiKey: "AIzaSyD4yJTasQk3JRdsAKbIlilRtVvZ_9rbqOA",
    authDomain: "datos-de-formulario-app.firebaseapp.com",
    projectId: "datos-de-formulario-app",
    storageBucket: "datos-de-formulario-app.appspot.com",
    messagingSenderId: "630483858159",
    appId: "1:630483858159:web:eaa89c991e0ab3cff2a11a",
    measurementId: "G-L1XW4FRR8F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

    document.getElementById('formulario').addEventListener('submit', (event) => {
        event.preventDefault()

    // validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    // validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail válido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
    // validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let constrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        constrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        constrasenaError.classList.add('error-message')
    } else {
        constrasenaError.textContent = ''
        constrasenaError.classList.remove('error-message')
    }
    // si todos los campos son validos enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !constrasenaError.textContent) {

        // BACKEND QUE RECIBA LA INFORMACIÓN
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito',docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert(error)
        });
    }

})