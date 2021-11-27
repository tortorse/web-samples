let app;
let container;
let background;
let cells;
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

  container = new PIXI.Container();

  container.width = gridSize.width * cellSize.width;
  container.height = gridSize.height * cellSize.height;

  background = new PIXI.Graphics();

  const backgroundImage = PIXI.Sprite.from("images/metaverse.png");

  background.addChild(backgroundImage);

  container.addChild(background);

  container.interactive = true;

  container.on("pointerdown", onDown);
  container.on("pointermove", onMove);
  container.on("pointerup", onUp);
  container.on("pointerupoutside", onUp);

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
    isDragging = false;
  }
}

function renderCell(position, content) {
  let { x, y } = position;

  let { color, image, size } = content;
  if (color) {
    gridCell.beginFill(parseInt("0x" + color), 1);
    gridCell.drawRect(
      x * cellSize.width + 1,
      y * cellSize.height + 1,
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
zoomInButton.addEventListener("click", () => {
  if (zoomScale < 1.5) {
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
