const canvas = document.getElementById('game-canvas');

const ROWS = 30;
const COLS = 50;

const canvasWidth = 600;
const canvasHeight = 500;

const pixelSize = 10;

//  1 x 10 = 10

const initCanvas = () => {
  for (i = 0; i * pixelSize < canvasHeight; i++) {
    for (j = 0; j * pixelSize < canvasWidth; j++) {
      const pixelTopCoord = i * pixelSize;
      const pixelLeftCoord = j * pixelSize;
      const newSquare = document.createElement('div');
      newSquare.style.position = 'absolute';
      newSquare.style.top = pixelTopCoord + 'px';
      newSquare.style.left = pixelLeftCoord + 'px';
      newSquare.style.width = pixelSize + 'px';
      newSquare.style.height = pixelSize + 'px';
      newSquare.style.border = '1px solid lightgray';
      canvas.appendChild(newSquare);
    }
  }
};

const snakeCoords = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4], // last pos == head
];

const moveRight = [0, 1];
const moveLeft = [0, -1];
const moveUp = [-1, 0];
const moveDown = [1, 0];

let currentDirection = moveRight;

const initSnake = () => {
  for (let coord of snakeCoords) {
    drawSnakePiece(coord);
  }
};

const removeSnakePieceFromDOM = (coords) => {
  const [x, y] = coords;
  const pieceToRemove = document.getElementById(`snakePiece_${x},${y}`);
  canvas.removeChild(pieceToRemove);
};

const drawSnakePiece = (coord) => {
  const [x, y] = coord;
  const snakePiece = document.createElement('div');
  snakePiece.id = `snakePiece_${x},${y}`;
  snakePiece.style.position = 'absolute';
  snakePiece.style.top = x * pixelSize + 'px';
  snakePiece.style.left = y * pixelSize + 'px';
  snakePiece.style.width = pixelSize + 'px';
  snakePiece.style.height = pixelSize + 'px';
  snakePiece.style.backgroundColor = 'rebeccapurple';
  snakePiece.style.border = '1px solid white';
  canvas.appendChild(snakePiece);
};

const moveSnake = () => {
  // remove beginning of snake
  // add piece in the direction going

  setInterval(() => {
    // remove tail piece
    const tail = snakeCoords.shift();
    // remove tail piece from DOM
    removeSnakePieceFromDOM(tail);

    const [headX, headY] = snakeCoords[snakeCoords.length - 1];
    const [directionX, directionY] = currentDirection;
    const headNextPos = [headX + directionX, headY + directionY];
    snakeCoords.push(headNextPos);

    drawSnakePiece(headNextPos);
  }, 100);
};

const listenKeyboardInput = () => {
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }
    e.preventDefault();
    switch (e.key) {
      case 'ArrowLeft':
      case 'A':
      case 'a':
        currentDirection = moveLeft;
        break;
      case 'ArrowRight':
      case 'D':
      case 'd':
        currentDirection = moveRight;
        break;
      case 'ArrowUp':
      case 'W':
      case 'w':
        currentDirection = moveUp;
        break;
      case 'ArrowDown':
      case 'S':
      case 's':
        currentDirection = moveDown;
        break;
    }
  });
};

initCanvas();
initSnake();
moveSnake();
listenKeyboardInput();
