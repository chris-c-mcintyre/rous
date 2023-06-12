/* module imports */

import { generateDocumentTitle, generateDocumentFavicon, generateDisplayObject, renderDisplayObject } from "./src/rous/api/display.js";

import { setupFileUpload } from "./src/rous/api/files.js";

/* functions */

function customListener( dataJson )
{
  let keyCounter = 0;

  for (let jsonKey in dataJson)
  {
    keyCounter += 1;
    console.log(keyCounter, ":", jsonKey, ":", dataJson[jsonKey]);
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
    "listener": console.log
  }
);

/* output */

console.log("🌹🐀");
