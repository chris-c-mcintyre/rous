import { addDisplayNodeProperties, createDisplayNode, generateDisplayLayer, generateDisplayObject, renderDisplayObject } from "./api/display.js";
import { addCanvasNodeProperties, createCanvasNode } from "./api/canvas.js";
import { addCytoNodeProperties, createCytoNode } from "./api/cytoscape.js";

/* network creation */

function createNetwork( jsArgs, jsKwargs )
{
  let newDisplayObject = generateDisplayObject
  (
    [],
    {
      "layers": ["base", "edge", "node", "event"]
    }
  );

  renderDisplayObject
  (
    [ newDisplayObject ],
    {}
  );
  // TODO
  return 1;
}

function networkFromFile( jsArgs, jsKwargs )
{
  // TODO
  return 1;
}

function networkFromList( jsArgs, jsKwargs )
{
  // TODO
  return 1;
}
