const canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 1000;
const borderColor = "#1b1f1c";
const fillColor = "#4d524e";
const activeFillColor = "#00eb37";
const ctx = canvas.getContext("2d");

let width = 10;
let height = 10;
let x = 0;
let y = 0;

for (let i = 1; i <= 100; i++) {
  for (let j = 1; j <= 100; j++) {
    drawCell(x, y, fillColor);
    x += width;
  }
  y += height;
  x = 0;
}

function drawCell(x, y, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(x, y, width, height);
}

canvas.addEventListener("mousedown", onPointerDown);
canvas.addEventListener("mouseup", onPointerUp);
canvas.addEventListener("mousemove", onPointerMove);

let point = { x: 0, y: 0 };

function onPointerDown(e) {
  point = { x: e.offsetX, y: e.offsetY };
  activeCell(point);
}

function onPointerUp(e) {}

function onPointerMove(e) {}

function getEventLocation(e) {}

function activeCell(point) {
  const { x, y } = point;
  const cellX = Math.ceil(x / width) * width - width;
  const cellY = Math.ceil(y / height) * height - width;
  drawCell(cellX, cellY, activeFillColor);
  showPopup(cellX, cellY);
}

function showPopup(left, top) {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.style.left = `${left - width}px`;
  popup.style.top = `${top - height - 53}px`;
}
