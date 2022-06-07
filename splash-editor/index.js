const fillColorPicker = document.querySelector(".fill-color-picker");
const canvas = document.querySelector(".canvas");
const scale = document.querySelector(".scale");
const frame = document.querySelector(".frame");
const addTextButton = document.querySelector(".add-text");
const addImageButton = document.querySelector(".add-image");
const imageFilePicker = document.querySelector(".file-picker");
const preview = document.querySelector(".preview");
const generateButton = document.querySelector(".generate");
const strokeColorPicker = document.querySelector(".stroke-color-picker");
const textConfigPanel = document.querySelector(".text-config-panel");
const textColor = document.querySelector(".text-color");



textColor.addEventListener("click", (e) => {
  strokeColorPicker.click();
});
let selectedElementId;
fillColorPicker.addEventListener("input", (e) => {
  canvas.style.backgroundColor = e.target.value;
});

strokeColorPicker.addEventListener("input", (e) => {
  const selectedElement = document.querySelector(`#${selectedElementId}`);
  selectedElement.style.color = e.target.value;
});

strokeColorPicker.addEventListener("change", (e) => {
  elementUnselected();
});

function elementSelected() {
  const selectedElement = document.querySelector(`#${selectedElementId}`);
  selectedElement.classList.add("selected");
  strokeColorPicker.disabled = false;
  textColor.classList.remove("disabled");
}

function elementUnselected() {
  const selectedElement = document.querySelector(`#${selectedElementId}`);
  selectedElement.classList.remove("selected");
  selectedElementId = undefined;
  strokeColorPicker.disabled = true;
  textColor.classList.add("disabled");
}

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
  imageFilePicker.click();
});

imageFilePicker.addEventListener("change", (e) => {
  const imageFile = e.target.files[0];
  createImage(imageFile);
});

function createImage(imageFile) {
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
frame.addEventListener("dragover", (e) => {
  onDragOver(e);
});
frame.addEventListener("dragenter", (e) => {
  onDragEnter(e);
});
frame.addEventListener("click", (e) => {
  if (selectedElementId) {
    elementUnselected();
  }
});
function getTextBehavior(id) {
  const textNode = document.querySelector(`#${id}`);
  textNode.addEventListener("click", (e) => {
    onClick(e);
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

function onDragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
}

function onDrag(e) {}
function onDragEnd(e) {
  e.preventDefault();

  const canvasPosition = canvas.getBoundingClientRect();
  e.target.classList.remove("vertical-align-center");
  e.target.classList.remove("horizontal-align-center");
  const { width, height } = e.target.getBoundingClientRect();
  e.target.style.left = `${
    (e.pageX - window.scrollX - canvasPosition.left - width / 2) / scaleRatio
  }px`;
  e.target.style.top = `${
    (e.pageY - window.scrollY - canvasPosition.top - height / 2) / scaleRatio
  }px`;
}

function onDragEnter(e) {
  e.preventDefault();
}

function onDragOver(e) {
  e.preventDefault();
}
function onDoubleClick(e) {
  e.target.contentEditable = true;
  e.target.focus();
}
function onClick(e) {
  e.stopPropagation();
  selectedElementId = e.target.id;
  elementSelected();
}
function onBlur(e) {
  e.target.contentEditable = false;
}

generateButton.addEventListener("click", () => {
  draw();
});

function draw() {
  const ctx = preview.getContext("2d");
  const _canvas = {
    width: 540,
    height: 1170,
  };
  preview.width = _canvas.width;
  preview.height = _canvas.height;
  ctx.fillStyle =
    canvas.style.backgroundColor === ""
      ? "#ffffff"
      : canvas.style.backgroundColor;
  ctx.fillRect(0, 0, _canvas.width, _canvas.height);
  if (elements) {
    elements.forEach((element) => {
      const { width, height } = element.getBoundingClientRect();
      if (element.nodeName === "SPAN") {
        ctx.fillStyle =
          element.style.color === "" ? "#000000" : element.style.color;
        ctx.font = `${element.style.fontSize} serif`;
        const x = element.style.left
          ? Number(element.style.left.replace("px", ""))
          : _canvas.width / 2 - width / 2;
        const y = element.style.top
          ? Number(element.style.top.replace("px", ""))
          : _canvas.height / 2 - height / 2;
        ctx.fillText(element.innerText, x, y);
      }
      if (element.nodeName === "IMG") {
        const x = element.style.left
          ? Number(element.style.left.replace("px", ""))
          : _canvas.width / 2 - width / 2;
        const y = element.style.top
          ? Number(element.style.top.replace("px", ""))
          : _canvas.height / 2 - height / 2;
        ctx.drawImage(element, x, y);
      }
    });
  }

  preview.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url);
    URL.revokeObjectURL(url);
  });
}
