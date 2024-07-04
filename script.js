// Classe base para uma célula do jogo
class Cell {
    constructor() {
        this.revealed = false; // Indica se a célula foi revelada
        this.element = document.createElement('div'); // Cria um elemento div para a célula
        this.element.classList.add('cell'); // Adiciona a classe 'cell' ao elemento
    }

    // Revela a célula
    reveal() {
        this.revealed = true;
        this.element.classList.add('revealed'); // Adiciona a classe 'revealed' ao elemento
    }
}

// Classe para uma célula vazia, herda de Cell
class EmptyCell extends Cell {
    reveal() {
        super.reveal(); // Chama o método reveal da classe base
        this.element.textContent = ' '; // Define o conteúdo da célula como vazio
    }
}

// Classe para uma célula com tesouro, herda de Cell
class TreasureCell extends Cell {
    reveal() {
        super.reveal(); // Chama o método reveal da classe base
        this.element.textContent = 'TESOURO :)'; // Define o conteúdo da célula como um tesouro
    }
}

// Classe para uma célula com armadilha, herda de Cell
class TrapCell extends Cell {
    reveal() {
        super.reveal(); // Chama o método reveal da classe base
        this.element.textContent = 'X'; // Define o conteúdo da célula como uma armadilha
    }
}

// Classe para o jogo
class TreasureHunt {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = [];
        this.initBoard();
    }

    // Inicializa o tabuleiro do jogo
    initBoard() {
        const gameBoardElement = document.getElementById('game-board');
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                let cell;
                const randomValue = Math.random();
                if (randomValue < 0.1) {
                    cell = new TreasureCell(); // 10% de chance de ser uma célula com tesouro
                } else if (randomValue < 0.2) {
                    cell = new TrapCell(); // 10% de chance de ser uma célula com armadilha
                } else {
                    cell = new EmptyCell(); // 80% de chance de ser uma célula vazia
                }
                cell.element.addEventListener('click', () => cell.reveal());
                gameBoardElement.appendChild(cell.element);
                this.board[i][j] = cell;
            }
        }
    }
}

// Inicializa o jogo com um tabuleiro de 5x5
const treasureHunt = new TreasureHunt(5, 5);
