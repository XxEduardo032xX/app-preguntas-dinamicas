const inputPregunta = document.querySelector("#inputPregunta");
const titulo = document.querySelector(".titulo");
const pasandoSiguiente = document.querySelector(".pasandoSiguiente");
const fragmento = document.createDocumentFragment();
const contenedorBotones = document.querySelector(".contenedorBotones");
const contenedor = document.querySelector(".contenedor");

let consumiendoDatStorage = localStorage.getItem("cantPreguntAlternati");
let pasandoloJsonStorage = JSON.parse(consumiendoDatStorage);
console.log(pasandoloJsonStorage);

let contador = 0;
let limiteContador = parseInt(pasandoloJsonStorage.pregunta);
let cantidadAlternativasStorage = parseInt(pasandoloJsonStorage.alternativas);
console.log("limite: ", limiteContador);

let almacenandoPreguntas_Alternativas = [];

function principal() {
    tituloPregunta();
    cambiandoAlternativas();
}

const tituloPregunta = () =>
    (titulo.textContent = `Ingrese la primera ${contador + 1}`);

function cambiandoAlternativas() {
    contenedorBotones.innerHTML = "";

    //aqui le pones "cantidadAlternativasStorage" para representar cuantos
    //inputs quieres que halla en cada pregunta del arreglo
    for (let x = 0; x < cantidadAlternativasStorage; x++) {
        const div = document.createElement("div");

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("inputText");
        input.setAttribute("placeholder", "Ingrese la alternativa");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        checkbox.setAttribute("id", `checkbox-${x}`);
        div.appendChild(input);
        div.appendChild(checkbox);

        fragmento.appendChild(div);
    }
    contenedorBotones.appendChild(fragmento);
}

pasandoSiguiente.addEventListener("click", () => {
    const preguntaLlena = inputPregunta.value.trim() !== "";
    const alternativasLlenas = Array.from(document.querySelectorAll(".inputText"))
        .every((input) => input.value.trim() !== "");

    if (preguntaLlena && alternativasLlenas) {
        const alMenosUnCheckboxMarcado = Array.from(document.querySelectorAll(".checkbox"))
            .some((checkbox) => checkbox.checked);

        if (alMenosUnCheckboxMarcado) {
            guardandoPreguntasYAlternativas();
            contador++;
            //debes de colocar esto para verificar que estas trabajando con los datos actuales
            //antes de pasar a la siguiente pregunta
            if (contador < limiteContador) {
                cambiandoAlternativas();
                tituloPregunta();
            } else {
                alert("llego al limite");
                window.location.href = "/prueba2/index.html"
                contenedor.style.display = "none";
            }
        } else {
            alert("Por favor, marque al menos un checkbox antes de pasar a la siguiente pregunta.");
        }
    } else {
        alert("Por favor, complete la pregunta y todas las alternativas antes de pasar a la siguiente pregunta.");
    }
});

function guardandoPreguntasYAlternativas() {
    const inputText = document.querySelectorAll(".inputText");
    const checkboxes = document.querySelectorAll(".checkbox");

    const alternativasArray = [];

    inputText.forEach((input, index) => {
        const esCorrecta = checkboxes[index].checked;
        alternativasArray.push({ texto: input.value, esCorrecta });
        input.value = "";
    });

    const pasandoloJson = {
        pregunta: inputPregunta.value,
        alternativas: alternativasArray,
    };

    inputPregunta.value = "";
    almacenandoPreguntas_Alternativas.push(pasandoloJson);

    let contenedorPreguntasAlternativas = almacenandoPreguntas_Alternativas;
    localStorage.setItem("contenedorPreguntasAlternativas", JSON.stringify(contenedorPreguntasAlternativas));

    console.log(almacenandoPreguntas_Alternativas);
}

principal();
