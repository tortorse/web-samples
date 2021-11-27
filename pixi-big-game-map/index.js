let app;
let container;
let graphics;
let gridCells;
let gridCell;
let gridLines;
let isMouseDown = false;
let isDragging = false;
let isReady = false;
let startPoint;
let gridCellsStartPoint;
let selectedColor;
let scale = 1;
let zoomed = false;
const zoomLevel = 6;
const gridSize = { width: 256, height: 256 };
const cellSize = { width: 4, height: 4 };
const canvasBackround = 0x242336;
const gridFillColor = 0x212137;
const gridLineColor = 0x171528;

// Get DOM elements
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

let canvasContainer = document.getElementById("canvas");
function setup() {
  // Setting up canvas with Pixi.js
  app = new PIXI.Application({
    width: window.innerWidth,

    height: window.innerHeight,
    antialias: false,
    backgroundColor: canvasBackround,
  });
  canvasContainer.appendChild(app.view);

  // create a contianer for thr grid
  // container will be used for zooming
  container = new PIXI.Container();
  container.sortableChildren = true;
  container.zIndex = 0;

  // add the container to the stage
  app.stage.addChildAt(container, 0);

  // graphic is the canvas we draw the
  // pixel on, well also move this around
  // when the user drags around
  gridCells = new PIXI.Graphics();

  // specifies the fill style for the Graphics object.

  const backgroudImage = PIXI.Sprite.from("images/metaverse.webp");

  gridCells.addChild(backgroudImage);

  // set graphic interactive
  gridCells.interactive = true;

  // setup input listeners, we use
  // pointerdown, pointermove, etc
  // rather than mousedown, mousemove,
  // etc, because it triggers on both
  // mouse and touch
  gridCells.on("pointerdown", onDown);
  gridCells.on("pointermove", onMove);
  gridCells.on("pointerup", onUp);
  gridCells.on("pointerupoutside", onUp);

  // move graphics so that it's center
  // is at x0 y0
  gridCells.position.x = -gridCells.width / 2;
  gridCells.position.y = -gridCells.height / 2;

  // add the graphics to the container
  container.addChild(gridCells);

  // draw grid lines
  // gridLines = new PIXI.Graphics();
  // gridLines.lineStyle(1, gridLineColor, 1);

  // gridLines.position.x = gridCells.position.x;
  // gridLines.position.y = gridCells.position.y;

  // for (let i = 0; i <= gridSize.width; i++) {
  //   drawLine(
  //     0,
  //     i * cellSize.width,
  //     gridSize.width * cellSize.width,
  //     i * cellSize.width
  //   );
  // }

  // for (let j = 0; j <= gridSize.height; j++) {
  //   drawLine(
  //     j * cellSize.height,
  //     0,
  //     j * cellSize.height,
  //     gridSize.height * cellSize.height
  //   );
  // }

  // container.addChild(gridLines);

  graphics = new PIXI.Graphics();
  graphics.position.x = -gridCells.width / 2;
  graphics.position.y = -gridCells.height / 2;

  container.addChild(graphics);
  gridCell = new PIXI.Graphics();
  // gridCell.beginFill(gridFillColor);
  // draw grid
  gridCell.drawRect(
    0,
    0,
    gridSize.width * cellSize.width,
    gridSize.height * cellSize.height
  );
  container.addChild(gridCell);
  // start page resize listener, so
  // we can keep the canvas the correct
  // size
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();

  // add zoom button controls
  zoomInButton.addEventListener("click", () => {
    toggleZoom('zoomIn');
  });
  zoomOutButton.addEventListener("click", () => {
    toggleZoom('zoomOut');
  });
}

function drawLine(x1, y1, x2, y2) {
  gridLines.moveTo(x1, y1);
  gridLines.lineTo(x2, y2);
}

function resizeCanvas() {
  // resize the canvas to fill the screen
  app.renderer.resize(window.innerWidth, window.innerHeight);
  // center the container to the new
  // window size.
  container.position.x = window.innerWidth / 2;
  container.position.y = window.innerHeight / 2;
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
        gridCellsStartPoint = {
          x: gridCells.position.x,
          y: gridCells.position.y,
        };

        // set the flag to say we are dragging
        isDragging = true;
      }
    }
    if (isDragging) {
      // update the graphics position based
      // on the mouse position, offset with the
      // start and graphics orginal positions
      gridCells.position.x =
        (e.data.global.x - startPoint.x) / scale + gridCellsStartPoint.x;
      gridCells.position.y =
        (e.data.global.y - startPoint.y) / scale + gridCellsStartPoint.y;

      gridCell.position.x =
        (e.data.global.x - startPoint.x) / scale + gridCellsStartPoint.x;
      gridCell.position.y =
        (e.data.global.y - startPoint.y) / scale + gridCellsStartPoint.y;

      graphics.position.x =
        (e.data.global.x - startPoint.x) / scale + gridCellsStartPoint.x;
      graphics.position.y =
        (e.data.global.y - startPoint.y) / scale + gridCellsStartPoint.y;
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
    isDragging = false;
  }
}

function toggleZoom(type) {
  if (type === 'zoomIn') {
    scale += 0.1;
    canvasContainer.style.transform = `scale(${scale})`;
  } else {
    scale -= 0.1;
    canvasContainer.style.transform = `scale(${scale})`;
  }
  // toggle the zoomed varable
  // zoomed = forceZoom ? forceZoom : !zoomed;
  // scale will equal zoomLevel if zoomed (so 6x bigger),
  // other otherwise the scale will be 1
  // scale = zoomed ? zoomLevel : 1;
}

function renderCell(position, content) {
  let { x, y } = position;

  let { color, image, size } = content;
  if (color) {
    gridCell.beginFill(parseInt("0x" + color), 1);
    gridCell.drawRect(
      x * cellSize.width,
      y * cellSize.height,
      cellSize.width,
      cellSize.height
    );
  }
  if (image) {
    const cellImage = new PIXI.Sprite.from(image);
    cellImage.width = size * cellSize.width;
    cellImage.height = size * cellSize.height;
    cellImage.position.x = x * cellSize.width;
    cellImage.position.y = y * cellSize.height;
    graphics.addChild(cellImage);
  }
}

setup();

const data = [
  {
    position: { x: 0, y: 0 },
    content: {
      image: "images/logo.jpg",
      size: 12,
    },
  },
  {
    position: { x: 12, y: 0 },
    content: {
      image: "images/TSB_Estate_Logo.webp",
      size: 3,
    },
  },
  {
    position: { x: 15, y: 10 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 16, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 17, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 18, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 22, y: 0 },
    content: {
      color: "2ac161",
    },
  },
  {
    position: { x: 24, y: 5 },
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

data.forEach((cell) => {
  renderCell(cell.position, cell.content);
});
