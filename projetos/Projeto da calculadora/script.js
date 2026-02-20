const display = document.getElementById("display");
const botoes = document.querySelectorAll("button");

// 🔧 Adiciona estilo da classe "ativo" dinamicamente
const estilo = document.createElement("style");
estilo.textContent = `
  .btn.ativo {
    background-color: red !important;
    background-image: none !important;
    transition: background-color 0.1s;
  }
`;
document.head.appendChild(estilo);

// ===== Funções da calculadora =====
function pressed(v) { display.textContent += v; }
function clearAll() { display.textContent = ""; }
function backspace() { display.textContent = display.textContent.slice(0, -1); }
function calculate() {
  try { display.textContent = eval(display.textContent); }
  catch { display.textContent = "Erro"; }
}

// ===== Efeito vermelho =====
function piscar(btn) {
  if (!btn) return;
  btn.classList.add("ativo");
  setTimeout(() => btn.classList.remove("ativo"), 150);
}

// ===== Clique do mouse =====
botoes.forEach(btn => btn.addEventListener("click", () => piscar(btn)));

// ===== Teclado =====
document.addEventListener("keydown", e => {
  const key = e.key;
  const btn = Array.from(botoes).find(b => b.textContent.trim() === key);

  if ("0123456789.+-*/".includes(key)) pressed(key);
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Backspace") backspace();
  else if (key === "Escape") clearAll();

  piscar(btn);
});
