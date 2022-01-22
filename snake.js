const canvas = document.getElementById('game-canvas');

const ROWS = 30;
const COLS = 50;

const canvasWidth = 600;
const canvasHeight = 500;

const pixelSize = 10;

let foodPosition = null;

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

const checkIfFoodFound = (headPosition) => {
  const isHeadOnFood = headPosition.every(
    (value, index) => value == foodPosition[index]
  );
  if (isHeadOnFood) {
    makeFoodAppear();
    const headNextPos = calculateHeadNextPosition();
    snakeCoords.push(headNextPos);
    drawSnakePiece(headNextPos);
  }
};

const calculateHeadNextPosition = () => {
  const [headX, headY] = snakeCoords[snakeCoords.length - 1];
  const [directionX, directionY] = currentDirection;
  const headNextPos = [headX + directionX, headY + directionY];
  return headNextPos;
};

const moveSnake = () => {
  // remove beginning of snake
  // add piece in the direction going

  setInterval(() => {
    // remove tail piece
    const tail = snakeCoords.shift();
    // remove tail piece from DOM
    removeSnakePieceFromDOM(tail);

    const headNextPos = calculateHeadNextPosition();
    snakeCoords.push(headNextPos);
    drawSnakePiece(headNextPos);

    checkIfFoodFound(headNextPos);
  }, 100);
};

const renderFood = (foodCoord) => {
  const [x, y] = foodCoord;
  const foodContainer = document.createElement('div');
  foodContainer.id = 'food';
  foodContainer.style.position = 'absolute';
  foodContainer.style.top = x * pixelSize + 'px';
  foodContainer.style.left = y * pixelSize + 'px';
  foodContainer.style.width = '10px';
  foodContainer.style.height = '10px';
  foodContainer.style.borderRadius = '50%';
  foodContainer.style.backgroundColor = 'tomato';
  canvas.appendChild(foodContainer);
};

const makeRandomPos = () => {
  const randomRow = Math.floor(Math.random(ROWS) * ROWS);
  const randomCol = Math.floor(Math.random(COLS) * COLS);
  return [randomRow, randomCol];
};

const updateFoodPosition = (newPosition) => {
  foodPosition = newPosition;
};

const removeFoodIfNeeded = () => {
  const foodContainer = document.getElementById('food');
  if (foodContainer) {
    foodContainer.remove();
  }
};

const makeFoodAppear = () => {
  removeFoodIfNeeded();
  const randomPos = makeRandomPos();
  updateFoodPosition(randomPos);
  renderFood(randomPos);
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
makeFoodAppear();
