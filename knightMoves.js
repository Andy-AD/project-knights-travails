class Square {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.predecessor = null;
    this.neighbors = [];
  }
}

class Gameboard {
  constructor() {
    this.board = [];
  }
  createBoard() {
    this.#createSquares();
    this.#addNeighbors();
  }
  knightMoves([startRow, startColumn], [endRow, endColumn]) {
    let endSquare = this.board[endRow][endColumn];
    let queue = [];
    let root = this.board[startRow][startColumn];
    queue.push(root);
    while (queue.length) {
      let square = queue.shift();
      if (square === endSquare) {
        break;
      }
      square.neighbors.forEach((neighborCoordinates) => {
        let [row, column] = neighborCoordinates;
        let neighbor = this.board[row][column];
        if (!neighbor.predecessor && neighbor !== root) {
          neighbor.predecessor = square.coordinates;
          queue.push(neighbor);
        }
      });
    }
    let path = this.#getPath(endSquare);
    console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
    path.forEach((step) => console.log(`${step}`));
  }
  #getPath(endSquare) {
    let path = [];
    let square = endSquare;
    while (square.predecessor) {
      path.unshift(square.coordinates);
      square = this.board[square.predecessor[0]][square.predecessor[1]];
    }
    path.unshift(square.coordinates);
    return path;
  }
  #createSquares() {
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        let square = new Square([i, j]);
        row.push(square);
      }
      this.board.push(row);
    }
  }
  #addNeighbors() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i - 2 >= 0 && j - 1 >= 0) {
          this.board[i][j].neighbors.push([i - 2, j - 1]);
        }
        if (i - 2 >= 0 && j + 1 <= 7) {
          this.board[i][j].neighbors.push([i - 2, j + 1]);
        }
        if (i - 1 >= 0 && j - 2 >= 0) {
          this.board[i][j].neighbors.push([i - 1, j - 2]);
        }
        if (i - 1 >= 0 && j + 2 <= 7) {
          this.board[i][j].neighbors.push([i - 1, j + 2]);
        }
        if (i + 2 <= 7 && j - 1 >= 0) {
          this.board[i][j].neighbors.push([i + 2, j - 1]);
        }
        if (i + 2 <= 7 && j + 1 <= 7) {
          this.board[i][j].neighbors.push([i + 2, j + 1]);
        }
        if (i + 1 <= 7 && j - 2 >= 0) {
          this.board[i][j].neighbors.push([i + 1, j - 2]);
        }
        if (i + 1 <= 7 && j + 2 <= 7) {
          this.board[i][j].neighbors.push([i + 1, j + 2]);
        }
      }
    }
  }
}

let board = new Gameboard();
board.createBoard();
board.knightMoves([3, 3], [4, 3]); // [3,3], [1,2], [3,1], [4,3]
board.knightMoves([3, 3], [7, 7]); // [3,3], [1,4], [3,5], [5,6], [7, 7]
