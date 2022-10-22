export const getFinalUrl = (partialUrl, params) => {
  const definedParams = {};

  for (const key in params) {
    if (!isNullOrUndefined(params[key])) {
      definedParams[key] = params[key];
    }
  }

  var finalUrl = partialUrl.concat('?');
  for (const key in definedParams) {
    finalUrl = finalUrl.concat(`${key}=` + `${definedParams[key]}`, '&');
  }

  return finalUrl.slice(0, -1);
};

const isNullOrUndefined = (attribute) => {
  return attribute == ('' || undefined);
};

export const isObjectNullOrUndefined = (object) => {
  for (const key in object) {
    return isNullOrUndefined(object[key]);
  }
};

export const extractProperties = (arrayOfObjects) => {
  const finalObject = {};

  for (const object of arrayOfObjects) {
    for (const key in object) {
      finalObject[key] = object[key];
    }
  }

  return finalObject;
};
