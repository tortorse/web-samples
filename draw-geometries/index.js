const data = {
  id: 4,
  tag: "GuiLayout",
  children: [
    {
      id: 203,
      tag: "FormItem",
      coordinates: { minX: 48, minY: 48, maxX: 467.515625, maxY: 87.984375 },
    },
    {
      id: 394,
      tag: "Input",
      coordinates: { minX: 128, minY: 52, maxX: 467.515625, maxY: 84 },
    },
    {
      id: 210,
      tag: "FormItem",
      coordinates: {
        minX: 515.515625,
        minY: 48,
        maxX: 924.46875,
        maxY: 87.984375,
      },
    },
    {
      id: 419,
      tag: "Input",
      coordinates: { minX: 595.515625, minY: 48, maxX: 924.46875, maxY: 80 },
    },
    {
      id: 409,
      tag: "FormItem",
      coordinates: {
        minX: 972.46875,
        minY: 48,
        maxX: 1391.984375,
        maxY: 87.984375,
      },
    },
    {
      id: 411,
      tag: "Input",
      coordinates: { minX: 1052.46875, minY: 52, maxX: 1391.984375, maxY: 84 },
    },
    {
      id: 232,
      tag: "FormItem",
      coordinates: {
        minX: 48,
        minY: 111.984375,
        maxX: 467.515625,
        maxY: 151.96875,
      },
    },
    {
      id: 234,
      tag: "Select",
      coordinates: {
        minX: 98,
        minY: 115.984375,
        maxX: 467.515625,
        maxY: 147.984375,
      },
    },
    {
      id: 416,
      tag: "Button",
      coordinates: {
        minX: 515.515625,
        minY: 115.984375,
        maxX: 575.515625,
        maxY: 147.984375,
      },
    },
    {
      id: 417,
      tag: "Button",
      coordinates: {
        minX: 583.515625,
        minY: 115.984375,
        maxX: 643.515625,
        maxY: 147.984375,
      },
    },
    {
      id: 193,
      tag: "TableTemplateView",
      coordinates: { minX: 48, minY: 224.96875, maxX: 1392, maxY: 340.96875 },
    },
    {
      id: 195,
      tag: "Page",
      coordinates: { minX: 1120, minY: 364.96875, maxX: 1392, maxY: 396.96875 },
    },
  ],
  coordinates: { minX: 504.5, minY: 200, maxX: 1944.5, maxY: 1069 },
};

const rootDom = document.createElement("div");
rootDom.style.width = `${data.coordinates.maxX - data.coordinates.minX}px`;
rootDom.style.height = `${data.coordinates.maxY - data.coordinates.minY}px`;
rootDom.style.position = "relative";
// rootDom.style.backgroundColor = randomColor();
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

function randomColor(opacity) {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  let alpha = opacity ? "80" : "FF";
  const hexColor = "#" + ("000000" + color).slice(-6) + alpha;
  return hexColor;
}

const rTree = new RBush(data.children.length);
data.children.forEach((item) => {
  rTree.insert({ ...item.coordinates, tag: item.tag, id: item.id });
});


let rectangles = [];
let lastId;
rTree.data.children.forEach((rect) => {
  const neighbors = knn(
    rTree,
    rect.maxX,
    rect.maxY,
    3,
    (item) => item.id !== rect.id
  );
  const neighbor = neighbors.sort((a, b) => {
    return (
      Math.abs(rect.maxY - a.maxY) -
      Math.abs(rect.maxY - b.maxY) +
      Math.abs(rect.maxX - a.maxX) -
      Math.abs(rect.maxX - b.maxX)
    );
  })[0];
  // const neighbor = neighbors[0];
  console.log(rect.tag, neighbors, neighbor);
  const rectangleId = rect.id + "|" + neighbor.id;
  const rectangleTag = rect.tag + "|" + neighbor.tag;
  const rectangle = {
    id: rectangleId,
    tag: rectangleTag,
    minX: Math.min(rect.minX, neighbor.minX),
    maxX: Math.max(rect.maxX, neighbor.maxX),
    minY: Math.min(rect.minY, neighbor.minY),
    maxY: Math.max(rect.maxY, neighbor.maxY),
  };
  if (getReverseId(rectangleId) !== lastId) {
    rectangles.push(rectangle);
    lastId = rectangleId;
  }
});

rectangles.forEach((rect) => {
  const rectDom = document.createElement("div");
  rectDom.style.position = "absolute";
  rectDom.style.width = `${rect.maxX - rect.minX}px`;
  rectDom.style.height = `${rect.maxY - rect.minY}px`;
  rectDom.style.left = `${rect.minX}px`;
  rectDom.style.top = `${rect.minY}px`;
  rectDom.style.borderColor = "#ff00ff";
  rectDom.style.borderWidth = "1px";
  rectDom.style.borderStyle = "solid";
  rootDom.appendChild(rectDom);
});

function getReverseId(id) {
  return id.split("|").reverse().join("|");
}
