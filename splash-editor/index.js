const colorPicker = document.querySelector(".color-picker");
const canvas = document.querySelector(".canvas");
const scale = document.querySelector(".scale");
const frame = document.querySelector(".frame");
const addTextButton = document.querySelector(".add-text");

colorPicker.addEventListener("change", (e) => {
  canvas.style.backgroundColor = e.target.value;
});

scale.addEventListener("input", (e) => {
  frame.style.transform = `scale(${e.target.value}%)`;
});

addTextButton.addEventListener("click", () => {
  createText();
});
let originX;
let originY;
function createText() {
  const text = document.createElement("span");
  text.innerText = "text";
  text.className = "text vertical-align-center horizontal-align-center";
  text.style.fontSize = "24px";
  text.style.color = "#333333";
  text.draggable = true;
  canvas.appendChild(text);
  const textNode = document.querySelector(".text");
  originX = textNode.offsetLeft;
  originY = textNode.offsetTop;
  textNode.addEventListener("dragstart", (e) => {
    onDragStart(e);
  });
  textNode.addEventListener("drag", (e) => {
    onDrag(e);
  });
  textNode.addEventListener("dragend", (e) => {
    onDragEnd(e);
  });
}

function onDragStart(e) {
  console.log("start", e);
}
function onDrag(e) {}
function onDragEnd(e) {
  e.target.classList.remove("vertical-align-center");
  e.target.classList.remove("horizontal-align-center");
  console.dir(e.target);
}
