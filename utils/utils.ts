export const extract = (data: any, field: string) => {
  const result: any = {};
  for (const res of data) {
    const isEmpty = ('' + res[field]).trim().length == 0;
    const key = isEmpty ? "_EMPTY_" : res[field];
    if (result[key] == undefined) {
      result[key] = 1;
    } else {
      const n = result[key];
      // result[res[field]] = n + 1;
      result[key] = n + 1;
    }
  }

  return result;
}