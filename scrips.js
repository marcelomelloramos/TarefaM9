const API_URL = "https://crudcrud.com/api/8edd70ed4de24ee4b7e5ea5f97f17d7d/clientes";

async function cadastrarCliente() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }
  const cliente = { nome, email };
  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    if (resposta.ok) {
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
      listarClientes();
    } else {
      alert("Erro ao cadastrar cliente.");
    }
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
  }
}

async function listarClientes() {
  try {
    const resposta = await fetch(API_URL);
    const clientes = await resposta.json();
    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";
    clientes.forEach((cliente) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${cliente.nome}</strong> - ${cliente.email}
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao listar:", erro);
  }
}

async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    listarClientes();
  } catch (erro) {
    console.error("Erro ao excluir:", erro);
  }
}

document.getElementById("btnCadastrar").addEventListener("click", cadastrarCliente);
window.addEventListener("load", listarClientes);
