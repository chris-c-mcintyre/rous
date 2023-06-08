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

/* output */

console.log("🌹🐀");
