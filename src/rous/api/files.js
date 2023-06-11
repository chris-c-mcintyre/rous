
/* functions */

function handleReaderLoad( loadEvent )
{
  let inputData = JSON.parse(loadEvent.target.result);

  console.log(inputData);

  return inputData;
}

function handleFileChange( changeEvent )
{
  let myFiles = changeEvent.target.files;

  for (let i = 0; i < myFiles.length; i++)
  {
    let currentFile = myFiles[i];
    let currentFileReader = new FileReader();
    currentFileReader.onload = handleReaderLoad;
    currentFileReader.readAsText(currentFile);
  }
}

function fileUploadListener( jsArgs, jsKwargs )
{
  // jsArgs
  let inputElement = document.getElementById( jsArgs[0] );

  let inputListener = inputElement.addEventListener("change", handleFileChange);

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
  let myFileUploadElements = generateFileUpload( [], {} );

  renderFileUpload( myFileUploadElements, {} );

  fileUploadListener( [ myFileUploadElements[0].id ], {} );
}

export { handleReaderLoad, handleFileChange, fileUploadListener, generateFileUpload, renderFileUpload, setupFileUpload };

