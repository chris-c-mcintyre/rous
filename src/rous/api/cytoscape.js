import { createDisplayNode } from "./display.js";

/* cytoscape elements */

function addCytoNodeProperties( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeJson = jsArgs[0];

  // jsKwargs
  let nodeLocked = jsKwargs["locked"] ?? false;
  let nodePannable = jsKwargs["pannable"] ?? true;
  let nodeSelectable = jsKwargs["selectable"] ?? true;

  nodeJson["group"] = "nodes";

  nodeJson["locked"] = nodeLocked;
  nodeJson["pannable"] = nodePannable;
  nodeJson["selectable"] = nodeSelectable;

  return nodeJson;
}

function addCytoEdgeProperties( jsArgs, jsKwargs )
{
  // jsArgs
  let edgeJson = jsArgs[0];

  // jsKwargs
  let edgeLocked = jsKwargs["locked"] ?? false;
  let edgePannable = jsKwargs["pannable"] ?? true;
  let edgeSelectable = jsKwargs["selectable"] ?? true;

  edgeJson["group"] = "edges";

  edgeJson["locked"] = edgeLocked;
  edgeJson["pannable"] = edgePannable;
  edgeJson["selectable"] = edgeSelectable;

  return edgeJson;
}

function createCytoNode( jsArgs, jsKwargs )
{
  // jsArgs
  let nodeId = jsArgs[0];
  let nodePosition = jsArgs[1];

  // jsKwargs
  let nodeName = jsKwargs["name"];
  let nodeContent = jsKwargs["content"] ?? {};
  let nodeLocked = jsKwargs["locked"] ?? false;
  let nodePannable = jsKwargs["pannable"] ?? true;
  let nodeSelectable = jsKwargs["selectable"] ?? true;

  let cytoNode = createDisplayNode( [ nodeId, nodePosition ], { "name": nodeName, "content": nodeContent } );

  cytoNode = addCytoNodeProperties( [ cytoNode ], { "locked": nodeLocked, "pannable": nodePannable, "selectable": nodeSelectable } );

  return cytoNode;
}

function createCytoEdge( jsArgs, jsKwargs )
{
  // jsArgs
  let edgeId = jsArgs[0];
  let edgeSource = jsArgs[1];
  let edgeTarget = jsArgs[2];

  // jsKwargs
  let edgeName = jsKwargs["name"];
  let edgeContent = jsKwargs["content"] ?? {};
  let edgeLocked = jsKwargs["locked"] ?? false;
  let edgePannable = jsKwargs["pannable"] ?? true;
  let edgeSelectable = jsKwargs["selectable"] ?? true;

  let cytoEdge = createDisplayEdge( [ edgeId, edgeSource, edgeTarget ], { "name": edgeName, "content": edgeContent } );

  cytoEdge = addCytoEdgeProperties( [ cytoEdge ], { "locked": edgeLocked, "pannable": edgePannable, "selectable": edgeSelectable } );

  return cytoEdge;
}

export { addCytoNodeProperties, createCytoNode };

