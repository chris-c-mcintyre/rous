// script block

function colorAdvancedToggle()
{
  let colorAdvancedDiv = document.getElementById("config-element-color-advanced");

  console.log('x', colorAdvancedDiv);

  if (colorAdvancedDiv.style.display == "none")
  {
    console.log("none");
    colorAdvancedDiv.style.display = "block";
    console.log('y', colorAdvancedDiv);
  }
  else
  {
    console.log("block");
    colorAdvancedDiv.style.display = "none";
    console.log('y', colorAdvancedDiv);
  }
}

// script block

function populateColorLists()
{
  fetch( "./data/colorNameToHex.json" )
  .then(response => response.json())
  .then((data) => {

    let selectElement = document.getElementById("face-config-test-option-select");
    let datalistElement = document.getElementById("face-config-test-option-datalist");

    console.log("DATA");
    console.log(data);

    let colorKeys = Object.keys(data);

    for (let i = 0; i < colorKeys.length; i++)
    {
      let optionElement = document.createElement( "option" );
      optionElement["value"] = colorKeys[i];

      datalistElement.appendChild(optionElement);

      optionElement.appendChild(document.createTextNode(colorKeys[i]));

      selectElement.appendChild(optionElement);
    }
  });
}
populateColorLists();

// script block

globalThis.minicol = {
  "node": "#0000ff",
  "edge": "#ff0000",
  "node-label": "#ff0000",
  "edge-label": "#000000"
};

let colorHexDict = {};
let colorNameDict = {};

fetch('./data/colorHexToName.json')
.then(response => response.json())
.then((data) => {
  colorHexDict = data;
});

fetch('./data/colorNameToHex.json')
.then(response => response.json())
.then((data) => {
  colorNameDict = data;
});

function toggleConfig(displayId)
{

  let configToggle = document.getElementById(displayId + "-toggle");

  console.log(configToggle, displayId);
  /*
  let configSelect = document.getElementById(displayId + "-select");
  let configOptionSelect = document.getElementById(displayId + "-option-select");
  let configOptionList = document.getElementById(displayId + "-option-list");
  let configOptionDatalist = document.getElementById(displayId + "-option-datalist");
  let configOptionColor = document.getElementById(displayId + "-option-color");
  let configOptionText = document.getElementById(displayId + "-option-text");
  let configOptionNumber = document.getElementById(displayId + "-option-number");
  let configOptionRange = document.getElementById(displayId + "-option-range");
  */

  const disabledBoolean = !configToggle.checked;

  /*
  configSelect.disabled = disabledBoolean;
  configOptionSelect.disabled = disabledBoolean;
  configOptionList.disabled = disabledBoolean;
  configOptionDatalist.disabled = disabledBoolean;
  configOptionColor.disabled = disabledBoolean;
  configOptionText.disabled = disabledBoolean;
  configOptionNumber.disabled = disabledBoolean;
  configOptionRange.disabled = disabledBoolean;
  */

  let configElement = document.getElementById(displayId);
  configElement.disabled = disabledBoolean;

  console.log(displayId, "!", disabledBoolean);
}

function colorNameToHex(colorName)
{
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = colorName;
  return ctx.fillStyle;
}

function rgbFormToHex(elementId)
{
  let colorR = parseInt(document.getElementById(elementId + "-r").value, 10);
  let colorG = parseInt(document.getElementById(elementId + "-g").value, 10);
  let colorB = parseInt(document.getElementById(elementId + "-b").value, 10);
  let colorHex = "#" + colorR.toString(16).padStart(2, "0") + colorG.toString(16).padStart(2, "0") + colorB.toString(16).padStart(2, "0");
  return colorHex;
}

function checkColorHexDict(colorHex)
{
  let colorKey = colorHex.toUpperCase();
  if (colorKey in colorHexDict)
  {
    document.getElementById("face-config-test-option-select").value = colorHexDict[colorKey].toLowerCase();
    document.getElementById("face-config-test-option-list").value = colorHexDict[colorKey];
  }
  else
  {
    document.getElementById("face-config-test-option-select").value = "";
    document.getElementById("face-config-test-option-list").value = "";
  }
}

function checkColorHexDictEdge(colorHex)
{
  let colorKey = colorHex.toUpperCase();
  if (colorKey in colorHexDict)
  {
    document.getElementById("color-config-option-select").value = colorHexDict[colorKey].toLowerCase();
    document.getElementById("color-config-option-list").value = colorHexDict[colorKey];
  }
  else
  {
    document.getElementById("color-config-option-select").value = "";
    document.getElementById("color-config-option-list").value = "";
  }
}

