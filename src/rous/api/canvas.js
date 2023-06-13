
/* draw functions */

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
