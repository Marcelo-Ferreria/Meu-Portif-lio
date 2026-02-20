// Declaração de variáveis
var result = document.getElementById("result");
var car_red = document.getElementById("red");
var car_white = document.getElementById("white");
var btn_circle_red = document.getElementById("vermelho");
var btn_circle_white = document.getElementById("branco");
var btns_ctrl = document.getElementsByClassName("btn");

var carroSelecionado = null; // guarda o carro atual
var direcao = null; // define o sentido do movimento (esquerda ou direita)

// Eventos de clique
car_red.addEventListener("click", sel_car_red);
car_white.addEventListener("click", sel_car_white);
btn_circle_red.addEventListener("click", sel_car_red);
btn_circle_white.addEventListener("click", sel_car_white);
btns_ctrl[0].addEventListener("click", reset);
btns_ctrl[1].addEventListener("click", acel);
btns_ctrl[2].addEventListener("click", desacel);

// Função ao selecionar carro vermelho
function sel_car_red() {
    carroSelecionado = car_red;
    direcao = "right";
    document.body.style.backgroundColor = "red";
    document.body.style.color = "black";
    result.textContent = "Vermelho";
    btns_ctrl_block_fun();
}

// Função ao selecionar carro branco
function sel_car_white() {
    carroSelecionado = car_white;
    direcao = "left";
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    result.textContent = "Branco";
    btns_ctrl_block_fun();
}

// Mostrar botões
function btns_ctrl_block_fun() {
    for (let i = 0; i <= 2; i++) {
        btns_ctrl[i].style.display = "block";
    }
}

// Ocultar botões
function btns_ctrl_none_fun() {
    for (let i = 0; i <= 2; i++) {
        btns_ctrl[i].style.display = "none";
    }
}

// Resetar tudo
function reset() {
    carroSelecionado = null;
    direcao = null;
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    result.textContent = "?";
    btns_ctrl_none_fun();

    // Resetar posições originais
    car_white.style.top = "60px";
    car_white.style.height = "50px";
    car_white.style.width = "50px";
    car_white.style.left = "205px";

    car_red.style.top = "60px";
    car_red.style.height = "50px";
    car_red.style.width = "50px";
    car_red.style.right = "205px";
}

// Acelerar (movimento diagonal + diminuir tamanho)
function acel() {
    if (!carroSelecionado) {
        alert("Selecione um carro antes de acelerar!");
        return;
    }

    let estilo = window.getComputedStyle(carroSelecionado);
    let top = parseInt(estilo.top);
    let size = parseInt(estilo.height);

    if (top > 5) { // limite superior
        top -= 5;
        size -= 1;

        carroSelecionado.style.top = top + "px";
        carroSelecionado.style.height = size + "px";
        carroSelecionado.style.width = size + "px";

        // mover para centro conforme acelera
        if (direcao === "right") {
            let right = parseInt(estilo.right);
            if (right < 250) carroSelecionado.style.right = (right + 3) + "px";
        } else if (direcao === "left") {
            let left = parseInt(estilo.left);
            if (left < 250) carroSelecionado.style.left = (left + 3) + "px";
        }
    }
}

// Desacelerar (volta para baixo + aumenta tamanho)
function desacel() {
    if (!carroSelecionado) {
        alert("Selecione um carro antes de desacelerar!");
        return;
    }

    let estilo = window.getComputedStyle(carroSelecionado);
    let top = parseInt(estilo.top);
    let size = parseInt(estilo.height);

    if (top < 100) { // limite inferior
        top += 5;
        size += 1;

        carroSelecionado.style.top = top + "px";
        carroSelecionado.style.height = size + "px";
        carroSelecionado.style.width = size + "px";

        // mover de volta conforme desacelera
        if (direcao === "right") {
            let right = parseInt(estilo.right);
            if (right > 205) carroSelecionado.style.right = (right - 3) + "px";
        } else if (direcao === "left") {
            let left = parseInt(estilo.left);
            if (left > 205) carroSelecionado.style.left = (left - 3) + "px";
        }
    }
}

// Controle via teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        acel();
    }
    if (event.key === "ArrowDown") {
        desacel();
    }
});
