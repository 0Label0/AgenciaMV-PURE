const form1 = document.getElementById("contact-form");

// Función para mostrar errores
const showError = (input, message) => {
  const formSection =
    input.closest(".section-form") || input.closest(".input-container");
  const errorSpan = formSection.querySelector(
    `.error-message#error-${input.id}`,
  );
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.classList.add("visible");
    input.classList.add("error-input");
  }
};

// Función para limpiar errores
const clearErrors = (form) => {
  const errorSpans = form.querySelectorAll(".error-message");
  errorSpans.forEach((span) => {
    span.textContent = "";
    span.classList.remove("visible");
  });
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.classList.remove("error-input");
  });
};

// Función de validación
const validateForm = (form) => {
  let isValid = true;
  clearErrors(form);

  const email = form.querySelector("#email");
  const tel = form.querySelector("#tel");
  const name = form.querySelector("#name");
  const message = form.querySelector("#message");

  // Regex básica para email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.value.trim().length < 2) {
    showError(name, "Por favor, introduce un nombre válido.");
    isValid = false;
  }

  if (!emailRegex.test(email.value)) {
    showError(email, "Por favor, introduce un correo electrónico válido.");
    isValid = false;
  }

  if (tel.value.trim().length < 9) {
    showError(tel, "Por favor, introduce un número de teléfono válido.");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, "El mensaje debe tener al menos 10 caracteres.");
    isValid = false;
  }

  return isValid;
};

// Event Listener
if (form1) {
  form1.addEventListener("submit", (e) => {
    e.preventDefault(); // Detenemos el envío para validar

    if (validateForm(form1)) {
      const data = new FormData(form1);
      const submitBtn = form1.querySelector("#submit");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      fetch("http://localhost:8000/backend/SendMail.php", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;

          if (data.status === "success") {
            console.log("Éxito:", data);
            alert("Mensaje enviado correctamente"); // Keep a simple success feedback or use a better UI element if requested, but request was mostly about errors.
            form1.reset();
          } else {
            // Handle server-side validation errors if they come back structured
            console.error("Error backend:", data);
            if (data.errors) {
              // Assuming server returns { status: 'error', errors: { field: 'msg' } }
              Object.keys(data.errors).forEach((key) => {
                const input = form1.querySelector(`#${key}`);
                if (input) showError(input, data.errors[key]);
              });
            } else {
              alert(
                "Hubo un error al enviar el mensaje: " +
                  (data.message || "Error desconocido"),
              );
            }
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          alert("Hubo un error de conexión al enviar el mensaje.");
        });
    }
  });
}
