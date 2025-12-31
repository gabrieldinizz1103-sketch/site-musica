const lista = document.getElementById("lista-musicas");

// 1️⃣ Carrega ordem salva ou usa a original
let ordemSalva = JSON.parse(localStorage.getItem("ordemMusicas"));

let musicasOrdenadas = ordemSalva
  ? ordemSalva.map(nome =>
      musicas.find(m => m.nome === nome)
    ).filter(Boolean)
  : [...musicas];

// 2️⃣ Renderiza as músicas
function renderizarMusicas() {
  lista.innerHTML = "";

  musicasOrdenadas.forEach(musica => {
    const item = document.createElement("div");
    item.className = "item-musica";

    item.innerHTML = `
      <span class="drag-handle" draggable="true">☰</span>
      <a href="${musica.link}" target="_blank" class="musica">
        🎧 ${musica.nome}
      </a>
    `;

    lista.appendChild(item);
  });
}

renderizarMusicas();

// 3️⃣ Drag & Drop
let itemArrastado = null;

lista.addEventListener("dragstart", e => {
  if (e.target.classList.contains("drag-handle")) {
    itemArrastado = e.target.closest(".item-musica");
  }
});

lista.addEventListener("dragover", e => {
  e.preventDefault();
});

lista.addEventListener("drop", e => {
  const alvo = e.target.closest(".item-musica");

  if (itemArrastado && alvo && itemArrastado !== alvo) {
    lista.insertBefore(itemArrastado, alvo.nextSibling);
    salvarOrdem();
  }
});

// 4️⃣ Salva a ordem atual
function salvarOrdem() {
  const nomes = [...lista.querySelectorAll(".musica")]
    .map(el => el.textContent.replace("🎧 ", "").trim());

  localStorage.setItem("ordemMusicas", JSON.stringify(nomes));
}
