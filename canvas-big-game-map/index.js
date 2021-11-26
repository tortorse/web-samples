const canvas = document.getElementById("canvas");
const backgroundColor = '#242336'
canvas.style.backgroundColor = backgroundColor;
canvas.width = 1000;
canvas.height = 1000;
const borderColor = "#1b1f1c";
const fillColor = "#4d524e";
const activeFillColor = "#00eb37";
const ctx = canvas.getContext("2d");

let size = 10;
let x = 0;
let y = 0;

for (let i = 1; i <= 256; i++) {
  for (let j = 1; j <= 256; j++) {
    drawCell(x, y, fillColor);
    x += size;
  }
  y += size;
  x = 0;
}

function drawCell(x, y, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(x, y, size, size);
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
  const cellX = Math.ceil(x / size) * size - size;
  const cellY = Math.ceil(y / size) * size - size;
  drawCell(cellX, cellY, activeFillColor);
  showPopup(cellX, cellY);
}

function showPopup(left, top) {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.style.left = `${left - size}px`;
  popup.style.top = `${top - size - 53}px`;
}
