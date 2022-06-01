const colorPicker = document.querySelector(".color-picker");
const canvas = document.querySelector(".canvas");
const scale = document.querySelector(".scale");
const frame = document.querySelector(".frame");
const addTextButton = document.querySelector(".add-text");
const addImageButton = document.querySelector(".add-image");
const imageFilePicker = document.querySelector(".file-picker");
const preview = document.querySelector(".preview");
const generateButton = document.querySelector(".generate");
colorPicker.addEventListener("change", (e) => {
  canvas.style.backgroundColor = e.target.value;
});

let scaleRatio = 1;

scale.addEventListener("change", (e) => {
  scaleRatio = e.target.value / 100;
  frame.style.transform = `scale(${scaleRatio})`;
});

addTextButton.addEventListener("click", () => {
  createText();
});
let elements = [];
function createText() {
  const text = document.createElement("span");
  text.innerText = "text";
  text.className = "text vertical-align-center horizontal-align-center";
  text.style.fontSize = "24px";
  text.draggable = true;
  const id = "text-" + Date.now();
  text.id = id;
  canvas.appendChild(text);
  getTextBehavior(id);
  elements.push(text);
}

addImageButton.addEventListener("click", () => {
  createImage();
});

let imageFile;

imageFilePicker.addEventListener("change", (e) => {
  imageFile = e.target.files[0];
});

function createImage() {
  const image = new Image();
  image.draggable = true;
  image.className = "image vertical-align-center horizontal-align-center";
  const id = "image-" + Date.now();
  image.id = id;
  image.src = URL.createObjectURL(imageFile);
  canvas.appendChild(image);
  getImageBehavior(id);
  elements.push(image);
}
function getTextBehavior(id) {
  const textNode = document.querySelector(`#${id}`);
  textNode.addEventListener("click", (e) => {
    onclick(e);
  });
  textNode.addEventListener("blur", (e) => {
    onBlur(e);
  });
  textNode.addEventListener("dblclick", (e) => {
    onDoubleClick(e);
  });
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

function getImageBehavior(id) {
  const imageNode = document.querySelector(`#${id}`);
  imageNode.addEventListener("dragstart", (e) => {
    onDragStart(e);
  });
  imageNode.addEventListener("drag", (e) => {
    onDrag(e);
  });
  imageNode.addEventListener("dragend", (e) => {
    onDragEnd(e);
  });
}

function onDragStart(e) {}

function onDrag(e) {}
function onDragEnd(e) {
  const canvasPosition = canvas.getBoundingClientRect();
  e.target.classList.remove("vertical-align-center");
  e.target.classList.remove("horizontal-align-center");
  e.target.style.left = `${
    (e.pageX - window.scrollX - canvasPosition.left) / scaleRatio
  }px`;
  e.target.style.top = `${
    (e.pageY - window.scrollY - canvasPosition.top) / scaleRatio
  }px`;
  e.target.style.transform = "translateX(-50%) translateY(-50%)";
}

function onDoubleClick(e) {
  e.target.contentEditable = true;
  e.target.focus();
}

function onBlur(e) {
  e.target.contentEditable = false;
}

function onclick(e) {
  console.log(e);
}

generateButton.addEventListener("click", () => {
  draw();
});

function draw() {
  const ctx = preview.getContext("2d");

  ctx.fillStyle =
    canvas.style.backgroundColor === ""
      ? "#ffffff"
      : canvas.style.backgroundColor;
  ctx.fillRect(0, 0, 375, 667);
  if (elements) {
    elements.forEach((element) => {
      ctx.fillStyle = "#ff00ff";
      ctx.font = "48px serif";
      ctx.fillText("Hello world", 10, 50);
    });
  }
}
