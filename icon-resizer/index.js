const filePicker = document.getElementById("file-picker");
const previewImage = document.getElementById("preview");
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
    resize(e.target.result);
  });
  reader.readAsArrayBuffer(file);
}

async function resize(buffer) {
  const imageLoader = await wasm_image_loader();
  const avif = await wasm_avif();
  const uint8Array = new Uint8Array(buffer);
  const decoded = imageLoader.decode(uint8Array, uint8Array.length, 4);
  const { channels, height, width } = imageLoader.dimensions();
  const resized = imageLoader.resize(decoded, width, height, channels, 40, 40);
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
  console.log(blob);
  previewImage.src = URL.createObjectURL(blob);
  imageLoader.free();
  avif.free();
}
