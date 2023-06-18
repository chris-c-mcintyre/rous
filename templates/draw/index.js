/* utility functions */

function getRandomInt
(
  max=9,
  min=0
)
{
  let randomInt = Math.max(min, Math.floor(Math.random() * max));

  return randomInt;
}

function getRandomColour
(
  colourSize = 3,
  colourMax = 255,
  colourMin = 0
)
{
  let randomColour = new Array(colourSize);
  for (let i = 0; i < randomColour.length; i++)
  {
    randomColour[i] = getRandomInt(colourMax, colourMin);
  }
  return randomColour;
}

/* setup functions */

function generateDocumentTitle( jsArgs, jsKwargs )
{
  document.head.appendChild
  (
    Object.assign
    (
      document.createElement("title"),
      {
        innerText: jsKwargs.text + jsKwargs.space + jsKwargs.icon
      }
    )
  );
}

function generateDocumentFavicon( jsArgs, jsKwargs )
{
  // https://stackoverflow.com/questions/64452685/how-to-convert-unicode-character-to-svg-and-then-a-favicon

  document.head.appendChild
  (
    Object.assign
    (
      document.createElement("link"),
      {
        rel: "icon",
        href: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${jsKwargs.icon}</text></svg>`}
    )
  );
}

/* basic functions */

// ...

/* display functions */

function generateDisplayLayer( jsArgs, jsKwargs )
{
  // display canvas

  const displayCanvasElement = document.createElement("canvas");

  displayCanvasElement.id = `rous-${jsKwargs["name"]}-canvas`;
  displayCanvasElement.width = jsKwargs["width"] ?? 625;
  displayCanvasElement.height = jsKwargs["height"] ?? 625;
  displayCanvasElement.style = `position: absolute; left: 0; top: 0; border: ${jsKwargs["borderWidth"] || 5}px solid black; z-index: ${jsKwargs["index"]};`;

  return displayCanvasElement;
}

function generateDisplayObject( jsArgs, jsKwargs )
{
  let displayObject = {};

  displayObject.layers = [];

  let layerList = jsKwargs["layers"] ?? ["base", "face", "edge", "node", "grid", "cross", "event"];

  for (let i = 0; i < layerList.length; i++)
  {
    let newLayer = generateDisplayLayer( [], { "name": layerList[i], "index": i });
    displayObject.layers[i] = newLayer;
  }

  return displayObject;
}

function renderDisplayObject( jsArgs, jsKwargs )
{
  for (let i = 0; i < jsArgs[0]["layers"].length; i++)
  {
    document.body.appendChild(jsArgs[0]["layers"][i]);
  }
}

function clearDisplayContext( jsArgs, jsKwargs )
{
  let displayContext = jsKwargs.context;

  displayContext.clearRect
  (
    0,
    0,
    displayContext.canvas.width,
    displayContext.canvas.height
  );
}

function cleanDisplayContext( jsArgs, jsKwargs )
{
  let displayContext = jsKwargs.context;

  clearDisplayContext( jsArgs, jsKwargs );

  displayContext.fillStyle = jsKwargs.fillStyle;
  displayContext.fillRect
  (
    0,
    0,
    displayContext.canvas.width,
    displayContext.canvas.height
  );
}

function setupDisplayCursor( jsArgs, jsKwargs )
{
  jsKwargs.canvas.addEventListener('mousedown', jsKwargs.mouseDown);
  jsKwargs.overlay.addEventListener('mousemove', jsKwargs.mouseMove);
}

/* canvas api */

function canvasDrawGrid( jsArgs, jsKwargs )
{
  let canvasContext = jsKwargs.canvas.getContext("2d");

  // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element

  let rect = jsKwargs.canvas.getBoundingClientRect();

  const borderWidth = 5;
  const gridRowSize = 25;
  const gridColSize = 25;

  const gridRowCount = Math.floor(jsKwargs.canvas.width / gridRowSize) + 1;
  const gridColCount = Math.floor(jsKwargs.canvas.height / gridColSize) + 1;

  canvasContext.beginPath();
  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = "rgb(125,125,125)";

  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(rect.right, 0);

  for (let i = 1; i < gridRowCount; i++)
  {
    const rowPosition = i * gridRowSize;
    canvasContext.moveTo(0, rowPosition);
    canvasContext.lineTo(rect.right, rowPosition);
  }

  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(0, rect.bottom);

  for (let i = 1; i < gridColCount; i++)
  {
    const colPosition = i * gridColSize;
    canvasContext.moveTo(colPosition, 0);
    canvasContext.lineTo(colPosition, rect.bottom);
  }

  canvasContext.stroke();
}

function canvasMouseMoveCursor(event)
{
  const borderWidth = 5;
  const fillSize = 5;

  let crossCanvasElement = document.getElementById("rous-cross-canvas"); // event.target || event.srcElement;
  let crossCanvasContext = crossCanvasElement.getContext("2d");

  let rect = crossCanvasElement.getBoundingClientRect();

  let moveX = event.clientX - rect.left - borderWidth;
  let moveY = event.clientY - rect.top - borderWidth;

  clearDisplayContext
  (
    [],
    {
      context: crossCanvasContext
    }
  );

  let nodeCanvasElement = document.getElementById("rous-node-canvas"); // event.target || event.srcElement;
  let nodeCanvasContext = nodeCanvasElement.getContext("2d");

  crossCanvasContext.beginPath();
  crossCanvasContext.lineWidth = 1;
  crossCanvasContext.strokeStyle = "rgb(255,255,255)";

  crossCanvasContext.moveTo(moveX, 0);
  crossCanvasContext.lineTo(moveX, rect.bottom);
  
  crossCanvasContext.moveTo(0, moveY);
  crossCanvasContext.lineTo(rect.right, moveY);

  if (event.buttons == 0)
  {
    let boxX = moveX - Math.ceil(fillSize/2);
    let boxY = moveY - Math.ceil(fillSize/2);

    crossCanvasContext.rect
    (
      boxX,
      boxY,
      fillSize,
      fillSize
    );
  }

  crossCanvasContext.stroke();
}

function canvasMouseDownPencil(event)
{
  let eventCanvasElement = document.getElementById("rous-event-canvas"); // event.target || event.srcElement;
  let eventCanvasContext = eventCanvasElement.getContext("2d");

  let nodeCanvasElement = document.getElementById("rous-node-canvas"); // event.target || event.srcElement;
  let nodeCanvasContext = nodeCanvasElement.getContext("2d");

  let edgeCanvasElement = document.getElementById("rous-edge-canvas"); // event.target || event.srcElement;
  let edgeCanvasContext = edgeCanvasElement.getContext("2d");

  // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
  let rect = nodeCanvasElement.getBoundingClientRect();

  const borderWidth = 5;
  const fillSize = 5;

  let downX = event.clientX - rect.left - borderWidth;// - Math.ceil(fillSize/2);
  let downY = event.clientY - rect.top - borderWidth;// - Math.ceil(fillSize/2);

  let rectX = downX - Math.ceil(fillSize/2);
  let rectY = downY - Math.ceil(fillSize/2);

  nodeCanvasContext.beginPath();
  nodeCanvasContext.lineWidth = 1;
  nodeCanvasContext.strokeStyle = "rgb(255,255,255)";
  nodeCanvasContext.rect
  (
    rectX,
    rectY,
    fillSize,
    fillSize
  );
  nodeCanvasContext.stroke();

  edgeCanvasContext.beginPath();
  edgeCanvasContext.strokeStyle = `rgb(${getRandomColour().toString()})`;
  edgeCanvasContext.moveTo(downX, downY);

  function canvasMouseMove(moveEvent)
  {
    let moveX = moveEvent.clientX - rect.left - borderWidth - Math.ceil(edgeCanvasContext.lineWidth/2);
    let moveY = moveEvent.clientY - rect.top - borderWidth - Math.ceil(edgeCanvasContext.lineWidth/2);

    edgeCanvasContext.lineTo(moveX, moveY);
    edgeCanvasContext.stroke();
  }

  function canvasMouseUp(upEvent)
  {
    eventCanvasElement.removeEventListener("mousemove", canvasMouseMove);
    eventCanvasElement.removeEventListener("mouseup", canvasMouseUp);

    let upX = upEvent.clientX - rect.left - borderWidth - Math.ceil(fillSize/2);
    let upY = upEvent.clientY - rect.top - borderWidth - Math.ceil(fillSize/2);

    nodeCanvasContext.beginPath();
    nodeCanvasContext.strokeStyle = "rgb(255,255,255)";
    nodeCanvasContext.rect
    (
      upX,
      upY,
      fillSize,
      fillSize
    );
    nodeCanvasContext.stroke();
  }

  eventCanvasElement.addEventListener("mousemove", canvasMouseMove);
  eventCanvasElement.addEventListener("mouseup", canvasMouseUp);
}

/* program */

// page setup

generateDocumentTitle
(
  [],
  {
    text: "R.O.U.S.",
    space: " ",
    icon: Math.random() >= 0.96 ? "🐀" : "🌹"
  }
);

generateDocumentFavicon
(
  [],
  {
    icon: Math.random() >= 0.96 ? "🐀" : "🌹"
  }
);

let myDisplayObject = generateDisplayObject
(
  [],
  {}
);

renderDisplayObject
(
  [ myDisplayObject ],
  {}
);

let myBaseCanvas = document.getElementById("rous-base-canvas");
let myBaseContext = myBaseCanvas.getContext("2d");

let myEventCanvas = document.getElementById("rous-event-canvas");
let myEventContext = myEventCanvas.getContext("2d");

let myGridCanvas = document.getElementById("rous-grid-canvas");
let myGridContext = myGridCanvas.getContext("2d");

let myCrossCanvas = document.getElementById("rous-cross-canvas");
let myCrossContext = myCrossCanvas.getContext("2d");

cleanDisplayContext
(
  [],
  {
    context: myBaseContext,
    fillStyle: "rgb(25,0,25)"
  }
);

canvasDrawGrid
(
  [],
  {
    canvas: myGridCanvas
  }
);

setupDisplayCursor
(
  [],
  {
    canvas: myEventCanvas,
    mouseDown: canvasMouseDownPencil,
    overlay: myEventCanvas,
    mouseMove: canvasMouseMoveCursor
  }
);

