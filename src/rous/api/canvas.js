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

function drawNode( jsArgs, jsKwargs )
{
  // jsArgs
  let displayCanvasContext = jsArgs[0];
  let displayNodeInstance = jsArgs[1];

  displayCanvasContext.beginPath( );

  displayCanvasContext.strokeStyle = displayEdgeInstance.style.border.color;
  displayCanvasContext.lineWidth = displayEdgeInstance.style.border.width;
  displayCanvasContext.fillStyle = displayEdgeInstance.style.color;

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

export { drawNode, drawEdge, drawVectorFromPosition };

