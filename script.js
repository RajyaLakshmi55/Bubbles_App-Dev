const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Circle and arrow properties
const circles = [
  { x: 100, y: 75, radius: 30, color: 'yellow', targetColor: 'lightyellow' },
  { x: 100, y: 175, radius: 30, color: 'blue', targetColor: 'lightblue' },
  { x: 100, y: 275, radius: 30, color: 'red', targetColor: 'pink' },
  { x: 100, y: 375, radius: 30, color: 'green', targetColor: 'lightgreen' }
];

const arrows = [
  { x: 700, y: 75, width: 40, height: 5, speed: 0 },
  { x: 700, y: 175, width: 40, height: 5, speed: 0 },
  { x: 700, y: 275, width: 40, height: 5, speed: 0 },
  { x: 700, y: 375, width: 40, height: 5, speed: 0 }
];

// Draw a single circle
function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}

// Draw a single arrow
function drawArrow(arrow) {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(arrow.x, arrow.y - arrow.height / 2, -arrow.width, arrow.height);
  ctx.closePath();
}

// Draw all elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(drawCircle);
  arrows.forEach(drawArrow);
}

// Move arrows
function moveArrows() {
  let allStopped = true;
  arrows.forEach((arrow, index) => {
    if (arrow.speed > 0) {
      arrow.x -= arrow.speed;
      if (arrow.x <= circles[index].x + circles[index].radius) {
        arrow.speed = 0;
        circles[index].color = circles[index].targetColor;
      } else {
        allStopped = false;
      }
    }
  });

  draw();
  if (!allStopped) {
    requestAnimationFrame(moveArrows);
  }
}

// Reset the game to its initial state
function resetGame() {
  arrows.forEach(arrow => (arrow.x = 700));
  circles.forEach(circle => (circle.color = circle.targetColor.replace('light', '')));
  draw();
}

// Detect circle click and trigger arrow movement
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  circles.forEach((circle, index) => {
    const dx = mouseX - circle.x;
    const dy = mouseY - circle.y;
    if (Math.sqrt(dx * dx + dy * dy) <= circle.radius) {
      arrows[index].speed = 2;
      moveArrows();
    }
  });
});

// Reset button event listener
document.getElementById('resetButton').addEventListener('click', resetGame);

// Initial draw
draw();