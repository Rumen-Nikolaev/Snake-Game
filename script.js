// Define the size of each block in pixels
let blockSize = 25;

// Total number of rows and columns in the game board
let totalRows = 17;
let totalCols = 17;

// Variables for the game board and drawing context
let board;
let context;

// Initial position of the snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Speed of the snake in each direction
let speedX = 0;
let speedY = 0;

// Array to store the segments of the snake's body
let snakeBody = [];

// Variables to store the position of the food
let foodX;
let foodY;

// Flag to track if the game is over
let gameOver = false;

// Execute after the window has loaded
window.onload = function () {
    // Get the canvas element and set its dimensions
    board = document.getElementById("board");
    board.height = totalRows * blockSize;
    board.width = totalCols * blockSize;
    context = board.getContext("2d");

    // Place initial food and set up event listener for key presses
    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Set up the game loop using setInterval, adjusting speed here (milliseconds)
    setInterval(update, 100);
}

// Function to update the game state
function update() {
    // Exit the function if game over
    if (gameOver) {
        return;
    }

    // Clear the board and draw the game area
    drawGameArea();

    // Draw the food on the board
    drawFood();

    // Check if snake eats the food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); // Add new segment to the snake's body
        placeFood(); // Place new food on the board
    }

    // Update the snake's position and body
    updateSnakePosition();

    // Draw the snake on the board
    drawSnake();

    // Check for collisions with boundaries or itself
    checkCollisions();
}

// Function to draw the game area
function drawGameArea() {
    // Fill the canvas with a green background
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
}

// Function to draw the snake on the board
function drawSnake() {
    // Draw the snake's head
    context.fillStyle = "white";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Draw each segment of the snake's body
    context.fillStyle = "gray";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

// Function to update the snake's position
function updateSnakePosition() {
    // Move each segment of the snake's body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]]; // Move each segment to the position of the previous segment
    }
    // Update the first segment of the snake to the new head position
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move the snake's head based on current speed
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
}

// Function to draw the food on the board
function drawFood() {
    // Draw the food at its position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

// Function to place the food randomly on the board
function placeFood() {
    // Generate random positions for the food within the board boundaries
    foodX = Math.floor(Math.random() * totalCols) * blockSize;
    foodY = Math.floor(Math.random() * totalRows) * blockSize;
}

// Function to check for collisions (boundary and self)
function checkCollisions() {
    // Check if snake hits the boundaries of the board
    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
        gameOver = true; // Set game over flag
        alert("Game Over! Out of bounds."); // Display game over message
    }

    // Check if snake collides with its own body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true; // Set game over flag
            alert("Game Over! Snake ate itself."); // Display game over message
        }
    }
}

// Function to handle key presses and change snake's direction
function changeDirection(e) {
    // Change snake's direction based on arrow key presses, avoiding opposite direction
    switch (e.code) {
        case "ArrowUp":
            if (speedY !== 1) {
                speedX = 0;
                speedY = -1;
            }
            break;
        case "ArrowDown":
            if (speedY !== -1) {
                speedX = 0;
                speedY = 1;
            }
            break;
        case "ArrowLeft":
            if (speedX !== 1) {
                speedX = -1;
                speedY = 0;
            }
            break;
        case "ArrowRight":
            if (speedX !== -1) {
                speedX = 1;
                speedY = 0;
            }
            break;
    }
}
