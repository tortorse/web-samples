let app;
let container;
let graphics;
let gridLines;
let isMouseDown = false;
let isDragging = false;
let isReady = false;
let startPoint;
let graphicsStartPoint;
let selectedColor;
let scale = 1;
let zoomed = false;
const gridSize = { width: 256, height: 256 };
const cellSize = { width: 20, height: 20 };
const canvasBackround = 0x242336;
const gridFillColor = 0x212137;
const gridLineColor = 0x171528;
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

  // add the container to the stage
  app.stage.addChild(container);

  // graphic is the canvas we draw the
  // pixel on, well also move this around
  // when the user drags around
  graphics = new PIXI.Graphics();

  // specifies the fill style for the Graphics object.
  graphics.beginFill(gridFillColor);
  // draw grid
  graphics.drawRect(
    0,
    0,
    gridSize.width * cellSize.width,
    gridSize.height * cellSize.height
  );
  // set graphic interactive
  graphics.interactive = true;

  // setup input listeners, we use
  // pointerdown, pointermove, etc
  // rather than mousedown, mousemove,
  // etc, because it triggers on both
  // mouse and touch
  graphics.on("pointerdonw", onDown);
  graphics.on("pointermove", onMove);
  graphics.on("pointerup", onUp);
  graphics.on("pointerupoutside", onUp);

  // move graphics so that it's center
  // is at x0 y0
  graphics.position.x = -graphics.width / 2;
  graphics.position.y = -graphics.height / 2;


  // add the graphics to the container
  container.addChild(graphics);

  // draw grid lines
  gridLines = new PIXI.Graphics();
  gridLines.lineStyle(1, gridLineColor, 1);

  gridLines.position.x = graphics.position.x;
  gridLines.position.y = graphics.position.y;

  for (let i = 0; i <= gridSize.width; i++) {
    drawLine(
      0,
      i * cellSize.width,
      gridSize.width * cellSize.width,
      i * cellSize.width
    );
  }

  for (let j = 0; j <= gridSize.height; j++) {
    drawLine(
      j * cellSize.height,
      0,
      j * cellSize.height,
      gridSize.height * cellSize.height
    );
  }

  container.addChild(gridLines);

  // start page resize listener, so
  // we can keep the canvas the correct
  // size
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
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
        graphicsStartPoint = { x: graphics.position.x, y: graphics.position.y };

        // set the flag to say we are dragging
        isDragging = true;
      }
    }
    if (isDragging) {
      // update the graphics position based
      // on the mouse position, offset with the
      // start and graphics orginal positions
      graphics.position.x =
        (e.data.global.x - startPoint.x) / scale + graphicsStartPoint.x;
      graphics.position.y =
        (e.data.global.y - startPoint.y) / scale + graphicsStartPoint.y;

      gridLines.position.x =
        (e.data.global.x - startPoint.x) / scale + graphicsStartPoint.x;
      gridLines.position.y =
        (e.data.global.y - startPoint.y) / scale + graphicsStartPoint.y;
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
      // if a color has been selected and
      // the view is zoomed in then this
      // click is to draw a new pixel
      if (selectedColor && zoomed) {
        
      }
    }
    isDragging = false;
  }
}

setup();
