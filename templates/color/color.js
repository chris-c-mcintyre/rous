
// self-styling

import { generateDocumentFavicon } from "../../src/rous/api/display.js";

generateDocumentFavicon
(
  [],
  {
    icon: Math.random() >= 0.96 ? "🐀" : "🌹"
  }
);

// environment

globalThis.graphs = {
  "color-config-minimap": {
    "graph": null,
    "node": {},
    "edge": {},
    "face": {}
  },
  "color-config-minimap-edge": {
    "graph": null,
    "node": {},
    "edge": {},
    "face": {}
  },
  "color-config-template": {
    "graph": null,
    "node": {},
    "edge": {},
    "face": {}
  }
};

// functions

function getRandomInt(min, max)
{
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

globalThis.addScope = function addScope(displayId = 'color-config-template', startingElements = [])
{
  return cytoscape({

    container: document.getElementById(displayId),

    elements: startingElements,

    layout: {
      name: 'preset',
    },

    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(name)',
        }
      },

      {
        selector: 'edge',
        style: {
          'label': 'data(id)',
        }
      }
    ]

  });
};


globalThis.displayNodeData = function(nodeData)
{
  var sel = document.getElementById("data-display");
  var opt = document.createElement("option");

  if (Object.prototype.toString.call(nodeData["content"]) == "[object Array]")
  {
    opt.appendChild(document.createTextNode("[ " + nodeData["data"]["id"] + " ]"));
  }
  else if (typeof nodeData["content"] == "object")
  {
    opt.appendChild(document.createTextNode("{ " + nodeData["data"]["id"] + " }"));
  }
  else
  {
    opt.appendChild(document.createTextNode(nodeData["data"]["id"]));
  }
  opt.setAttribute("value", nodeData["data"]["id"]);
  sel.appendChild(opt);
}

globalThis.addNodeProperties = function(nodeId, nodeContent = {})
{
  let nodeJson = {};
  nodeJson["group"] = 'nodes';
  nodeJson["data"] = {
    id: nodeId
  };
  nodeJson["position"] = {
    x: 25 + Math.floor(Math.random() * 850),
    y: 25 + Math.floor(Math.random() * 850)
  };
  nodeJson["data"]["name"] = "(" + nodeJson["position"].x + "," + nodeJson["position"].y + ")";
  nodeJson["content"] = nodeContent;

  return nodeJson;
};

globalThis.addEdgeProperties = function(){};

globalThis.createNetworkNode = function()
{
  let newId = Math.random().toString().split(".").pop();
  let newNode = {};
  newNode = addNodeProperties(newId, newNode);
  displayNodeData(newNode);
  globalThis.graphs["color-config-template"]["node"][newId] = newNode;
  globalThis.graphs["color-config-template"]["graph"].add(newNode);
}

globalThis.showNetworkNodes = function(dataArray)
{
  for (let i = 0; i < dataArray.length; i++)
  {
    displayNodeData(dataArray[i]);
  }
}

globalThis.loadNetworkNodes = function(dataArray)
{
  console.log('load network nodes');
  console.log(dataArray);
  for (let i = 0; i < dataArray.length; i++)
  {
    let newId = Math.random().toString().split(".").pop();
    dataArray[i] = addNodeProperties(newId, dataArray[i]);
    globalThis.graphs["color-config-template"]["node"][newId] = dataArray[i];
  }
  globalThis.graphs["color-config-template"]["graph"].add(dataArray);

  let keyList = Object.keys(globalThis.graphs["color-config-template"]["node"]);
  for ( let i = 1; i < keyList.length; i++ )
  {
    let id1 = keyList[i-1];
    let id2 = keyList[i];
    let id12 = id1 + "-" + id2;
    let edgeJson = {};
    edgeJson["group"] = "edges";
    edgeJson["data"] = {
      id: id12,
      source: id1,
      target: id2,
      name: i
    };
    globalThis.graphs["color-config-template"]["edge"][id12] = edgeJson;
    globalThis.graphs["color-config-template"]["graph"].add(edgeJson);
  }
  let idX = keyList[keyList.length-1];
  let id0 = keyList[0];
  let idX0 = id0 + "-" + idX;
  let edgeJson = {};
  edgeJson["group"] = "edges";
  edgeJson["data"] = {
    id: idX0,
    source: idX,
    target: id0,
    name: 0
  };
  globalThis.graphs["color-config-template"]["edge"][idX0] = edgeJson;
  globalThis.graphs["color-config-template"]["graph"].add(edgeJson);
};

