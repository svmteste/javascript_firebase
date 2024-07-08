// Definindo a classe Livro
class Livro {
    constructor(id, titulo, autor) {
        this.id = id; // ID do documento no Firestore
        this.titulo = titulo;
        this.autor = autor;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(novoTitulo) {
        this.titulo = novoTitulo;
    }

    getAutor() {
        return this.autor;
    }

    setAutor(novoAutor) {
        this.autor = novoAutor;
    }
}

const formLivro = document.getElementById('formLivro');
const listaLivros = document.getElementById('livros');

// Carregar livros ao iniciar
window.onload = function() {
    carregarLivros();
};

// Função para ser executada quando o formulário é submetido
formLivro.onsubmit = async function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    // Adicionando um novo livro ao Firestore
    await db.collection('livros').add({
        titulo: titulo,
        autor: autor
    });

    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    carregarLivros();
};

// Função para carregar livros do Firestore
async function carregarLivros() {
    listaLivros.innerHTML = '';
    const querySnapshot = await db.collection('livros').get();
    querySnapshot.forEach(doc => {
        const livro = new Livro(doc.id, doc.data().titulo, doc.data().autor);
        adicionarLivroNaLista(livro);
    });
}

// Função para adicionar um livro à lista de livros no HTML
function adicionarLivroNaLista(livro) {
    const li = document.createElement('li');
    li.classList.add('livro');

    const tituloSpan = document.createElement('span');
    tituloSpan.textContent = livro.getTitulo();
    li.appendChild(tituloSpan);

    const autorSpan = document.createElement('span');
    autorSpan.textContent = ` - ${livro.getAutor()}`;
    li.appendChild(autorSpan);

    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.onclick = function () {
        editarLivro(livro);
    };
    li.appendChild(editarBtn);

    const excluirBtn = document.createElement('button');
    excluirBtn.textContent = 'Excluir';
    excluirBtn.onclick = function () {
        removerLivro(livro);
    };
    li.appendChild(excluirBtn);

    listaLivros.appendChild(li);
}

// Função para editar um livro
async function editarLivro(livro) {
    const novoTitulo = prompt("Digite o novo título do livro:", livro.getTitulo());
    const novoAutor = prompt("Digite o novo autor do livro:", livro.getAutor());

    if (novoTitulo && novoAutor) {
        await db.collection('livros').doc(livro.id).update({
            titulo: novoTitulo,
            autor: novoAutor
        });
        carregarLivros();
    }
}

// Função para remover um livro da lista
async function removerLivro(livro) {
    await db.collection('livros').doc(livro.id).delete();
    carregarLivros();
}
