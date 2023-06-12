
/* functions */

function handleReaderLoad( jsArgs, jsKwargs )
{
  // jsArgs
  let loadEvent = jsArgs[0];

  // jsKwargs
  let listenerFunction = (jsKwargs["listener"] && jsKwargs["listener"][0]) ? jsKwargs["listener"][0] : console.log;
  let displayObject = (jsKwargs["listener"] && jsKwargs["listener"][1]) ? jsKwargs["listener"][1] : null;

  let inputData = JSON.parse(loadEvent.target.result);

  listenerFunction(inputData, displayObject);
}

function handleFileChange( jsArgs, jsKwargs )
{
  // jsArgs
  let changeEvent = jsArgs[0];

  // jsKwargs
  let listenerArgs = jsKwargs["listener"] ?? {};
  let displayObject = jsKwargs["display"] ?? null;

  let myFiles = changeEvent.target.files;

  for (let i = 0; i < myFiles.length; i++)
  {
    let currentFile = myFiles[i];
    let currentFileReader = new FileReader();
    currentFileReader.onload = function(loadEvent)
    {
      handleReaderLoad( [ loadEvent ], { "listener": listenerArgs } );
    };
    currentFileReader.readAsText(currentFile);
  }
}

function fileUploadListener( jsArgs, jsKwargs )
{
  // jsArgs
  let inputElement = document.getElementById( jsArgs[0] );

  // jsKwargs
  let listenerArgs = jsKwargs["listener"] ?? {};

  let inputListener = inputElement.addEventListener("change", function(changeEvent)
  {
    handleFileChange( [ changeEvent ], { "listener": listenerArgs } );
  });

  return inputListener;
}

function generateFileUpload( jsArgs, jsKwargs )
{
  const fileUploadElement = document.createElement("input");
  fileUploadElement.id = `rous-file-upload`;
  fileUploadElement.type = "file";
  fileUploadElement.accept = ".csv, .txt, .json";
  fileUploadElement.multiple = true;

  const fileUploadLabel = document.createElement("label");
  fileUploadLabel.for = fileUploadElement.id;
  fileUploadLabel.innerText = "Create Network From Files";

  return [ fileUploadElement, fileUploadLabel ];
}

function renderFileUpload( jsArgs, jsKwargs )
{
  // jsArgs
  let uploadElement = jsArgs[0];
  let uploadLabel = jsArgs[1];

  document.body.appendChild(uploadElement);
  document.body.appendChild(uploadLabel);
}

function setupFileUpload( jsArgs, jsKwargs )
{
  // jsKwargs
  let generateArgs = jsKwargs["generate"] ?? {};
  let renderArgs = jsKwargs["render"] ?? {};
  let listenerArgs = jsKwargs["listener"] ?? {};

  let myFileUploadElements = generateFileUpload( [], generateArgs );

  renderFileUpload( myFileUploadElements, renderArgs );

  fileUploadListener( [ myFileUploadElements[0].id ], { "listener": listenerArgs } );
}

export { handleReaderLoad, handleFileChange, fileUploadListener, generateFileUpload, renderFileUpload, setupFileUpload };

