// Definindo a classe Livro
class Livro {
    constructor(id, titulo, autor) {
        this.id = id; // ID do documento no Firestore
        this.titulo = titulo; // Título do livro
        this.autor = autor; // Autor do livro
    }

    // Método getter para obter o título do livro
    getTitulo() {
        return this.titulo;
    }

    // Método setter para definir um novo título ao livro
    setTitulo(novoTitulo) {
        this.titulo = novoTitulo;
    }

    // Método getter para obter o autor do livro
    getAutor() {
        return this.autor;
    }

    // Método setter para definir um novo autor ao livro
    setAutor(novoAutor) {
        this.autor = novoAutor;
    }

    // Método para criar um novo livro no Firestore
    async criar() {
        const docRef = await db.collection('livros').add({
            titulo: this.titulo,
            autor: this.autor
        });
        this.id = docRef.id;
    }

    // Método para atualizar um livro no Firestore
    async atualizar(novoTitulo, novoAutor) {
        await db.collection('livros').doc(this.id).update({
            titulo: novoTitulo,
            autor: novoAutor
        });
        this.setTitulo(novoTitulo);
        this.setAutor(novoAutor);
    }

    // Método para excluir um livro do Firestore
    async excluir() {
        await db.collection('livros').doc(this.id).delete();
    }
}

// Definindo a classe UI para manipulação da interface do usuário
class UI {
    constructor() {
        this.formLivro = document.getElementById('formLivro');
        this.listaLivros = document.getElementById('livros');

        // Inicializa os eventos da UI
        this.inicializarEventos();
    }

    // Inicializa os eventos da UI
    inicializarEventos() {
        // Carregar livros ao iniciar
        window.onload = () => {
            this.carregarLivros();
        };

        // Função para ser executada quando o formulário é submetido
        this.formLivro.onsubmit = async (event) => {
            event.preventDefault(); // Prevenir o comportamento padrão do formulário

            // Obter valores dos campos de entrada
            const titulo = document.getElementById('titulo').value;
            const autor = document.getElementById('autor').value;

            // Criar um novo objeto Livro e adicioná-lo ao Firestore
            const novoLivro = new Livro(null, titulo, autor);
            await novoLivro.criar();

            // Limpar os campos do formulário
            this.formLivro.reset();

            // Adicionar o novo livro à lista de livros no HTML
            this.adicionarLivroNaLista(novoLivro);
        };
    }

    // Função para carregar livros do Firestore
    async carregarLivros() {
        this.listaLivros.innerHTML = ''; // Limpar a lista de livros
        const querySnapshot = await db.collection('livros').get(); // Obter lista de livros do Firestore
        querySnapshot.forEach(doc => {
            const livro = new Livro(doc.id, doc.data().titulo, doc.data().autor);
            this.adicionarLivroNaLista(livro); // Adicionar cada livro à lista de livros no HTML
        });
    }

    // Função para adicionar um livro à lista de livros no HTML
    adicionarLivroNaLista(livro) {
        const li = document.createElement('li');
        li.classList.add('livro');

        // Criar elementos para exibir título e autor do livro
        const tituloSpan = document.createElement('span');
        tituloSpan.textContent = livro.getTitulo();
        li.appendChild(tituloSpan);

        const autorSpan = document.createElement('span');
        autorSpan.textContent = ` - ${livro.getAutor()}`;
        li.appendChild(autorSpan);

        // Botão para editar o livro
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.onclick = () => {
            this.editarLivro(livro);
        };
        li.appendChild(editarBtn);

        // Botão para excluir o livro
        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.onclick = () => {
            this.removerLivro(livro);
        };
        li.appendChild(excluirBtn);

        // Adicionar o item à lista de livros no HTML
        this.listaLivros.appendChild(li);
    }

    // Função para editar um livro
    async editarLivro(livro) {
        // Obter novos valores do usuário
        const novoTitulo = prompt("Digite o novo título do livro:", livro.getTitulo());
        const novoAutor = prompt("Digite o novo autor do livro:", livro.getAutor());

        // Atualizar o livro se novos valores forem fornecidos
        if (novoTitulo && novoAutor) {
            await livro.atualizar(novoTitulo, novoAutor);
            this.carregarLivros(); // Recarregar a lista de livros
        }
    }

    // Função para remover um livro da lista
    async removerLivro(livro) {
        await livro.excluir(); // Excluir o livro do Firestore
        this.carregarLivros(); // Recarregar a lista de livros
    }
}

// Instanciar a classe UI para inicializar a aplicação
const ui = new UI();
