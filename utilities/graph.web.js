// functions

// - minmax

// - - array of objects by key

function objArrKeyMinMaxSum
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0][objKey];
  let inpMin = inpArr[0][objKey];
  let inpSum = inpArr[0][objKey];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i][objKey] > inpMax) inpMax = inpArr[i][objKey];
    if (inpArr[i][objKey] < inpMin) inpMin = inpArr[i][objKey];
    inpSum += inpArr[i][objKey];
  }
  return [ inpMin, inpMax, inpSum ];
}

function objArrKeyMinMax
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0][objKey];
  let inpMin = inpArr[0][objKey];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i][objKey] > inpMax) inpMax = inpArr[i][objKey];
    if (inpArr[i][objKey] < inpMin) inpMin = inpArr[i][objKey];
  }
  return [ inpMin, inpMax ];
}

function objArrKeyMin
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  let inpMin = inpArr[0][objKey];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i][objKey] < inpMin) inpMin = inpArr[i][objKey];
  }
  return inpMin;
}

function objArrKeyMax
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0][objKey];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i][objKey] > inpMax) inpMax = inpArr[i][objKey];
  }
  return inpMax;
}

function objArrKeySum
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  let inpSum = inpArr[0][objKey];
  for (let i = 1; i < arrLen; ++i)
  {
    inpSum += inpArr[i][objKey];
  }
  return inpSum;
}

// - - array of values

function arrMinMaxSum
(
  inpArr
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0];
  let inpMin = inpArr[0];
  let inpSum = inpArr[0];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i] > inpMax) inpMax = inpArr[i];
    if (inpArr[i] < inpMin) inpMin = inpArr[i];
    inpSum += inpArr[i];
  }
  return [ inpMin, inpMax, inpSum ];
}

function arrMinMax
(
  inpArr
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0];
  let inpMin = inpArr[0];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i] > inpMax) inpMax = inpArr[i];
    if (inpArr[i] < inpMin) inpMin = inpArr[i];
  }
  return [ inpMin, inpMax ];
}

function arrMin
(
  inpArr
)
{
  const arrLen = inpArr.length;
  let inpMin = inpArr[0];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i] < inpMin) inpMin = inpArr[i];
  }
  return inpMin;
}

function arrMax
(
  inpArr
)
{
  const arrLen = inpArr.length;
  let inpMax = inpArr[0];
  for (let i = 1; i < arrLen; ++i)
  {
    if (inpArr[i] > inpMax) inpMax = inpArr[i];
  }
  return inpMax;
}

function arrSum
(
  inpArr
)
{
  const arrLen = inpArr.length;
  let inpSum = inpArr[0];
  for (let i = 1; i < arrLen; ++i)
  {
    inpSum += inpArr[i];
  }
  return inpSum;
}

// - rescale

function valRescale
(
  inpVal,
  inpMin,
  inpMax,
  newMin = 0,
  newMax = 1
)
{
  return ( newMin + ((( inpVal - inpMin ) * ( newMax - newMin )) / ( inpMax - inpMin )) );
}

// - - array of objects by key

function objArrKeyRescaleMut
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMax = objArrKeyMinMax(inpArr, objKey);
  const arrLen = inpArr.length;
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i][objKey] = rescaleVal(inpArr[i][objKey], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return;
}

function objArrKeyRescale
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMax = objArrKeyMinMax(inpArr, objKey);
  const arrLen = inpArr.length;
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = rescaleVal(inpArr[i][objKey], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return newArr;
}

// - - array of values

function arrRescaleMut
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMax = arrMinMax(inpArr);
  const arrLen = inpArr.length;
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i] = valRescale(inpArr[i], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return;
}

function arrRescale
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMax = arrMinMax(inpArr);
  const arrLen = inpArr.length;
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = rescaleVal(inpArr[i], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return newArr;
}

// exports

export
{
  objArrKeyMinMax,
  objArrKeyMin,
  objArrKeyMax,
  arrMinMax,
  arrMin,
  arrMax,
  valRescale,
  objArrKeyRescaleMut,
  objArrKeyRescale,
  arrRescaleMut,
  arrRescale
}

