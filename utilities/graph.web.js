// functions

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

function valMeanNorm
(
  inpVal,
  inpMin,
  inpMax,
  inpMean,
  newMin = 0,
  newMax = 1
)
{
  return ( newMin + ((( inpVal - inpMean ) * ( newMax - newMin )) / ( inpMax - inpMin )) );
}

function valStandard
(
  inpVal,
  inpMean,
  inpStaDev,
  newMin = 0,
  newMax = 1
)
{
  return ( newMin + ((( inpVal - inpMean ) * ( newMax - newMin )) / inpStaDev) );
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

function arrStaDev
(
  inpArr
)
{
  const arrLen = inpArr.length;
  const arrMean = arrSum(inpArr) / arrLen;
  let staDevSum = 0;
  for (let i = 0; i < arrLen; i++)
  {
    staDevSum += ((inpArr[i] - arrMean) ** 2);
  }
  return Math.sqrt(staDevSum / arrLen);
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
    newArr[i] = valRescale(inpArr[i], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return newArr;
}

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

function arrMeanNorm
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMaxSum = arrMinMaxSum(inpArr);
  const arrLen = inpArr.length;
  const arrMean = arrMinMaxSum[2] / arrLen;
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = valMeanNorm(inpArr[i], arrMinMaxSum[0], arrMinMaxSum[1], arrMean, newMin, newMax);
  }
  return newArr;
}

function arrMeanNormMut
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMaxSum = arrMinMaxSum(inpArr);
  const arrLen = inpArr.length;
  const arrMean = arrMinMaxSum[2] / arrLen;
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i] = valMeanNorm(inpArr[i], arrMinMaxSum[0], arrMinMaxSum[1], arrMean, newMin, newMax);
  }
  return;
}

function arrStandard
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrLen = inpArr.length;
  const arrMean = arrSum(inpArr) / arrLen;
  const staDev = arrStaDev(inpArr);
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = valStandard(inpArr[i], arrMean, staDev, newMin, newMax);
  }
  return newArr;
}

function arrStandardMut
(
  inpArr,
  newMin = 0,
  newMax = 1
)
{
  const arrLen = inpArr.length;
  const arrMean = arrSum(inpArr) / arrLen;
  const staDev = arrStaDev(inpArr);
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i] = valStandard(inpArr[i], arrMean, staDev, newMin, newMax);
  }
  return;
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

function objArrKeyStaDev
(
  inpArr,
  objKey
)
{
  const arrLen = inpArr.length;
  const arrMean = objArrKeySum(inpArr, objKey) / arrLen;
  let staDevSum = 0;
  for (let i = 0; i < arrLen; i++)
  {
    staDevSum += ((inpArr[i][objKey] - arrMean) ** 2);
  }
  return Math.sqrt(staDevSum / arrLen);
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
    newArr[i] = valRescale(inpArr[i][objKey], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return newArr;
}

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
    inpArr[i][objKey] = valRescale(inpArr[i][objKey], arrMinMax[0], arrMinMax[1], newMin, newMax);
  }
  return;
}

function objArrKeyMeanNorm
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMaxSum = objArrKeyMinMaxSum(inpArr, objKey);
  const arrLen = inpArr.length;
  const arrMean = arrMinMaxSum[2] / arrLen;
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = valMeanNorm(inpArr[i][objKey], arrMinMaxSum[0], arrMinMaxSum[1], arrMean, newMin, newMax);
  }
  return newArr;
}

function objArrKeyMeanNormMut
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrMinMaxSum = objArrKeyMinMaxSum(inpArr, objKey);
  const arrLen = inpArr.length;
  const arrMean = arrMinMaxSum[2] / arrLen;
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i][objKey] = valMeanNorm(inpArr[i][objKey], arrMinMaxSum[0], arrMinMaxSum[1], arrMean, newMin, newMax);
  }
  return;
}

function objArrKeyStandard
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrLen = inpArr.length;
  const arrMean = objArrKeySum(inpArr, objKey) / arrLen;
  const staDev = objArrKeyStaDev(inpArr, objKey);
  const newArr = new Array(arrLen);
  for (let i = 0; i < arrLen; i++)
  {
    newArr[i] = valStandard(inpArr[i][objKey], arrMean, staDev, newMin, newMax);
  }
  return newArr;
}

function objArrKeyStandardMut
(
  inpArr,
  objKey,
  newMin = 0,
  newMax = 1
)
{
  const arrLen = inpArr.length;
  const arrMean = objArrKeySum(inpArr, objKey) / arrLen;
  const staDev = arrStaDev(inpArr, objKey);
  for (let i = 0; i < arrLen; i++)
  {
    inpArr[i][objKey] = valStandard(inpArr[i][objKey], arrMean, staDev, newMin, newMax);
  }
  return;
}

// exports

export
{
  valRescale,
  valMeanNorm,
  arrMin,
  arrMax,
  arrSum,
  arrMinMax,
  arrMinMaxSum,
  arrStaDev,
  arrRescale,
  arrRescaleMut,
  arrMeanNorm,
  arrMeanNormMut,
  objArrKeyMin,
  objArrKeyMax,
  objArrKeySum,
  objArrKeyMinMax,
  objArrKeyMinMaxSum,
  objArrKeyStaDev,
  objArrKeyRescale,
  objArrKeyRescaleMut,
  objArrKeyMeanNorm,
  objArrKeyMeanNormMut
}

