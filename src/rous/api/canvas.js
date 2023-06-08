
/* display functions */

function generateDisplayLayer( jsArgs, jsKwargs )
{
  // jsArgs
  let layerName = jsArgs[0];
  let layerIndex = jsArgs[1];

  // jsKwargs
  let layerWidth = jsKwargs["width"] ?? 625;
  let layerHeight = jsKwargs["height"] ?? 625;

  const displayCanvasElement = document.createElement("canvas");
  displayCanvasElement.id = `rous-${layerName}-canvas`;
  displayCanvasElement.width = layerWidth;
  displayCanvasElement.height = layerHeight;
  displayCanvasElement.style = `position: absolute; left: 0; top: 0; z-index: ${layerIndex};`;

  return displayCanvasElement;
}

function generateDisplayObject( jsArgs, jsKwargs )
{
  // jsKwargs
  let layerList = jsKwargs["layers"] ?? ["base", "face", "edge", "node", "grid", "cross", "event"];

  let displayObject = {};

  displayObject.layers = [];

  for (let i = 0; i < layerList.length; i++)
  {
    let newLayer = generateDisplayLayer( [ layerList[i], i ], {} );
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

export { generateDisplayLayer, generateDisplayObject, renderDisplayObject };

