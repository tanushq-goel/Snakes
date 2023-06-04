const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score = 0;

// Set up the snake's initial position and direction
let snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}];
let dx = 10;
let dy = 0;

// Set up the food's initial position
let food = {x: 300, y: 300};

// Set the game's frame rate
let speed = 100;

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "lightgreen";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Move the snake
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // Check if the snake has collided with the wall
  if (head.x < 0 || head.x > canvas.width || head.y < 0 || head.y > canvas.height) {
    return gameOver();
  }

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    // Generate a new food location
    food = {x: Math.floor(Math.random() * canvas.width / 10) * 10, y: Math.floor(Math.random() * canvas.height / 10) * 10};

    // Increase the score
    score++;

    // Increase the snake's speed
    speed -= 5;
  } else {
    // Remove the snake's tail
    snake.pop();
  }
}

function gameOver() {
  // Display the game over message
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

  // Stop the game loop
  clearInterval(gameLoop);
}

document.addEventListener("keydown", event => {
  // Change the snake's direction based on the arrow keys
  switch (event.keyCode) {
    case 37: // Left
      dx = -10;
      dy = 0;
      break;
    case 38: // Up
      dx = 0;
      dy = -10;
      break;
    case 39: // Right
      dx = 10;
      dy = 0;
      break;
    case 40: // Down
      dx = 0;
      dy = 10;
      break;
  }
});

// Start the game loop
const gameLoop = setInterval(draw, speed);
