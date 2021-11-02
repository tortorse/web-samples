const image = new Image();
image.crossOrigin = "anonymous";
image.src = "./star-fill.png";

const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

image.addEventListener("load", () => {
  canvasContext.drawImage(image, 0, 0);
});

const original = () => {
  canvasContext.drawImage(img, 0, 0);
};

const invert = function () {
  canvasContext.drawImage(image, 0, 0);
  const imageData = canvasContext.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  canvasContext.putImageData(imageData, 0, 0);
};

const setColor = function () {
  canvasContext.drawImage(image, 0, 0);
  const imageData = canvasContext.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255; // red
    data[i + 1] = 255; // green
    data[i + 2] = 0; // blue
  }
  canvasContext.putImageData(imageData, 0, 0);
};

let hue = 0;
let saturation = 1;
let lightness = 0.5;

const hueRangeHandle = document.querySelector("#hue");

hueRangeHandle.addEventListener("input", (event) => {
  const { value } = event.target;
  document.querySelector("#hueValue").innerText = value;
  hue = value / 360;
  let rgb = hslToRgb(hue, saturation, lightness);
  setHue(...rgb);
});

const saturationRangeHandle = document.querySelector("#saturation");

saturationRangeHandle.addEventListener("input", (event) => {
  const { value } = event.target;
  document.querySelector("#saturationValue").innerText = value;
  saturation = value / 100;
  let rgb = hslToRgb(hue, saturation, lightness);
  setHue(...rgb);
});

const lightnessRangeHandle = document.querySelector("#lightness");

lightnessRangeHandle.addEventListener("input", (event) => {
  const { value } = event.target;
  document.querySelector("#lightnessValue").innerText = value;
  lightness = value / 100;
  let rgb = hslToRgb(hue, saturation, lightness);
  setHue(...rgb);
});

const setHue = (r, g, b) => {
  canvasContext.drawImage(image, 0, 0);
  canvasContext.imageSmoothingEnabled = true;
  const imageData = canvasContext.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = r; // red
    data[i + 1] = g; // green
    data[i + 2] = b; // blue
  }
  canvasContext.putImageData(imageData, 0, 0);
};

const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
