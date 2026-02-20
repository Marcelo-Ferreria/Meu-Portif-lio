var lamp = document.getElementById("lamp")

// Adiciona evento de clique
lamp.addEventListener("click", function() {
    if (lamp.alt == "Lâmpada apagada") {
        lamp.src = "assets/lamp_on.png"; 
        lamp.alt = "Lâmpada acesa";
        document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)";
    } else {
        lamp.src = "assets/lamp_off.png";
        lamp.alt = "Lâmpada apagada";
        document.body.style.background = "radial-gradient(circle, white 8%, black 100%)";
    
    }
});