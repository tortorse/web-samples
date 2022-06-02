const fileInput = document.querySelector("#file");
const preivewContainer = document.querySelector("#preview");
const resultContainer = document.querySelector("#result");
async function initSvg2PngWasm() {
  await svg2pngWasm.initialize(
    fetch("./svg2png_wasm_bg.wasm")
  );
}
fileInput.addEventListener("change", getFiles);
initSvg2PngWasm();
function getFiles(e) {
  const files = e.target.files;
  removePreviewImages();
  removeResultImages();
  for (let i = 0; i < files.length; i++) {
    renderPreviewImage(files[i]);
    readFile(files[i]);
  }
}
function readFile(file) {
  if (isSvg(file)) {
    const reader = new FileReader();
    reader.addEventListener("load", async (e) => {
      const buffer = await svg2pngWasm.svg2png(e.target.result);
      renderResultImage(buffer);
    });
    reader.readAsText(file);
  }
}

function renderResultImage(buffer) {
  const box = document.createElement("div");
  box.setAttribute("class", "item");
  const header = document.createElement("div");
  header.setAttribute("class", "header");
  const size = document.createElement("span");
  const blob = new Blob([buffer], { type: "image/png" });
  size.innerText = `${blob.size}Byte`;
  const image = new Image();
  image.src = getFileURL(blob);
  box.appendChild(image);
  box.appendChild(size);
  resultContainer.appendChild(box);
}

function renderPreviewImage(file) {
  const box = document.createElement("div");
  box.setAttribute("class", "item");
  const header = document.createElement("div");
  header.setAttribute("class", "header");
  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.innerHTML = "Origin SVG";
  const size = document.createElement("span");
  size.innerText = `${file.size}Byte`;
  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerHTML = file.name;
  const image = new Image();
  image.src = getFileURL(file);
  header.appendChild(title);
  header.appendChild(name);
  header.appendChild(size);
  box.appendChild(header);
  box.appendChild(image);
  preivewContainer.appendChild(box);
}

function removePreviewImages() {
  preivewContainer.innerHTML = "";
}

function removeResultImages() {
  resultContainer.innerHTML = "";
}

function getFileURL(file) {
  return URL.createObjectURL(file);
}

function isSvg(file) {
  const { type } = file;
  return type && file.type === "image/svg+xml";
}
