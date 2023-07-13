
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

/* display graph elements */

function addDisplayNodeProperties( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeId = jsArgs[0];
  let nodePosition = jsArgs[1];
  let nodeJson = jsArgs[2];

  // jsKwargs
  let nodeName = jsKwargs["name"];
  let nodeContent = jsKwargs["content"];

  nodeJson["data"] = {
    "id": nodeId
  };
  nodeJson["position"] = nodePosition;

  if (nodeName) nodeJson["data"]["name"] = nodeName;
  if (nodeContent) nodeJson["content"] = nodeContent;

  return nodeJson;
};

function addDisplayEdgeProperties( jsArgs, jsKwargs )
{
  // jsArgs
  let edgeId = jsArgs[0];
  let edgeSourceId = jsArgs[1];
  let edgeTargetId = jsArgs[2];
  let edgeJson = jsArgs[3];

  // jsKwargs
  let edgeName = jsKwargs["name"];
  let edgeContent = jsKwargs["content"];

  edgeJson["data"] = {
    "id": edgeId,
    "source": edgeSourceId,
    "target": edgeTargetId
  };

  if (edgeName) edgeJson["data"]["name"] = edgeName;
  if (edgeContent) edgeJson["content"] = edgeContent;

  return edgeJson;
}

function createDisplayNode( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeId = jsArgs[0];
  let nodePosition = jsArgs[1];

  // jsKwargs
  let nodeName = jsKwargs["name"];
  let nodeContent = jsKwargs["content"];

  let newNode = {};
  newNode = addDisplayNodeProperties( [ nodeId, nodePosition, newNode ], { "name": nodeName, "content": nodeContent } );

  return newNode;
}

function createDisplayEdge( jsArgs, jsKwargs )
{
  // jsArgs
  let edgeId = jsArgs[0];
  let edgeSourceId = jsArgs[1];
  let edgeTargetId = jsArgs[2];

  // jsKwargs
  let edgeName = jsKwargs["name"];
  let edgeContent = jsKwargs["content"];

  let newEdge = {};
  newEdge = addDisplayEdgeProperties( [ edgeId, edgeSourceId, edgeTargetId, newEdge ], { "name": edgeName, "content": edgeContent } );

  return newEdge;
}

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
  let layerWidth = jsKwargs["width"] ?? 625;
  let layerHeight = jsKwargs["height"] ?? 625;

  let displayObject = {};

  displayObject.layers = [];

  for (let i = 0; i < layerList.length; i++)
  {
    let newLayer = generateDisplayLayer( [ layerList[i], i ], { "width": layerWidth, "height": layerHeight } );
    displayObject.layers[i] = newLayer;
  }

  return displayObject;
}

function renderDisplayObject( jsArgs, jsKwargs )
{
  // jsArgs
  let displayObject = jsArgs[0];

  // jsKwargs
  let layerWidth = jsKwargs["width"] ?? 625;
  let layerHeight = jsKwargs["height"] ?? 625;

  const displayDiv = document.createElement("div");
  displayDiv.style = `width: ${layerWidth}px; height: ${layerHeight}px; position: relative;`;

  for (let i = 0; i < displayObject["layers"].length; i++)
  {
    displayDiv.appendChild(displayObject["layers"][i]);
  }

  document.body.appendChild(displayDiv);
}

export
{
  generateDocumentTitle,
  generateDocumentFavicon,
  addDisplayNodeProperties,
  addDisplayEdgeProperties,
  createDisplayNode,
  createDisplayEdge,
  generateDisplayLayer,
  generateDisplayObject,
  renderDisplayObject
};

