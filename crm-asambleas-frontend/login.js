const form = document.getElementById("form");
const inputUsuario = document.getElementById("usuario");
const inputContrasena = document.getElementById("contrasena");

// Función para enviar el formulario, reutilizable
async function enviarLogin() {
  const usuario = inputUsuario.value;
  const contrasena = inputContrasena.value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasena })
    });
    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirectUrl;
    } else {
      mostrarMensajeError(data.message);
    }
  } catch (err) {
    console.error("Error al enviar la solicitud:", err);
    mostrarMensajeError("Error de conexión con el servidor.");
  }
}

// Intercepta el envío normal (click o Enter)
form.addEventListener("submit", e => {
  e.preventDefault();
  enviarLogin();
});

// ** Detectar Enter en los inputs y disparar submit **
[ inputUsuario, inputContrasena ].forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      // requestSubmit dispara el evento 'submit' de forma segura
      form.requestSubmit();
    }
  });
});

function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById("mensaje-error");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add("error-activo", "vibrar");
  setTimeout(() => mensajeError.classList.remove("vibrar"), 500);
}

// Limpiar mensaje al escribir
[ inputUsuario, inputContrasena ].forEach(input => {
  input.addEventListener("input", () => {
    const mensajeError = document.getElementById("mensaje-error");
    mensajeError.textContent = "";
    mensajeError.classList.remove("error-activo");
  });
});
