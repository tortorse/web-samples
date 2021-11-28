let app;
let container;
let background;
let cells;
let behaviors;
let graphics;
let zoomScale = 1;
let startPoint;
let containerStartPoint;
let isMouseDown = false;
let isDragging = false;
const domContainer = document.querySelector("#canvas");
const zoomInButton = document.querySelector("#zoom-in");
const zoomOutButton = document.querySelector("#zoom-out");
const gridSize = { width: 408, height: 408 };
const cellSize = { width: 10, height: 10 };
const appFillColor = 0x242336;
const cellHoverColor = 0xff33e7;
const cellFillColor = 0x2ac161;
const cellEmptyColor = 0xffffff;
const cellActiveColor = 0x00b0ff;

function setup() {
  PIXI.utils.skipHello();
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    backgroundColor: appFillColor,
  });

  domContainer.appendChild(app.view);

  background = new PIXI.Graphics();

  const backgroundImage = PIXI.Sprite.from("images/metaverse.png");

  background.addChild(backgroundImage);

  cells = new PIXI.Graphics();
  behaviors = new PIXI.Graphics();
  graphics = new PIXI.Graphics();
  container = new PIXI.Container();
  container.width = gridSize.width * cellSize.width;
  container.height = gridSize.height * cellSize.height;

  container.interactive = true;

  container.on("pointerdown", onDown);
  container.on("pointermove", onMove);
  container.on("pointerup", onUp);
  container.on("pointerupoutside", onUp);

  container.addChild(background);
  container.addChild(cells);
  container.addChild(behaviors);
  container.addChild(graphics);
  app.stage.addChild(container);

  window.addEventListener("resize", resize);

  resize();
}

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

function zoom(scale) {
  container.scale.set(scale);
}

function onDown(e) {
  if (e.data.global.y < window.innerHeight) {
    // save the mouse down position
    startPoint = { x: e.data.global.x, y: e.data.global.y };

    // set a flag to say the mouse is now down
    isMouseDown = true;
  }
}

function onMove(e) {
  // check if mouse is down (in other words
  // check if the user has clicked or touched
  // down and not yet lifted off)
  if (isMouseDown) {
    // if not yet detected a drag then...
    if (!isDragging) {
      // we get the mouses current position
      let position = e.data.global;
      // and check if that new position has
      // move more than 5 pixels in any direction
      // from the first mouse down position
      if (
        Math.abs(startPoint.x - position.x) > 5 ||
        Math.abs(startPoint.y - position.y) > 5
      ) {
        // if it has we can assume the user
        // is trying to draw the view around
        // and not clicking. We store the
        // graphics current position do we
        // can offset its postion with the
        // mouse position later.
        containerStartPoint = {
          x: container.position.x,
          y: container.position.y,
        };

        // set the flag to say we are dragging
        isDragging = true;
      }
    }
    if (isDragging) {
      // update the graphics position based
      // on the mouse position, offset with the
      // start and graphics orginal positions
      container.position.x =
        e.data.global.x - startPoint.x + containerStartPoint.x;
      container.position.y =
        e.data.global.y - startPoint.y + containerStartPoint.y;
    }
  }
}

function onUp(e) {
  // ignore the mouse up if the mouse down
  if (isMouseDown) {
    // clear mouseDown flag
    isMouseDown = false;
    // if the dragging flag was never set
    // during all the mouse moves then this
    // is a click
    if (!isDragging) {
      // get the mouse position
      let position = e.data.global;
      // and check if the mouse is within
      // the bounds of the graphics
      const localPosition = container.toLocal(position);

      if (
        localPosition.x > 0 &&
        localPosition.x < container.width &&
        localPosition.y > 0 &&
        localPosition.y < container.height
      ) {
        // if it is then we can assume the user
        // has clicked on the graphics
        // and not dragged it. We can use the
        // mouse position to get the cell
        // that was clicked on.
        let x = Math.floor(localPosition.x / cellSize.width);
        let y = Math.floor(localPosition.y / cellSize.height);
        const cell = data.find(
          (cell) => cell.position.x === x && cell.position.y === y
        );
        const size = cell.content.size
        if (size) {
          behaviors.clear();
          behaviors.beginFill(cellHoverColor);
          behaviors.drawRect(
            x * cellSize.width + 1,
            y * cellSize.width + 1,
            cellSize.width * size - 2,
            cellSize.height * size - 2
          );
        }
      }
    }
    isDragging = false;
  }
}

function renderCells(data) {
  data.forEach((cell) => {
    let { position, content } = cell;
    let { x, y } = position;
    let { color, image, size } = content;

    cells.beginFill(parseInt("0x" + color), 1);
    cells.drawRect(
      x * cellSize.width + 1,
      y * cellSize.height + 1,
      cellSize.width * size - 2,
      cellSize.height * size - 2
    );
    if (image) {
      const cellImage = new PIXI.Sprite.from(image);
      cellImage.position.x = x * cellSize.width + 2;
      cellImage.position.y = y * cellSize.height + 2;
      cellImage.width = size * cellSize.width - 4;
      cellImage.height = size * cellSize.height - 4;
      graphics.addChild(cellImage);
    }
  });
}

zoomInButton.addEventListener("click", () => {
  if (zoomScale < 2) {
    zoomScale += 0.15;
    zoom(zoomScale);
  }
});

zoomOutButton.addEventListener("click", () => {
  if (zoomScale > 0.55) {
    zoomScale -= 0.15;
    zoom(zoomScale);
  }
});

setup();

const data = [
  {
    id: 1,
    position: { x: 0, y: 0 },
    content: {
      color: "2ac161",
      image: "images/logo.jpg",
      size: 12,
    },
  },
  {
    position: { x: 12, y: 0 },
    content: {
      color: "00b0ff",
      image: "images/TSB_Estate_Logo.webp",
      size: 3,
    },
  },
  {
    position: { x: 14, y: 10 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 15, y: 10 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 16, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 17, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 18, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 22, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 24, y: 5 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 31, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 31, y: 1 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 31, y: 2 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 31, y: 3 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 31, y: 4 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 32, y: 0 },
    content: {
      color: "00b0ff",
      size: 1,
    },
  },
  {
    position: { x: 33, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 34, y: 0 },
    content: {
      color: "2ac161",
      size: 1,
    },
  },
  {
    position: { x: 35, y: 0 },
    content: {
      color: "ffffff",
      size: 1,
    },
  },
  {
    position: { x: 32, y: 1 },
    content: {
      color: "2ac161",
      size: 4,
    },
  },
  {
    position: { x: 35, y: 0 },
    content: {
      color: "ffffff",
    },
  },
  {
    position: { x: 38, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 41, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 42, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 43, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 44, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 45, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 46, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 52, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 69, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 70, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 31, y: 1 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 32, y: 1 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 33, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 34, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 35, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 36, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 37, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 38, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 39, y: 0 },
    content: {
      color: "2ac161",
    },
  },
];

renderCells(data);
