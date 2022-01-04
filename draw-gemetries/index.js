const data = {
  tag: "GuiLayout",
  children: [
    {
      tag: "FormItem",
      coordinates: { minX: 48, minY: 48, maxX: 467.515625, maxY: 87.984375 },
    },
    {
      tag: "Input",
      coordinates: { minX: 128, minY: 52, maxX: 467.515625, maxY: 84 },
    },
    {
      tag: "FormItem",
      coordinates: {
        minX: 515.515625,
        minY: 48,
        maxX: 924.46875,
        maxY: 87.984375,
      },
    },
    {
      tag: "Input",
      coordinates: { minX: 595.515625, minY: 48, maxX: 924.46875, maxY: 80 },
    },
    {
      tag: "FormItem",
      coordinates: {
        minX: 972.46875,
        minY: 48,
        maxX: 1391.984375,
        maxY: 87.984375,
      },
    },
    {
      tag: "Input",
      coordinates: { minX: 1052.46875, minY: 52, maxX: 1391.984375, maxY: 84 },
    },
    {
      tag: "FormItem",
      coordinates: {
        minX: 48,
        minY: 111.984375,
        maxX: 467.515625,
        maxY: 151.96875,
      },
    },
    {
      tag: "Select",
      coordinates: {
        minX: 98,
        minY: 115.984375,
        maxX: 467.515625,
        maxY: 147.984375,
      },
    },
    {
      tag: "Option",
      coordinates: { minX: -504.5, minY: -200, maxX: -504.5, maxY: -200 },
    },
    {
      tag: "Button",
      coordinates: {
        minX: 515.515625,
        minY: 115.984375,
        maxX: 575.515625,
        maxY: 147.984375,
      },
    },
    {
      tag: "Button",
      coordinates: {
        minX: 583.515625,
        minY: 115.984375,
        maxX: 643.515625,
        maxY: 147.984375,
      },
    },
    {
      tag: "TableTemplateView",
      coordinates: { minX: 48, minY: 224.96875, maxX: 1392, maxY: 342.96875 },
    },
    {
      tag: "Page",
      coordinates: { minX: 1120, minY: 366.96875, maxX: 1392, maxY: 398.96875 },
    },
  ],
  coordinates: { minX: 504.5, minY: 200, maxX: 1944.5, maxY: 1069 },
};

const rootDom = document.createElement("div");
rootDom.style.width = `${data.coordinates.maxX - data.coordinates.minX}px`;
rootDom.style.height = `${data.coordinates.maxY - data.coordinates.minY}px`;
rootDom.style.position = "relative";
rootDom.style.backgroundColor = randomColor();
document.body.appendChild(rootDom);

data.children.forEach((rect) => {
  const rectDom = document.createElement("div");
  rectDom.style.position = "absolute";
  rectDom.style.width = `${rect.coordinates.maxX - rect.coordinates.minX}px`;
  rectDom.style.height = `${rect.coordinates.maxY - rect.coordinates.minY}px`;
  rectDom.style.left = `${rect.coordinates.minX}px`;
  rectDom.style.top = `${rect.coordinates.minY}px`;
  rectDom.style.backgroundColor = randomColor(true);
  rectDom.innerHTML = rect.tag;
  rootDom.appendChild(rectDom);
});

function randomColor(isOpaque) {
  const alpha = isOpaque ? "50" : "FF";
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}${alpha}`;
}
