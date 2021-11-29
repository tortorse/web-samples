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
const gridSize = { width: 2000, height: 2000 };
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
    // antialias: true,
    backgroundColor: appFillColor,
    forceCanvas: true,
  });

  domContainer.appendChild(app.view);

  background = new PIXI.Graphics();

  const backgroundImage = PIXI.Sprite.from("images/map.png");

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
        if (cell) {
          let { content, size, locatedIn } = cell;
          if (content && size) {
            behaviors.clear();
            behaviors.beginFill(cellHoverColor);
            behaviors.drawRect(
              x * cellSize.width + 1,
              y * cellSize.width + 1,
              cellSize.width * size - 2,
              cellSize.height * size - 2
            );
          }
          if (locatedIn) {
            const mainCell = data.find((cell) => cell.id === locatedIn);
            let { position, size } = mainCell;
            let { x, y } = position;
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
    }
    isDragging = false;
  }
}

function renderCells(data) {
  data.forEach((cell) => {
    let { position, content, size } = cell;
    let { x, y } = position;
    if (content && size) {
      let { color, image } = content;
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
  if (zoomScale >= 0.18) {
    zoomScale -= 0.15 * 0.5;
    zoom(zoomScale);
  }
});

setup();

const data = [
  {
    id: 1,
    position: { x: 0, y: 0 },
    size: 12,
    content: {
      color: "2ac161",
      image: "images/logo.jpg",
    },
  },
  { id: 2, position: { x: 0, y: 0 }, locatedIn: 1 },
  { id: 3, position: { x: 1, y: 0 }, locatedIn: 1 },
  { id: 4, position: { x: 2, y: 0 }, locatedIn: 1 },
  { id: 5, position: { x: 3, y: 0 }, locatedIn: 1 },
  { id: 6, position: { x: 4, y: 0 }, locatedIn: 1 },
  { id: 7, position: { x: 5, y: 0 }, locatedIn: 1 },
  { id: 8, position: { x: 6, y: 0 }, locatedIn: 1 },
  { id: 9, position: { x: 7, y: 0 }, locatedIn: 1 },
  { id: 10, position: { x: 8, y: 0 }, locatedIn: 1 },
  { id: 11, position: { x: 9, y: 0 }, locatedIn: 1 },
  { id: 12, position: { x: 10, y: 0 }, locatedIn: 1 },
  { id: 13, position: { x: 11, y: 0 }, locatedIn: 1 },
  { id: 14, position: { x: 0, y: 1 }, locatedIn: 1 },
  { id: 15, position: { x: 1, y: 1 }, locatedIn: 1 },
  { id: 16, position: { x: 2, y: 1 }, locatedIn: 1 },
  { id: 17, position: { x: 3, y: 1 }, locatedIn: 1 },
  { id: 18, position: { x: 4, y: 1 }, locatedIn: 1 },
  { id: 19, position: { x: 5, y: 1 }, locatedIn: 1 },
  { id: 20, position: { x: 6, y: 1 }, locatedIn: 1 },
  { id: 21, position: { x: 7, y: 1 }, locatedIn: 1 },
  { id: 22, position: { x: 8, y: 1 }, locatedIn: 1 },
  { id: 23, position: { x: 9, y: 1 }, locatedIn: 1 },
  { id: 24, position: { x: 10, y: 1 }, locatedIn: 1 },
  { id: 25, position: { x: 11, y: 1 }, locatedIn: 1 },
  { id: 26, position: { x: 0, y: 2 }, locatedIn: 1 },
  { id: 27, position: { x: 1, y: 2 }, locatedIn: 1 },
  { id: 28, position: { x: 2, y: 2 }, locatedIn: 1 },
  { id: 29, position: { x: 3, y: 2 }, locatedIn: 1 },
  { id: 30, position: { x: 4, y: 2 }, locatedIn: 1 },
  { id: 31, position: { x: 5, y: 2 }, locatedIn: 1 },
  { id: 32, position: { x: 6, y: 2 }, locatedIn: 1 },
  { id: 33, position: { x: 7, y: 2 }, locatedIn: 1 },
  { id: 34, position: { x: 8, y: 2 }, locatedIn: 1 },
  { id: 35, position: { x: 9, y: 2 }, locatedIn: 1 },
  { id: 36, position: { x: 10, y: 2 }, locatedIn: 1 },
  { id: 37, position: { x: 11, y: 2 }, locatedIn: 1 },
  { id: 38, position: { x: 0, y: 3 }, locatedIn: 1 },
  { id: 39, position: { x: 1, y: 3 }, locatedIn: 1 },
  { id: 40, position: { x: 2, y: 3 }, locatedIn: 1 },
  { id: 41, position: { x: 3, y: 3 }, locatedIn: 1 },
  { id: 42, position: { x: 4, y: 3 }, locatedIn: 1 },
  { id: 43, position: { x: 5, y: 3 }, locatedIn: 1 },
  { id: 44, position: { x: 6, y: 3 }, locatedIn: 1 },
  { id: 45, position: { x: 7, y: 3 }, locatedIn: 1 },
  { id: 46, position: { x: 8, y: 3 }, locatedIn: 1 },
  { id: 47, position: { x: 9, y: 3 }, locatedIn: 1 },
  { id: 48, position: { x: 10, y: 3 }, locatedIn: 1 },
  { id: 49, position: { x: 11, y: 3 }, locatedIn: 1 },
  { id: 50, position: { x: 0, y: 4 }, locatedIn: 1 },
  { id: 51, position: { x: 1, y: 4 }, locatedIn: 1 },
  { id: 52, position: { x: 2, y: 4 }, locatedIn: 1 },
  { id: 53, position: { x: 3, y: 4 }, locatedIn: 1 },
  { id: 54, position: { x: 4, y: 4 }, locatedIn: 1 },
  { id: 55, position: { x: 5, y: 4 }, locatedIn: 1 },
  { id: 56, position: { x: 6, y: 4 }, locatedIn: 1 },
  { id: 57, position: { x: 7, y: 4 }, locatedIn: 1 },
  { id: 58, position: { x: 8, y: 4 }, locatedIn: 1 },
  { id: 59, position: { x: 9, y: 4 }, locatedIn: 1 },
  { id: 60, position: { x: 10, y: 4 }, locatedIn: 1 },
  { id: 61, position: { x: 11, y: 4 }, locatedIn: 1 },
  { id: 62, position: { x: 0, y: 5 }, locatedIn: 1 },
  { id: 63, position: { x: 1, y: 5 }, locatedIn: 1 },
  { id: 64, position: { x: 2, y: 5 }, locatedIn: 1 },
  { id: 65, position: { x: 3, y: 5 }, locatedIn: 1 },
  { id: 66, position: { x: 4, y: 5 }, locatedIn: 1 },
  { id: 67, position: { x: 5, y: 5 }, locatedIn: 1 },
  { id: 68, position: { x: 6, y: 5 }, locatedIn: 1 },
  { id: 69, position: { x: 7, y: 5 }, locatedIn: 1 },
  { id: 70, position: { x: 8, y: 5 }, locatedIn: 1 },
  { id: 71, position: { x: 9, y: 5 }, locatedIn: 1 },
  { id: 72, position: { x: 10, y: 5 }, locatedIn: 1 },
  { id: 73, position: { x: 11, y: 5 }, locatedIn: 1 },
  { id: 74, position: { x: 0, y: 6 }, locatedIn: 1 },
  { id: 75, position: { x: 1, y: 6 }, locatedIn: 1 },
  { id: 76, position: { x: 2, y: 6 }, locatedIn: 1 },
  { id: 77, position: { x: 3, y: 6 }, locatedIn: 1 },
  { id: 78, position: { x: 4, y: 6 }, locatedIn: 1 },
  { id: 79, position: { x: 5, y: 6 }, locatedIn: 1 },
  { id: 80, position: { x: 6, y: 6 }, locatedIn: 1 },
  { id: 81, position: { x: 7, y: 6 }, locatedIn: 1 },
  { id: 82, position: { x: 8, y: 6 }, locatedIn: 1 },
  { id: 83, position: { x: 9, y: 6 }, locatedIn: 1 },
  { id: 84, position: { x: 10, y: 6 }, locatedIn: 1 },
  { id: 85, position: { x: 11, y: 6 }, locatedIn: 1 },
  { id: 86, position: { x: 0, y: 7 }, locatedIn: 1 },
  { id: 87, position: { x: 1, y: 7 }, locatedIn: 1 },
  { id: 88, position: { x: 2, y: 7 }, locatedIn: 1 },
  { id: 89, position: { x: 3, y: 7 }, locatedIn: 1 },
  { id: 90, position: { x: 4, y: 7 }, locatedIn: 1 },
  { id: 91, position: { x: 5, y: 7 }, locatedIn: 1 },
  { id: 92, position: { x: 6, y: 7 }, locatedIn: 1 },
  { id: 93, position: { x: 7, y: 7 }, locatedIn: 1 },
  { id: 94, position: { x: 8, y: 7 }, locatedIn: 1 },
  { id: 95, position: { x: 9, y: 7 }, locatedIn: 1 },
  { id: 96, position: { x: 10, y: 7 }, locatedIn: 1 },
  { id: 97, position: { x: 11, y: 7 }, locatedIn: 1 },
  { id: 98, position: { x: 0, y: 8 }, locatedIn: 1 },
  { id: 99, position: { x: 1, y: 8 }, locatedIn: 1 },
  { id: 100, position: { x: 2, y: 8 }, locatedIn: 1 },
  { id: 101, position: { x: 3, y: 8 }, locatedIn: 1 },
  { id: 102, position: { x: 4, y: 8 }, locatedIn: 1 },
  { id: 103, position: { x: 5, y: 8 }, locatedIn: 1 },
  { id: 104, position: { x: 6, y: 8 }, locatedIn: 1 },
  { id: 105, position: { x: 7, y: 8 }, locatedIn: 1 },
  { id: 106, position: { x: 8, y: 8 }, locatedIn: 1 },
  { id: 107, position: { x: 9, y: 8 }, locatedIn: 1 },
  { id: 108, position: { x: 10, y: 8 }, locatedIn: 1 },
  { id: 109, position: { x: 11, y: 8 }, locatedIn: 1 },
  { id: 110, position: { x: 0, y: 9 }, locatedIn: 1 },
  { id: 111, position: { x: 1, y: 9 }, locatedIn: 1 },
  { id: 112, position: { x: 2, y: 9 }, locatedIn: 1 },
  { id: 113, position: { x: 3, y: 9 }, locatedIn: 1 },
  { id: 114, position: { x: 4, y: 9 }, locatedIn: 1 },
  { id: 115, position: { x: 5, y: 9 }, locatedIn: 1 },
  { id: 116, position: { x: 6, y: 9 }, locatedIn: 1 },
  { id: 117, position: { x: 7, y: 9 }, locatedIn: 1 },
  { id: 118, position: { x: 8, y: 9 }, locatedIn: 1 },
  { id: 119, position: { x: 9, y: 9 }, locatedIn: 1 },
  { id: 120, position: { x: 10, y: 9 }, locatedIn: 1 },
  { id: 121, position: { x: 11, y: 9 }, locatedIn: 1 },
  { id: 122, position: { x: 0, y: 10 }, locatedIn: 1 },
  { id: 123, position: { x: 1, y: 10 }, locatedIn: 1 },
  { id: 124, position: { x: 2, y: 10 }, locatedIn: 1 },
  { id: 125, position: { x: 3, y: 10 }, locatedIn: 1 },
  { id: 126, position: { x: 4, y: 10 }, locatedIn: 1 },
  { id: 127, position: { x: 5, y: 10 }, locatedIn: 1 },
  { id: 128, position: { x: 6, y: 10 }, locatedIn: 1 },
  { id: 129, position: { x: 7, y: 10 }, locatedIn: 1 },
  { id: 130, position: { x: 8, y: 10 }, locatedIn: 1 },
  { id: 131, position: { x: 9, y: 10 }, locatedIn: 1 },
  { id: 132, position: { x: 10, y: 10 }, locatedIn: 1 },
  { id: 133, position: { x: 11, y: 10 }, locatedIn: 1 },
  { id: 134, position: { x: 0, y: 11 }, locatedIn: 1 },
  { id: 135, position: { x: 1, y: 11 }, locatedIn: 1 },
  { id: 136, position: { x: 2, y: 11 }, locatedIn: 1 },
  { id: 137, position: { x: 3, y: 11 }, locatedIn: 1 },
  { id: 138, position: { x: 4, y: 11 }, locatedIn: 1 },
  { id: 139, position: { x: 5, y: 11 }, locatedIn: 1 },
  { id: 140, position: { x: 6, y: 11 }, locatedIn: 1 },
  { id: 141, position: { x: 7, y: 11 }, locatedIn: 1 },
  { id: 142, position: { x: 8, y: 11 }, locatedIn: 1 },
  { id: 143, position: { x: 9, y: 11 }, locatedIn: 1 },
  { id: 144, position: { x: 10, y: 11 }, locatedIn: 1 },
  { id: 145, position: { x: 11, y: 11 }, locatedIn: 1 },
  {
    id: 146,
    size: 3,
    position: {
      x: 12,
      y: 0,
    },
    content: {
      image: "images/TSB_Estate_Logo.webp",
      color: "00b0ff",
    },
  },
  { id: 147, position: { x: 12, y: 0 }, locatedIn: 146 },
  { id: 148, position: { x: 13, y: 0 }, locatedIn: 146 },
  { id: 149, position: { x: 14, y: 0 }, locatedIn: 146 },
  { id: 150, position: { x: 12, y: 1 }, locatedIn: 146 },
  { id: 151, position: { x: 13, y: 1 }, locatedIn: 146 },
  { id: 152, position: { x: 14, y: 1 }, locatedIn: 146 },
  { id: 153, position: { x: 12, y: 2 }, locatedIn: 146 },
  { id: 154, position: { x: 13, y: 2 }, locatedIn: 146 },
  { id: 155, position: { x: 14, y: 2 }, locatedIn: 146 },
  { id: 156, position: { x: 12, y: 3 }, locatedIn: 146 },
  { id: 157, position: { x: 13, y: 3 }, locatedIn: 146 },
  { id: 158, position: { x: 14, y: 3 }, locatedIn: 146 },
  {
    id: 159,
    size: 1,
    position: {
      x: 15,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 160,
    size: 1,
    position: {
      x: 16,
      y: 0,
    },
    content: {
      color: "00b0ff",
    },
  },
  {
    id: 161,
    size: 1,
    position: {
      x: 17,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 163,
    size: 1,
    position: {
      x: 18,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 164,
    size: 1,
    position: {
      x: 19,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 165,
    size: 1,
    position: {
      x: 20,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 166,
    size: 1,
    position: {
      x: 21,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 167,
    size: 1,
    position: {
      x: 22,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 168,
    size: 1,
    position: {
      x: 23,
      y: 0,
    },
    content: {
      color: "2ac161",
    },
  },
  {
    id: 169,
    size: 1,
    position: {
      x: 24,
      y: 0,
    },
    content: {
      color: "ffffff",
    },
  },
  { id: 170, size: 1, position: { x: 25, y: 0 }, content: { color: "2ac161" } },
  { id: 171, size: 1, position: { x: 26, y: 0 }, content: { color: "2ac161" } },
  { id: 172, size: 1, position: { x: 27, y: 0 }, content: { color: "2ac161" } },
  { id: 173, size: 1, position: { x: 28, y: 0 }, content: { color: "2ac161" } },
  { id: 174, size: 1, position: { x: 29, y: 0 }, content: { color: "2ac161" } },
  { id: 175, size: 1, position: { x: 30, y: 0 }, content: { color: "2ac161" } },
  { id: 176, size: 1, position: { x: 31, y: 0 }, content: { color: "2ac161" } },
  { id: 177, size: 1, position: { x: 32, y: 0 }, content: { color: "2ac161" } },
  { id: 178, size: 1, position: { x: 33, y: 0 }, content: { color: "2ac161" } },
  { id: 179, size: 1, position: { x: 34, y: 0 }, content: { color: "2ac161" } },
  { id: 180, size: 1, position: { x: 35, y: 0 }, content: { color: "2ac161" } },
  {
    id: 181,
    size: 12,
    position: {
      x: 36,
      y: 0,
    },
    content: {
      image: "images/TSB_Estate_Logo.webp",
      color: "00b0ff",
    },
  },
  { id: 182, position: { x: 36, y: 0 }, locatedIn: 181 },
  { id: 183, position: { x: 37, y: 0 }, locatedIn: 181 },
  { id: 184, position: { x: 38, y: 0 }, locatedIn: 181 },
  { id: 185, position: { x: 39, y: 0 }, locatedIn: 181 },
  { id: 186, position: { x: 40, y: 0 }, locatedIn: 181 },
  { id: 187, position: { x: 41, y: 0 }, locatedIn: 181 },
  { id: 188, position: { x: 42, y: 0 }, locatedIn: 181 },
  { id: 189, position: { x: 43, y: 0 }, locatedIn: 181 },
  { id: 190, position: { x: 44, y: 0 }, locatedIn: 181 },
  { id: 191, position: { x: 45, y: 0 }, locatedIn: 181 },
  { id: 192, position: { x: 46, y: 0 }, locatedIn: 181 },
  { id: 193, position: { x: 47, y: 0 }, locatedIn: 181 },
  { id: 194, position: { x: 36, y: 1 }, locatedIn: 181 },
  { id: 195, position: { x: 37, y: 1 }, locatedIn: 181 },
  { id: 196, position: { x: 38, y: 1 }, locatedIn: 181 },
  { id: 197, position: { x: 39, y: 1 }, locatedIn: 181 },
  { id: 198, position: { x: 40, y: 1 }, locatedIn: 181 },
  { id: 199, position: { x: 41, y: 1 }, locatedIn: 181 },
  { id: 200, position: { x: 42, y: 1 }, locatedIn: 181 },
  { id: 201, position: { x: 43, y: 1 }, locatedIn: 181 },
  { id: 202, position: { x: 44, y: 1 }, locatedIn: 181 },
  { id: 203, position: { x: 45, y: 1 }, locatedIn: 181 },
  { id: 204, position: { x: 46, y: 1 }, locatedIn: 181 },
  { id: 205, position: { x: 47, y: 1 }, locatedIn: 181 },
  { id: 206, position: { x: 36, y: 2 }, locatedIn: 181 },
  { id: 207, position: { x: 37, y: 2 }, locatedIn: 181 },
  { id: 208, position: { x: 38, y: 2 }, locatedIn: 181 },
  { id: 209, position: { x: 39, y: 2 }, locatedIn: 181 },
  { id: 210, position: { x: 40, y: 2 }, locatedIn: 181 },
  { id: 211, position: { x: 41, y: 2 }, locatedIn: 181 },
  { id: 212, position: { x: 42, y: 2 }, locatedIn: 181 },
  { id: 213, position: { x: 43, y: 2 }, locatedIn: 181 },
  { id: 214, position: { x: 44, y: 2 }, locatedIn: 181 },
  { id: 215, position: { x: 45, y: 2 }, locatedIn: 181 },
  { id: 216, position: { x: 46, y: 2 }, locatedIn: 181 },
  { id: 217, position: { x: 47, y: 2 }, locatedIn: 181 },
  { id: 218, position: { x: 36, y: 3 }, locatedIn: 181 },
  { id: 219, position: { x: 37, y: 3 }, locatedIn: 181 },
  { id: 220, position: { x: 38, y: 3 }, locatedIn: 181 },
  { id: 221, position: { x: 39, y: 3 }, locatedIn: 181 },
  { id: 222, position: { x: 40, y: 3 }, locatedIn: 181 },
  { id: 223, position: { x: 41, y: 3 }, locatedIn: 181 },
  { id: 224, position: { x: 42, y: 3 }, locatedIn: 181 },
  { id: 225, position: { x: 43, y: 3 }, locatedIn: 181 },
  { id: 226, position: { x: 44, y: 3 }, locatedIn: 181 },
  { id: 227, position: { x: 45, y: 3 }, locatedIn: 181 },
  { id: 228, position: { x: 46, y: 3 }, locatedIn: 181 },
  { id: 229, position: { x: 47, y: 3 }, locatedIn: 181 },
  { id: 230, position: { x: 36, y: 4 }, locatedIn: 181 },
  { id: 231, position: { x: 37, y: 4 }, locatedIn: 181 },
  { id: 232, position: { x: 38, y: 4 }, locatedIn: 181 },
  { id: 233, position: { x: 39, y: 4 }, locatedIn: 181 },
  { id: 234, position: { x: 40, y: 4 }, locatedIn: 181 },
  { id: 235, position: { x: 41, y: 4 }, locatedIn: 181 },
  { id: 236, position: { x: 42, y: 4 }, locatedIn: 181 },
  { id: 237, position: { x: 43, y: 4 }, locatedIn: 181 },
  { id: 238, position: { x: 44, y: 4 }, locatedIn: 181 },
  { id: 239, position: { x: 45, y: 4 }, locatedIn: 181 },
  { id: 240, position: { x: 46, y: 4 }, locatedIn: 181 },
  { id: 241, position: { x: 47, y: 4 }, locatedIn: 181 },
  { id: 242, position: { x: 36, y: 5 }, locatedIn: 181 },
  { id: 243, position: { x: 37, y: 5 }, locatedIn: 181 },
  { id: 244, position: { x: 38, y: 5 }, locatedIn: 181 },
  { id: 245, position: { x: 39, y: 5 }, locatedIn: 181 },
  { id: 246, position: { x: 40, y: 5 }, locatedIn: 181 },
  { id: 247, position: { x: 41, y: 5 }, locatedIn: 181 },
  { id: 248, position: { x: 42, y: 5 }, locatedIn: 181 },
  { id: 249, position: { x: 43, y: 5 }, locatedIn: 181 },
  { id: 250, position: { x: 44, y: 5 }, locatedIn: 181 },
  { id: 251, position: { x: 45, y: 5 }, locatedIn: 181 },
  { id: 252, position: { x: 46, y: 5 }, locatedIn: 181 },
  { id: 253, position: { x: 47, y: 5 }, locatedIn: 181 },
  { id: 254, position: { x: 36, y: 6 }, locatedIn: 181 },
  { id: 255, position: { x: 37, y: 6 }, locatedIn: 181 },
  { id: 256, position: { x: 38, y: 6 }, locatedIn: 181 },
  { id: 257, position: { x: 39, y: 6 }, locatedIn: 181 },
  { id: 258, position: { x: 40, y: 6 }, locatedIn: 181 },
  { id: 259, position: { x: 41, y: 6 }, locatedIn: 181 },
  { id: 260, position: { x: 42, y: 6 }, locatedIn: 181 },
  { id: 261, position: { x: 43, y: 6 }, locatedIn: 181 },
  { id: 262, position: { x: 44, y: 6 }, locatedIn: 181 },
  { id: 263, position: { x: 45, y: 6 }, locatedIn: 181 },
  { id: 264, position: { x: 46, y: 6 }, locatedIn: 181 },
  { id: 265, position: { x: 47, y: 6 }, locatedIn: 181 },
  { id: 266, position: { x: 36, y: 7 }, locatedIn: 181 },
  { id: 267, position: { x: 37, y: 7 }, locatedIn: 181 },
  { id: 268, position: { x: 38, y: 7 }, locatedIn: 181 },
  { id: 269, position: { x: 39, y: 7 }, locatedIn: 181 },
  { id: 270, position: { x: 40, y: 7 }, locatedIn: 181 },
  { id: 271, position: { x: 41, y: 7 }, locatedIn: 181 },
  { id: 272, position: { x: 42, y: 7 }, locatedIn: 181 },
  { id: 273, position: { x: 43, y: 7 }, locatedIn: 181 },
  { id: 274, position: { x: 44, y: 7 }, locatedIn: 181 },
  { id: 275, position: { x: 45, y: 7 }, locatedIn: 181 },
  { id: 276, position: { x: 46, y: 7 }, locatedIn: 181 },
  { id: 277, position: { x: 47, y: 7 }, locatedIn: 181 },
  { id: 278, position: { x: 36, y: 8 }, locatedIn: 181 },
  { id: 279, position: { x: 37, y: 8 }, locatedIn: 181 },
  { id: 280, position: { x: 38, y: 8 }, locatedIn: 181 },
  { id: 281, position: { x: 39, y: 8 }, locatedIn: 181 },
  { id: 282, position: { x: 40, y: 8 }, locatedIn: 181 },
  { id: 283, position: { x: 41, y: 8 }, locatedIn: 181 },
  { id: 284, position: { x: 42, y: 8 }, locatedIn: 181 },
  { id: 285, position: { x: 43, y: 8 }, locatedIn: 181 },
  { id: 286, position: { x: 44, y: 8 }, locatedIn: 181 },
  { id: 287, position: { x: 45, y: 8 }, locatedIn: 181 },
  { id: 288, position: { x: 46, y: 8 }, locatedIn: 181 },
  { id: 289, position: { x: 47, y: 8 }, locatedIn: 181 },
  { id: 290, position: { x: 36, y: 9 }, locatedIn: 181 },
  { id: 291, position: { x: 37, y: 9 }, locatedIn: 181 },
  { id: 292, position: { x: 38, y: 9 }, locatedIn: 181 },
  { id: 293, position: { x: 39, y: 9 }, locatedIn: 181 },
  { id: 294, position: { x: 40, y: 9 }, locatedIn: 181 },
  { id: 295, position: { x: 41, y: 9 }, locatedIn: 181 },
  { id: 296, position: { x: 42, y: 9 }, locatedIn: 181 },
  { id: 297, position: { x: 43, y: 9 }, locatedIn: 181 },
  { id: 298, position: { x: 44, y: 9 }, locatedIn: 181 },
  { id: 299, position: { x: 45, y: 9 }, locatedIn: 181 },
  { id: 300, position: { x: 46, y: 9 }, locatedIn: 181 },
  { id: 301, position: { x: 47, y: 9 }, locatedIn: 181 },
  { id: 302, position: { x: 36, y: 10 }, locatedIn: 181 },
  { id: 303, position: { x: 37, y: 10 }, locatedIn: 181 },
  { id: 304, position: { x: 38, y: 10 }, locatedIn: 181 },
  { id: 305, position: { x: 39, y: 10 }, locatedIn: 181 },
  { id: 306, position: { x: 40, y: 10 }, locatedIn: 181 },
  { id: 307, position: { x: 41, y: 10 }, locatedIn: 181 },
  { id: 308, position: { x: 42, y: 10 }, locatedIn: 181 },
  { id: 309, position: { x: 43, y: 10 }, locatedIn: 181 },
  { id: 310, position: { x: 44, y: 10 }, locatedIn: 181 },
  { id: 311, position: { x: 45, y: 10 }, locatedIn: 181 },
  { id: 312, position: { x: 46, y: 10 }, locatedIn: 181 },
  { id: 313, position: { x: 47, y: 10 }, locatedIn: 181 },
  { id: 314, position: { x: 36, y: 11 }, locatedIn: 181 },
  { id: 315, position: { x: 37, y: 11 }, locatedIn: 181 },
  { id: 316, position: { x: 38, y: 11 }, locatedIn: 181 },
  { id: 317, position: { x: 39, y: 11 }, locatedIn: 181 },
  { id: 318, position: { x: 40, y: 11 }, locatedIn: 181 },
  { id: 319, position: { x: 41, y: 11 }, locatedIn: 181 },
  { id: 320, position: { x: 42, y: 11 }, locatedIn: 181 },
  { id: 321, position: { x: 43, y: 11 }, locatedIn: 181 },
  { id: 322, position: { x: 44, y: 11 }, locatedIn: 181 },
  { id: 323, position: { x: 45, y: 11 }, locatedIn: 181 },
  { id: 324, position: { x: 46, y: 11 }, locatedIn: 181 },
  { id: 325, position: { x: 47, y: 11 }, locatedIn: 181 },
  {
    id: 326,
    size: 12,
    position: {
      x: 48,
      y: 0,
    },
    content: {
      image: "images/fs.jpg",
      color: "2ac161",
    },
  },
  { id: 327, position: { x: 48, y: 0 }, locatedIn: 326 },
  { id: 328, position: { x: 49, y: 0 }, locatedIn: 326 },
  { id: 329, position: { x: 50, y: 0 }, locatedIn: 326 },
  { id: 330, position: { x: 51, y: 0 }, locatedIn: 326 },
  { id: 331, position: { x: 52, y: 0 }, locatedIn: 326 },
  { id: 332, position: { x: 53, y: 0 }, locatedIn: 326 },
  { id: 333, position: { x: 54, y: 0 }, locatedIn: 326 },
  { id: 334, position: { x: 55, y: 0 }, locatedIn: 326 },
  { id: 335, position: { x: 56, y: 0 }, locatedIn: 326 },
  { id: 336, position: { x: 57, y: 0 }, locatedIn: 326 },
  { id: 337, position: { x: 58, y: 0 }, locatedIn: 326 },
  { id: 338, position: { x: 59, y: 0 }, locatedIn: 326 },
  { id: 339, position: { x: 48, y: 1 }, locatedIn: 326 },
  { id: 340, position: { x: 49, y: 1 }, locatedIn: 326 },
  { id: 341, position: { x: 50, y: 1 }, locatedIn: 326 },
  { id: 342, position: { x: 51, y: 1 }, locatedIn: 326 },
  { id: 343, position: { x: 52, y: 1 }, locatedIn: 326 },
  { id: 344, position: { x: 53, y: 1 }, locatedIn: 326 },
  { id: 345, position: { x: 54, y: 1 }, locatedIn: 326 },
  { id: 346, position: { x: 55, y: 1 }, locatedIn: 326 },
  { id: 347, position: { x: 56, y: 1 }, locatedIn: 326 },
  { id: 348, position: { x: 57, y: 1 }, locatedIn: 326 },
  { id: 349, position: { x: 58, y: 1 }, locatedIn: 326 },
  { id: 350, position: { x: 59, y: 1 }, locatedIn: 326 },
  { id: 351, position: { x: 48, y: 2 }, locatedIn: 326 },
  { id: 352, position: { x: 49, y: 2 }, locatedIn: 326 },
  { id: 353, position: { x: 50, y: 2 }, locatedIn: 326 },
  { id: 354, position: { x: 51, y: 2 }, locatedIn: 326 },
  { id: 355, position: { x: 52, y: 2 }, locatedIn: 326 },
  { id: 356, position: { x: 53, y: 2 }, locatedIn: 326 },
  { id: 357, position: { x: 54, y: 2 }, locatedIn: 326 },
  { id: 358, position: { x: 55, y: 2 }, locatedIn: 326 },
  { id: 359, position: { x: 56, y: 2 }, locatedIn: 326 },
  { id: 360, position: { x: 57, y: 2 }, locatedIn: 326 },
  { id: 361, position: { x: 58, y: 2 }, locatedIn: 326 },
  { id: 362, position: { x: 59, y: 2 }, locatedIn: 326 },
  { id: 363, position: { x: 48, y: 3 }, locatedIn: 326 },
  { id: 364, position: { x: 49, y: 3 }, locatedIn: 326 },
  { id: 365, position: { x: 50, y: 3 }, locatedIn: 326 },
  { id: 366, position: { x: 51, y: 3 }, locatedIn: 326 },
  { id: 367, position: { x: 52, y: 3 }, locatedIn: 326 },
  { id: 368, position: { x: 53, y: 3 }, locatedIn: 326 },
  { id: 369, position: { x: 54, y: 3 }, locatedIn: 326 },
  { id: 370, position: { x: 55, y: 3 }, locatedIn: 326 },
  { id: 371, position: { x: 56, y: 3 }, locatedIn: 326 },
  { id: 372, position: { x: 57, y: 3 }, locatedIn: 326 },
  { id: 373, position: { x: 58, y: 3 }, locatedIn: 326 },
  { id: 374, position: { x: 59, y: 3 }, locatedIn: 326 },
  { id: 375, position: { x: 48, y: 4 }, locatedIn: 326 },
  { id: 376, position: { x: 49, y: 4 }, locatedIn: 326 },
  { id: 377, position: { x: 50, y: 4 }, locatedIn: 326 },
  { id: 378, position: { x: 51, y: 4 }, locatedIn: 326 },
  { id: 379, position: { x: 52, y: 4 }, locatedIn: 326 },
  { id: 380, position: { x: 53, y: 4 }, locatedIn: 326 },
  { id: 381, position: { x: 54, y: 4 }, locatedIn: 326 },
  { id: 382, position: { x: 55, y: 4 }, locatedIn: 326 },
  { id: 383, position: { x: 56, y: 4 }, locatedIn: 326 },
  { id: 384, position: { x: 57, y: 4 }, locatedIn: 326 },
  { id: 385, position: { x: 58, y: 4 }, locatedIn: 326 },
  { id: 386, position: { x: 59, y: 4 }, locatedIn: 326 },
  { id: 387, position: { x: 48, y: 5 }, locatedIn: 326 },
  { id: 388, position: { x: 49, y: 5 }, locatedIn: 326 },
  { id: 389, position: { x: 50, y: 5 }, locatedIn: 326 },
  { id: 390, position: { x: 51, y: 5 }, locatedIn: 326 },
  { id: 391, position: { x: 52, y: 5 }, locatedIn: 326 },
  { id: 392, position: { x: 53, y: 5 }, locatedIn: 326 },
  { id: 393, position: { x: 54, y: 5 }, locatedIn: 326 },
  { id: 394, position: { x: 55, y: 5 }, locatedIn: 326 },
  { id: 395, position: { x: 56, y: 5 }, locatedIn: 326 },
  { id: 396, position: { x: 57, y: 5 }, locatedIn: 326 },
  { id: 397, position: { x: 58, y: 5 }, locatedIn: 326 },
  { id: 398, position: { x: 59, y: 5 }, locatedIn: 326 },
  { id: 399, position: { x: 48, y: 6 }, locatedIn: 326 },
  { id: 400, position: { x: 49, y: 6 }, locatedIn: 326 },
  { id: 401, position: { x: 50, y: 6 }, locatedIn: 326 },
  { id: 402, position: { x: 51, y: 6 }, locatedIn: 326 },
  { id: 403, position: { x: 52, y: 6 }, locatedIn: 326 },
  { id: 404, position: { x: 53, y: 6 }, locatedIn: 326 },
  { id: 405, position: { x: 54, y: 6 }, locatedIn: 326 },
  { id: 406, position: { x: 55, y: 6 }, locatedIn: 326 },
  { id: 407, position: { x: 56, y: 6 }, locatedIn: 326 },
  { id: 408, position: { x: 57, y: 6 }, locatedIn: 326 },
  { id: 409, position: { x: 58, y: 6 }, locatedIn: 326 },
  { id: 410, position: { x: 59, y: 6 }, locatedIn: 326 },
  { id: 411, position: { x: 48, y: 7 }, locatedIn: 326 },
  { id: 412, position: { x: 49, y: 7 }, locatedIn: 326 },
  { id: 413, position: { x: 50, y: 7 }, locatedIn: 326 },
  { id: 414, position: { x: 51, y: 7 }, locatedIn: 326 },
  { id: 415, position: { x: 52, y: 7 }, locatedIn: 326 },
  { id: 416, position: { x: 53, y: 7 }, locatedIn: 326 },
  { id: 417, position: { x: 54, y: 7 }, locatedIn: 326 },
  { id: 418, position: { x: 55, y: 7 }, locatedIn: 326 },
  { id: 419, position: { x: 56, y: 7 }, locatedIn: 326 },
  { id: 420, position: { x: 57, y: 7 }, locatedIn: 326 },
  { id: 421, position: { x: 58, y: 7 }, locatedIn: 326 },
  { id: 422, position: { x: 59, y: 7 }, locatedIn: 326 },
  { id: 423, position: { x: 48, y: 8 }, locatedIn: 326 },
  { id: 424, position: { x: 49, y: 8 }, locatedIn: 326 },
  { id: 425, position: { x: 50, y: 8 }, locatedIn: 326 },
  { id: 426, position: { x: 51, y: 8 }, locatedIn: 326 },
  { id: 427, position: { x: 52, y: 8 }, locatedIn: 326 },
  { id: 428, position: { x: 53, y: 8 }, locatedIn: 326 },
  { id: 429, position: { x: 54, y: 8 }, locatedIn: 326 },
  { id: 430, position: { x: 55, y: 8 }, locatedIn: 326 },
  { id: 431, position: { x: 56, y: 8 }, locatedIn: 326 },
  { id: 432, position: { x: 57, y: 8 }, locatedIn: 326 },
  { id: 433, position: { x: 58, y: 8 }, locatedIn: 326 },
  { id: 434, position: { x: 59, y: 8 }, locatedIn: 326 },
  { id: 435, position: { x: 48, y: 9 }, locatedIn: 326 },
  { id: 436, position: { x: 49, y: 9 }, locatedIn: 326 },
  { id: 437, position: { x: 50, y: 9 }, locatedIn: 326 },
  { id: 438, position: { x: 51, y: 9 }, locatedIn: 326 },
  { id: 439, position: { x: 52, y: 9 }, locatedIn: 326 },
  { id: 440, position: { x: 53, y: 9 }, locatedIn: 326 },
  { id: 441, position: { x: 54, y: 9 }, locatedIn: 326 },
  { id: 442, position: { x: 55, y: 9 }, locatedIn: 326 },
  { id: 443, position: { x: 56, y: 9 }, locatedIn: 326 },
  { id: 444, position: { x: 57, y: 9 }, locatedIn: 326 },
  { id: 445, position: { x: 58, y: 9 }, locatedIn: 326 },
  { id: 446, position: { x: 59, y: 9 }, locatedIn: 326 },
  { id: 447, position: { x: 48, y: 10 }, locatedIn: 326 },
  { id: 448, position: { x: 49, y: 10 }, locatedIn: 326 },
  { id: 449, position: { x: 50, y: 10 }, locatedIn: 326 },
  { id: 450, position: { x: 51, y: 10 }, locatedIn: 326 },
  { id: 451, position: { x: 52, y: 10 }, locatedIn: 326 },
  { id: 452, position: { x: 53, y: 10 }, locatedIn: 326 },
  { id: 453, position: { x: 54, y: 10 }, locatedIn: 326 },
  { id: 454, position: { x: 55, y: 10 }, locatedIn: 326 },
  { id: 455, position: { x: 56, y: 10 }, locatedIn: 326 },
  { id: 456, position: { x: 57, y: 10 }, locatedIn: 326 },
  { id: 457, position: { x: 58, y: 10 }, locatedIn: 326 },
  { id: 458, position: { x: 59, y: 10 }, locatedIn: 326 },
  { id: 459, position: { x: 48, y: 11 }, locatedIn: 326 },
  { id: 460, position: { x: 49, y: 11 }, locatedIn: 326 },
  { id: 461, position: { x: 50, y: 11 }, locatedIn: 326 },
  { id: 462, position: { x: 51, y: 11 }, locatedIn: 326 },
  { id: 463, position: { x: 52, y: 11 }, locatedIn: 326 },
  { id: 464, position: { x: 53, y: 11 }, locatedIn: 326 },
  { id: 465, position: { x: 54, y: 11 }, locatedIn: 326 },
  { id: 466, position: { x: 55, y: 11 }, locatedIn: 326 },
  { id: 467, position: { x: 56, y: 11 }, locatedIn: 326 },
  { id: 468, position: { x: 57, y: 11 }, locatedIn: 326 },
  { id: 469, position: { x: 58, y: 11 }, locatedIn: 326 },
  { id: 470, position: { x: 59, y: 11 }, locatedIn: 326 },
];

renderCells(data);
