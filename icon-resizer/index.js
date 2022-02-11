const filePicker = document.getElementById("file-picker");
const preview = document.getElementById("preview");
filePicker.addEventListener("change", getFile);

function getFile(e) {
  const file = e.target.files[0];
  if (file) {
    readFile(file);
  }
}

function readFile(file) {
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    batchResize(e.target.result);
  });
  reader.readAsArrayBuffer(file);
}

const iconMap = [
  20, 29, 36, 40, 48, 58, 60, 72, 76, 80, 96, 120, 152, 167, 180, 192, 512,
];

async function batchResize(buffer) {
  console.time("icon-resize");
  for (let i = 0; i < iconMap.length; i++) {
    const image = new Image();
    const blob = await resize(buffer, { size: iconMap[i] });
    const url = URL.createObjectURL(blob);
    image.src = url;
    preview.appendChild(image);
  }
  console.timeEnd("icon-resize");
}
async function resize(buffer, options) {
  const { size } = options;
  const imageLoader = await wasm_image_loader();
  const avif = await wasm_avif();
  const uint8Array = new Uint8Array(buffer);
  const decoded = imageLoader.decode(uint8Array, uint8Array.length, 4);
  const { channels, height, width } = imageLoader.dimensions();
  const resized = imageLoader.resize(
    decoded,
    width,
    height,
    channels,
    size,
    size
  );
  const { width: outWidth, height: outHeight } = imageLoader.dimensions();
  const encoded = avif.encode(
    resized,
    outWidth,
    outHeight,
    channels,
    {
      minQuantizer: 0,
      maxQuantizer: 0,
      minQuantizerAlpha: 0,
      maxQuantizerAlpha: 0,
      tileRowsLog2: 0,
      tileColsLog2: 0,
      speed: 10,
    },
    3
  );
  const blob = new Blob([encoded], { type: "image/png" });
  imageLoader.free();
  avif.free();
  return blob;
}
