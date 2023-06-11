/* module imports */

import { generateDocumentTitle, generateDocumentFavicon, generateDisplayObject, renderDisplayObject } from "./src/rous/api/display.js";

import { setupFileUpload } from "./src/rous/api/files.js";

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

setupFileUpload();

/* output */

console.log("🌹🐀");
