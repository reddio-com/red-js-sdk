function underline(str: string) {
  return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
}

export function parseParams(params: Record<string, any>) {
  const newParams: Record<string, any> = {};
  Object.keys(params).forEach(key => {
    if (Object.prototype.toString.call(params[key]) === '[object Object]') {
      newParams[underline(key)] = parseParams(params[key]);
    } else {
      newParams[underline(key)] = params[key];
    }
  });
  return newParams;
}
