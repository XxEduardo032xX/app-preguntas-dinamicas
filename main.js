//windows: Representa toda la ventana del navegador
//window.addEventListener: significa que quieres realizar un evento de accion en toda la ventana
//del navegador



const input = document.querySelectorAll(".input");
const presionarPreguntas = document.querySelector(".presionarPreguntas");
const contenedor = document.querySelector(".contenedor")

presionarPreguntas.addEventListener("click", () => {
    // Verificar si todos los campos están llenos
    const inputValues = Array.from(input).map(elemento => elemento.value.trim());
    const todosCamposLlenos = inputValues.every(valor => valor !== "");

    if (todosCamposLlenos) {
        // Almacenar en localStorage
        const objetoContPreguntAlt = {
            pregunta: inputValues[0],
            alternativas: inputValues[1]
        };

        localStorage.setItem("cantPreguntAlternati", JSON.stringify(objetoContPreguntAlt));
        contenedor.style.display = "none";
        // Redirigir a la otra página
        window.location.href = "prueba1/index.html";
    } else {
        // Alertar si no todos los campos están llenos
        alert("Por favor, completa todos los campos antes de continuar.");
    }
});
