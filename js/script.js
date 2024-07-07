// Game Constants and Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
const speed = 5;
let score = 0;

let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 13 }];
let food = { x: 6, y: 7 };
const board = document.getElementById("board");
const scoreEl = document.getElementById("score");

// Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function collision() {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
      return true;
  }
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y <= 0 ||
    snakeArr[0].y >= 18
  )
    return true;
  return false;
}

function gameEngine() {
  // Part 1 : Updating the snake Array & food

  if (collision()) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    scoreEl.innerHTML = "Score 0";
  }

  // Increment the score and replace the food at random location
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    scoreEl.innerHTML = `Score ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(Math.random() * (b - a) + a),
      y: Math.round(Math.random() * (b - a) + a),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2 : Display the snake and the Food
  // Displaying the snake

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    board.appendChild(snakeElement);
  });

  // Displaying the food
  foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  board.appendChild(foodElement);
}

// Main Logic Starts Here

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 };
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      break;

    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      break;

    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      break;

    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      break;

    default:
      break;
  }
});
