export const extract = (data: any, field: string) => {
  const result: any = {};
  for (const res of data) {
    const key = res[field] || "_EMPTY_";
    if (result[key] == undefined) {
      result[key] = 1;
    } else {
      const n = result[key];
      result[res[field]] = n + 1;
    }
  }

  return result;
}