globalThis.showCytoElements = function(dataArray)
{
  for (let i = 0; i < dataArray.length; i++)
  {
    displayNodeData(dataArray[i]);
  }
};

globalThis.loadCytoElements = async function(dataArray)
{
  console.log("data array");
  console.log(dataArray);

  for (let i = 0; i < dataArray.length; i++)
  {
    let elementId = dataArray[i]["data"]["id"];
    let elementGroup = dataArray[i]["group"];

    if ( elementGroup == "nodes" ) globalThis.graphs["color-config-template"]["node"][elementId] = dataArray[i];
    if ( elementGroup == "edges" ) globalThis.graphs["color-config-template"]["edge"][elementId] = dataArray[i];
  }
  globalThis.graphs["color-config-template"]["graph"].add(dataArray);
};

globalThis.loadNetworkFromFile = function( fileInputId )
{
  let inputFiles = document.getElementById( fileInputId ).files;

  if (inputFiles.length > 0) inputFiles[0].text()
  .then(file => JSON.parse(file))
  .then((data) => {
    loadNetworkNodes(data);
  });
};

globalThis.loadNetworkFromPath = function( directoryPath, directoryRoot = "." )
{
  fetch( directoryRoot + directoryPath )
  .then(response => response.json())
  .then((data) => {

    loadNetworkNodes(data);

    let cytoLayoutOptions = {
      name: 'breadthfirst',
      circle: true
    };
    let cytoLayoutInstance = globalThis.graphs["color-config-template"]["graph"].layout( cytoLayoutOptions );
    cytoLayoutInstance.run();
  });
}

globalThis.loadNetworkFromDirectory = function( directoryPath, directoryRoot = "." )
{
  fetch( directoryRoot + directoryPath )
  .then(response => response.json())
  .then((data) => {

    loadCytoElements(data);

    let cytoLayoutOptions = {
      name: 'breadthfirst',
      circle: true
    };
    let cytoLayoutInstance = globalThis.graphs["color-config-template"]["graph"].layout( cytoLayoutOptions );
    cytoLayoutInstance.run();
  });
};

globalThis.getSelectedNodes = function()
{
  let selectedNodes = globalThis.graphs["color-config-template"]["graph"].elements().filter( (element) => { return element.selected(); } );

  for (let i = 0; i < selectedNodes.length; i++)
  {
    let ithId = selectedNodes[i].data().id;
    let ithNode = globalThis.graphs["color-config-template"]["node"][ithId];
    console.log(ithId, ithNode);
  }

  return selectedNodes;
}

// load with template elements

let templateElements = [];

let templateNodeA = {};
templateNodeA["group"] = "nodes";
templateNodeA["data"] = {
  "id": "color-config-template-node-a",
  "name": "A"
};
templateNodeA["position"] = { x: 25, y: 25 };
templateNodeA["locked"] = true;
templateNodeA["selectable"] = false;
templateElements.push(templateNodeA);

let templateNodeB = {};
templateNodeB["group"] = "nodes";
templateNodeB["data"] = {
  "id": "color-config-template-node-b",
  "name": "B"
};
templateNodeB["position"] = { x: 275, y: 25 };
templateNodeB["locked"] = true;
templateNodeB["selectable"] = false;
templateElements.push(templateNodeB);

let templateNodeC = {};
templateNodeC["group"] = "nodes";
templateNodeC["data"] = {
  "id": "color-config-template-node-c",
  "name": "C"
};
templateNodeC["position"] = { x: 150, y: 241 };
templateNodeC["locked"] = true;
templateNodeC["selectable"] = false;
templateElements.push(templateNodeC);

