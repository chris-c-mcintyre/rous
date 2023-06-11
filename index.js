/* module imports */

import { generateDisplayObject, renderDisplayObject } from "./src/rous/api/canvas.js";

import { setupFileUpload } from "./src/rous/api/files.js";

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
