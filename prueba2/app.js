const tituloPregunta = document.querySelector(".preguntas");
const contenedorBotones = document.querySelector("#contenedorBotonesGAAA");
const botonSiguiente = document.querySelector("#siguienteBoton");
const fragmento = document.createDocumentFragment();

let consumiendoJsonStoragePreguntAlterna = localStorage.getItem("contenedorPreguntasAlternativas");
let dataStorageJson = JSON.parse(consumiendoJsonStoragePreguntAlterna);
let contador = 0, puntaje = 0;

console.log(dataStorageJson);
contenedorBotones.innerHTML = "";

function principal() {
    titulo();
    botonSiguiente.style.display = "none";
    dataStorageJson[contador].alternativas.forEach(alternativas);
    contenedorBotones.append(fragmento);
    pasandoSiguiente();
}

function titulo() {
    const incremento = dataStorageJson[contador];
    tituloPregunta.textContent = `${contador + 1}. ${incremento.pregunta}`;
}

function alternativas(element, index) {
    const button = document.createElement("button");
    button.textContent = element.texto;
    button.dataset.id = index;
    button.classList.add("btn");
    fragmento.appendChild(button);

    button.addEventListener("click", () => {
        verificarCorrectoONo(button);
        botonSiguiente.style.display = "block";
    });
}

function pasandoSiguiente() {
    botonSiguiente.addEventListener("click", () => {
        if (contador < dataStorageJson.length - 1) {
            contador++;
            titulo();
            habilitandolo();
            cambiandoAlternativasSiguiente();
            botonSiguiente.style.display = "none";
        } else {
            alert('llego al límite');
            contenedorBotones.innerHTML = "";
            botonSiguiente.style.display = "none";
            tituloPregunta.textContent = `Tu puntaje fue ${puntaje}`;
        }
    });
}

// con esto cambiamos el texto:
function cambiandoAlternativasSiguiente() {
    dataStorageJson[contador].alternativas.forEach((element, index) => {
        //children: devuelve todos los nodos hijos osea elementos hijos de un contenedor
        //childNodes: devuelve todos nodos, comentarios y otros tipos de nodos como los elementos hijos
        const botonIndice = contenedorBotones.children[index];
        botonIndice.textContent = element.texto;
        // console.log(contenedorBotones.childNodes[index]);
    });
}



function verificarCorrectoONo(button){
    //esto lo que hace es verificar si el boton presionado contiene la respuesta correcta o no
    let botonCorrect = dataStorageJson[contador].alternativas[parseInt(button.dataset.id)].esCorrecta;
    const botonAlt = document.querySelectorAll(".btn");
    // console.log(botonCorrect);
    if(botonCorrect === true){
        button.classList.add("botonCorrecto")
        puntaje++;
    }else{
        button.classList.add("botonIncorrect")
    }

    const buttonIncorrecT = button.classList.contains("botonIncorrect")
    dataStorageJson[contador].alternativas.forEach((element, index) => {
        const buttonArray = botonAlt[index];
        console.log(buttonArray);
        if(buttonIncorrecT){
            if(element.esCorrecta == true){
                buttonArray.classList.add("botonCorrecto");
            }
        }
        buttonArray.style.cursor = "no-drop";
        buttonArray.disabled = true
        console.log(element, index);
    });
}


function habilitandolo(){
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach(element => {
        element.classList.remove("botonCorrecto", "botonIncorrect");
        element.disabled = false
        element.style.cursor = "pointer"
    });
}


principal();