let templateNodeD = {};
templateNodeD["group"] = "nodes";
templateNodeD["data"] = {
  "id": "color-config-template-node-d",
  "name": "D"
};
templateNodeD["position"] = { x: 150, y: 133 };
templateElements.push(templateNodeD);

let templateEdgeAB = {};
templateEdgeAB["group"] = "edges";
templateEdgeAB["data"] = {
  "id": "color-config-template-edge-ab",
  "name": "ab",
  "source": "color-config-template-node-a",
  "target": "color-config-template-node-b"
};
templateEdgeAB["pannable"] = false;
templateEdgeAB["selectable"] = false;
templateElements.push(templateEdgeAB);

let templateEdgeBC= {};
templateEdgeBC["group"] = "edges";
templateEdgeBC["data"] = {
  "id": "color-config-template-edge-bc",
  "name": "bc",
  "source": "color-config-template-node-b",
  "target": "color-config-template-node-c"
};
templateEdgeBC["pannable"] = false;
templateEdgeBC["selectable"] = false;
templateElements.push(templateEdgeBC);

let templateEdgeCA= {};
templateEdgeCA["group"] = "edges";
templateEdgeCA["data"] = {
  "id": "color-config-template-edge-ca",
  "name": "ca",
  "source": "color-config-template-node-c",
  "target": "color-config-template-node-a"
};
templateEdgeCA["pannable"] = false;
templateEdgeCA["selectable"] = false;
templateElements.push(templateEdgeCA);

let templateEdgeDA= {};
templateEdgeDA["group"] = "edges";
templateEdgeDA["data"] = {
  "id": "color-config-template-edge-da",
  "name": "da",
  "source": "color-config-template-node-d",
  "target": "color-config-template-node-a"
};
templateEdgeDA["pannable"] = false;
templateElements.push(templateEdgeDA);

let templateEdgeDB= {};
templateEdgeDB["group"] = "edges";
templateEdgeDB["data"] = {
  "id": "color-config-template-edge-db",
  "name": "db",
  "source": "color-config-template-node-d",
  "target": "color-config-template-node-b"
};
templateEdgeDB["pannable"] = false;
templateElements.push(templateEdgeDB);

let templateEdgeDC= {};
templateEdgeDC["group"] = "edges";
templateEdgeDC["data"] = {
  "id": "color-config-template-edge-dc",
  "name": "dc",
  "source": "color-config-template-node-d",
  "target": "color-config-template-node-c"
};
templateEdgeDC["pannable"] = false;
templateElements.push(templateEdgeDC);


globalThis.graphs["color-config-minimap"]["graph"] = cytoscape(
{
  container: document.getElementById("color-config-minimap"),

  elements: templateElements,

  style: [
    {
      selector: 'node',
      style: {
        'label': 'data(name)',
      }
    },
    {
      selector: 'edge',
      style: {
        'label': 'data(name)',
      }
    }
  ]
});

globalThis.graphs["color-config-minimap-edge"]["graph"] = cytoscape(
{
  container: document.getElementById("color-config-minimap-edge"),

  elements: templateElements,

  style: [
  {
    selector: 'edge',
    style: {
      'label': 'data(name)',
      'line-color': '#ff0000'
    }
  }]
});

globalThis.graphs["color-config-template"]["graph"] = addScope("color-config-template", []);

function setupConfig()
{
  globalThis.minitype = "node-label";
  let nodeLabelElement = document.getElementById("face-config-test-option-color");
  nodeLabelElement.value = "#ff0000";
  globalThis.balanceConfig({ target: nodeLabelElement });

  globalThis.minitype = "edge-label";
  let edgeLabelElement = document.getElementById("face-config-test-option-color");
  edgeLabelElement.value = "#bbbbbb";
  globalThis.balanceConfig({ target: edgeLabelElement });

  globalThis.minitype = "edge";
  let edgeElement = document.getElementById("face-config-test-option-color");
  edgeElement.value = "#00ff00";
  globalThis.balanceConfig({ target: edgeElement });

  globalThis.minitype = "node";
  let nodeElement = document.getElementById("face-config-test-option-color");
  nodeElement.value = "#0000ff";
  globalThis.balanceConfig({ target: nodeElement });
}

setupConfig();

