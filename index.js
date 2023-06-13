/* module imports */

import { generateDocumentTitle, generateDocumentFavicon, generateDisplayObject, renderDisplayObject } from "./src/rous/api/display.js";

import { setupFileUpload } from "./src/rous/api/files.js";

import { displayNode, displayEdge } from "./src/rous/api/display.js";

/* functions */

function customListener( dataJson, displayObject )
{
  let inputType = Object.prototype.toString.call(dataJson).slice("[object ".length, -1).toLowerCase();

  switch ( inputType )
  {
    case "array":
      for (let i = 0; i < dataJson.length; i++)
      {
        console.log({ "index": i, "value": dataJson[i] });
      }
      break;
    case "object":
      for (let jsonKey in dataJson)
      {
        console.log({ "key": jsonKey, "value": dataJson[jsonKey] });
      }
      break;
    case "string":
      console.log({ "string": dataJson });
      break;
    default:
      throw new TypeError("File contents not recognizable as JSON (at least, not to me).");
  }
}

/* program */

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
  {
    "layers": ["base", "edge", "node", "event"]
  }
);

renderDisplayObject
(
  [ myDisplayObject ],
  {}
);

setupFileUpload
(
  [],
  {
    "listener": [ customListener, myDisplayObject ]
  }
);

/* output */

console.log("🌹🐀");
