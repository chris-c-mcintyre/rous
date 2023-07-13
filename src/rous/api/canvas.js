import { createDisplayNode } from "./display.js";

/* canvas elements */

function addCanvasNodeProperties( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeJson = jsArgs[0];

  // jsKwargs
  let nodeStyle = jsKwargs["style"] ?? {};

  nodeJson["style"] = nodeStyle;

  return nodeJson;
}

function createCanvasNode( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeId = jsArgs[0];
  let nodePosition = jsArgs[1];

  // jsKwargs
  let nodeName = jsKwargs["name"];
  let nodeContent = jsKwargs["content"] ?? {};
  let nodeStyle = jsKwargs["style"] ?? {};

  let canvasNode = createDisplayNode( [ nodeId, nodePosition ], { "name": nodeName, "content": nodeContent } );

  canvasNode = addCanvasNodeProperties( [ canvasNode ], { "style": nodeStyle } );

  return canvasNode;
}

/* draw functions */

function clearContext( jsArgs, jsKwargs )
{
  let myContext = jsKwargs.context;

  myContext.clearRect
  (
    0,
    0,
    myContext.canvas.width,
    myContext.canvas.height
  );
}

function cleanContext( jsArgs, jsKwargs )
{
  let myContext = jsKwargs.context;

  clearContext( jsArgs, jsKwargs );

  myContext.fillStyle = jsKwargs.fillStyle;
  myContext.fillRect
  (
    0,
    0,
    myContext.canvas.width,
    myContext.canvas.height
  );
}

function drawNode( jsArgs, jsKwargs )
{
  // jsArgs
  let displayCanvasContext = jsArgs[0];
  let displayNodeInstance = jsArgs[1];

  displayCanvasContext.beginPath( );

  displayCanvasContext.strokeStyle = displayNodeInstance.style.border.color;
  displayCanvasContext.lineWidth = displayNodeInstance.style.border.width;
  displayCanvasContext.fillStyle = displayNodeInstance.style.color;

  displayCanvasContext.arc
  (
    displayNodeInstance.position.x,
    displayNodeInstance.position.y,
    displayNodeInstance.style.width,
    0,
    2 * Math.PI
  );

  displayCanvasContext.stroke( );
}

function drawEdge( jsArgs, jsKwargs )
{
  // jsArgs
  let displayCanvasContext = jsArgs[0];
  let displayEdgeInstance = jsArgs[1];

  displayCanvasContext.beginPath( );

  displayCanvasContext.strokeStyle = displayEdgeInstance.style.color;
  displayCanvasContext.lineWidth = displayEdgeInstance.style.width;

  displayCanvasContext.moveTo( displayEdgeInstance.line.initial.x, displayEdgeInstance.line.initial.y );
  displayCanvasContext.lineTo( displayEdgeInstance.line.terminal.x, displayEdgeInstance.line.terminal.y );

  displayCanvasContext.stroke( );
}

function drawVectorFromPosition( jsArgs, jsKwargs )
{
  // jsArgs
  let displayCanvasContext = jsArgs[0];
  let displayVectorInstance = jsArgs[1];
  let displayPositionInstance = jsArgs[2];

  let displayAngleRadians = displayVectorInstance.direction.orientation.radians;

  displayCanvasContext.beginPath( );

  displayCanvasContext.strokeStyle = displayVectorInstance.style.color;
  displayCanvasContext.lineWidth = displayVectorInstance.style.width;

  displayCanvasContext.moveTo(
    displayPositionInstance.x,
    displayPositionInstance.y
  );

  displayCanvasContext.lineTo(
    displayPositionInstance.x + displayVectorInstance.magnitude * Math.cos( displayAngleRadians ),
    displayPositionInstance.y + displayVectorInstance.magnitude * Math.sin( displayAngleRadians )
  );

  displayCanvasContext.stroke( );
}

function drawGrid( jsArgs, jsKwargs )
{
  // jsArgs
  let gridCanvas = jsArgs[0];

  // jsKwargs
  const gridRowSize = jsKwargs.rowSize ?? 25;
  const gridColSize = jsKwargs.colSize ?? 25;
  const gridLineWidth = jsKwargs.lineWidth ?? 1;
  const gridStrokeStyle = jsKwargs.strokeStyle ?? "rgb(125,125,125)";

  const gridRowCount = Math.floor(gridCanvas.width / gridRowSize) + 1;
  const gridColCount = Math.floor(gridCanvas.height / gridColSize) + 1;

  let gridCanvasContext = gridCanvas.getContext("2d");
  let gridRect = gridCanvas.getBoundingClientRect();

  gridCanvasContext.beginPath();
  gridCanvasContext.lineWidth = gridLineWidth;
  gridCanvasContext.strokeStyle = gridStrokeStyle;

  gridCanvasContext.moveTo(0, 0);
  gridCanvasContext.lineTo(gridRect.right, 0);

  for (let i = 1; i < gridRowCount; i++)
  {
    const rowPosition = i * gridRowSize;
    gridCanvasContext.moveTo(0, rowPosition);
    gridCanvasContext.lineTo(gridRect.right, rowPosition);
  }

  gridCanvasContext.moveTo(0, 0);
  gridCanvasContext.lineTo(0, gridRect.bottom);

  for (let i = 1; i < gridColCount; i++)
  {
    const colPosition = i * gridColSize;
    gridCanvasContext.moveTo(colPosition, 0);
    gridCanvasContext.lineTo(colPosition, gridRect.bottom);
  }

  gridCanvasContext.stroke();
}

/* compositional functions */

function canvasDrawLine( jsArgs, jsKwargs )
{
  // TODO
  return 1;
}

function canvasDrawCirc( jsArgs, jsKwargs )
{
  // TODO
  return 1;
}

function canvasDrawRect( jsArgs, jsKwargs )
{
  // TODO
  return 1;
}

/* compositional features */

// TODO

let useGrid;

let useCross;

let useCursor;

let connectOnClick;

let drawOnClick;

let drawOnDrag;

let lockToGrid;

let lockToGridVertex;

let lockToGridSegment;

let lockToGridCell;

let highlightGrid;

/* module exports */

export { addCanvasNodeProperties, createCanvasNode, clearContext, cleanContext, drawNode, drawEdge, drawVectorFromPosition, drawGrid };