function balanceConfig(colorChange)
{
  console.log("balanceConfig", "colorChange", colorChange);

  let inputId = colorChange.target.id;

  let newColorHex = null;

  switch( inputId )
  {
    case "face-config-test-option-select":
      document.getElementById("face-config-test-option-list").value = colorChange.target.value;
      newColorHex = colorNameToHex(colorChange.target.value);
      break;
    case "face-config-test-option-list":
      document.getElementById("face-config-test-option-select").value = colorChange.target.value;
      newColorHex = colorNameToHex(colorChange.target.value);
      break;
    case "face-config-test-option-color":
    case "face-config-test-option-text":
      newColorHex = colorChange.target.value;
      checkColorHexDict(newColorHex);
      break;
    case "face-config-test-option-number-r":
    case "face-config-test-option-number-g":
    case "face-config-test-option-number-b":
      newColorHex = rgbFormToHex("face-config-test-option-number");
      checkColorHexDict(newColorHex);
      break;
    case "face-config-test-option-range-r":
    case "face-config-test-option-range-g":
    case "face-config-test-option-range-b":
      newColorHex = rgbFormToHex("face-config-test-option-range");
      checkColorHexDict(newColorHex);
      break;
  };

  document.getElementById("face-config-test-option-color").value = newColorHex;
  document.getElementById("face-config-test-option-text").value = newColorHex;

  let newColorR = parseInt(newColorHex.slice(1,3), 16);
  let newColorG = parseInt(newColorHex.slice(3,5), 16);
  let newColorB = parseInt(newColorHex.slice(5,7), 16);

  document.getElementById("face-config-test-option-number-r").value = newColorR;
  document.getElementById("face-config-test-option-number-g").value = newColorG;
  document.getElementById("face-config-test-option-number-b").value = newColorB;

  document.getElementById("face-config-test-option-range-r").value = newColorR;
  document.getElementById("face-config-test-option-range-g").value = newColorG;
  document.getElementById("face-config-test-option-range-b").value = newColorB;

  console.log(newColorHex);

  globalThis.minicol[globalThis.minitype] = newColorHex;

  updateTemplate();

  const toggleFlag = document.getElementById("color-config-minimap-apply-toggle").checked;
  if (toggleFlag) applyColorElement();
}
globalThis.balanceConfig = balanceConfig;

function balanceConfigEdge(colorChange)
{
  console.log(colorChange);

  let inputId = colorChange.target.id;

  let newColorHex = null;

  switch( inputId )
  {
    case "color-config-option-select":
      document.getElementById("color-config-option-list").value = colorChange.target.value;
      newColorHex = colorNameToHex(colorChange.target.value);
      break;
    case "color-config-option-list":
      document.getElementById("color-config-option-select").value = colorChange.target.value;
      newColorHex = colorNameToHex(colorChange.target.value);
      break;
    case "color-config-option-color":
    case "color-config-option-text":
      newColorHex = colorChange.target.value;
      checkColorHexDictEdge(newColorHex);
      break;
    case "color-config-option-number-r":
    case "color-config-option-number-g":
    case "color-config-option-number-b":
      newColorHex = rgbFormToHex("color-config-option-number");
      checkColorHexDictEdge(newColorHex);
      break;
    case "color-config-option-range-r":
    case "color-config-option-range-g":
    case "color-config-option-range-b":
      newColorHex = rgbFormToHex("color-config-option-range");
      checkColorHexDictEdge(newColorHex);
      break;
  };

  document.getElementById("color-config-option-color").value = newColorHex;
  document.getElementById("color-config-option-text").value = newColorHex;

  let newColorR = parseInt(newColorHex.slice(1,3), 16);
  let newColorG = parseInt(newColorHex.slice(3,5), 16);
  let newColorB = parseInt(newColorHex.slice(5,7), 16);

  document.getElementById("color-config-option-number-r").value = newColorR;
  document.getElementById("color-config-option-number-g").value = newColorG;
  document.getElementById("color-config-option-number-b").value = newColorB;

  document.getElementById("color-config-option-range-r").value = newColorR;
  document.getElementById("color-config-option-range-g").value = newColorG;
  document.getElementById("color-config-option-range-b").value = newColorB;

  console.log(newColorHex);

  globalThis.minicoledge = newColorHex;

  updateTemplateEdge();
}
globalThis.balanceConfigEdge = balanceConfigEdge;

function balanceColor()
{
  
}
globalThis.balanceColor = balanceColor;

