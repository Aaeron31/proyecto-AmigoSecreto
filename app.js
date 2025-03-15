let amigos = [];

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombreAmigo = inputAmigo.value.trim();

    if (!nombreAmigo) {
        alert("Debes ingresar un nombre");
        return;
    }

    if (amigos.includes(nombreAmigo)) {
        alert("Ese nombre ya está en la lista.");
        return;
    }

    amigos.push(nombreAmigo);
    inputAmigo.value = "";
    inputAmigo.focus();
    renderizarAmigos();
}

function renderizarAmigos() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach(nombre => {
        let item = document.createElement("li");
        item.textContent = nombre;
        listaAmigos.appendChild(item);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes agregar al menos dos amigos para sortear.");
        return;
    }

    let asignaciones = asignarAmigoSecreto([...amigos]); // Copia la lista

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h2>Resultados del sorteo:</h2>";
    let listaResultados = document.createElement("ul");

    asignaciones.forEach((asignado, i) => {
        let item = document.createElement("li");
        item.textContent = `${amigos[i]} → ${asignado}`;
        listaResultados.appendChild(item);
    });

    resultado.appendChild(listaResultados);
}

function asignarAmigoSecreto(nombres) {
    let asignados = [...nombres];

    do {
        asignados = asignados.sort(() => Math.random() - 0.5);
    } while (asignados.some((nombre, i) => nombre === nombres[i])); // Evita que alguien se asigne a sí mismo

    return asignados;
}

// Nueva función para reiniciar el juego
function reiniciarJuego() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("amigo").value = "";
    document.getElementById("amigo").focus();
}
