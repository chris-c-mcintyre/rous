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

export { addCytoNodeProperties, createCytoNode };