function locationConfig()
{
  let xElement = document.getElementsByName("location-x-radio");
  let xValue;
  for (x of xElement) if (x.checked) xValue = x.value;

  let yElement = document.getElementsByName("location-y-radio");
  let yValue;
  for (y of yElement) if (y.checked) yValue = y.value;

  if ( xValue == "random" || yValue == "random")
  {
    globalThis.graphs["color-config-template"]["graph"].nodes().positions
    (
      function( node, i )
      {
        const newX = 25 + Math.floor(Math.random() * 850);
        const newY = 25 + Math.floor(Math.random() * 850);
        return {
          x: newX,
          y: newY
        };
      }
    );
  }
}
globalThis.locationConfig = locationConfig;

function listenerSetup()
{
  const inputs = document.getElementById("face-config-test-form").elements;

  for (let i = 0; i < inputs.length; i++)
  {
    console.log(inputs[i]);

    inputs[i].addEventListener('change', balanceConfig);
  }

  const locationInputs = document.getElementById("location-config-fieldset").elements;

  for (let i = 0; i < locationInputs.length; i++)
  {
    console.log(locationInputs[i]);

    locationInputs[i].addEventListener('change', locationConfig);
  }
}

function updateTemplate()
{
  let elementType = globalThis.minitype;
  let newStyleColor = globalThis.minicol[elementType];

  if (elementType == "node")
  {
    globalThis.graphs["color-config-minimap"]["graph"].style().selector("node").style("background-color", newStyleColor).update();
  }
  else if (elementType == "edge")
  {
    globalThis.graphs["color-config-minimap"]["graph"].style().selector("edge").style("line-color", newStyleColor).update();
  }
  else if (elementType == "node-label")
  {
    globalThis.graphs["color-config-minimap"]["graph"].style().selector("node").style("color", newStyleColor).update();
  }
  else if (elementType == "edge-label")
  {
    globalThis.graphs["color-config-minimap"]["graph"].style().selector("edge").style("color", newStyleColor).update();
  }
}

function updateTemplateEdge()
{
  let newStyleColor = globalThis.minicoledge;

  globalThis.graphs["color-config-minimap-edge"]["graph"].style().selector("edge").style("line-color", newStyleColor).update();
}

function applyElementTemplate( elementType, elementStyleName, elementStyleValue )
{
  globalThis.graphs["color-config-template"]["graph"].style().selector( elementType ).style( elementStyleName, elementStyleValue ).update();
}

function applyColorElement()
{
  applyElementTemplate( "node", "background-color", globalThis.minicol["node"] );
  applyElementTemplate( "edge", "line-color", globalThis.minicol["edge"] );
  applyElementTemplate( "node", "color", globalThis.minicol["node-label"] );
  applyElementTemplate( "edge", "color", globalThis.minicol["edge-label"] );
}

function applyTemplate()
{
  let templateStyleColor = globalThis.minicol["node"];

  globalThis.graphs["color-config-template"]["graph"].style().selector("node").style("background-color", templateStyleColor).update();
}

function applyTemplateEdge()
{
  let templateStyleColor = globalThis.minicoledge;

  globalThis.graphs["color-config-template"]["graph"].style().selector("edge").style("line-color", templateStyleColor).update();
}

function colorConfigTypeDisplay()
{
  let typeSelectValue = document.getElementById("color-config-type-select").value;

  ["name","hex","rgb"].forEach(function(elementType)
  {
    let typeDiv = document.getElementById("color-type-" + elementType + "-div");
    if (elementType == typeSelectValue)
    {
      typeDiv.style.display = "block";
    }
    else
    {
      typeDiv.style.display = "none";
    }
  });
}

function colorConfigNameDisplay()
{
  let typeSelectValue = document.getElementById("color-type-name-select").value;

  ["text","list","data","random"].forEach(function(elementType)
  {
    let typeDiv = document.getElementById("color-type-" + "name" + "-" + elementType + "-div");
    if (elementType == typeSelectValue)
    {
      typeDiv.style.display = "block";
    }
    else
    {
      typeDiv.style.display = "none";
    }
  });
}

function colorConfigHexDisplay()
{
  let typeSelectValue = document.getElementById("color-type-hex-select").value;

  ["text","range","data","random"].forEach(function(elementType)
  {
    let typeDiv = document.getElementById("color-type-" + "hex" + "-" + elementType + "-div");
    if (elementType == typeSelectValue)
    {
      typeDiv.style.display = "block";
    }
    else
    {
      typeDiv.style.display = "none";
    }
  });
}

listenerSetup();

