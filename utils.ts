export const deterministicJson = (data: any): string => {
  const sortedKeys = Object.keys(data).sort();
  const sortedData: { [key: string]: unknown } = {};
  for (let key of sortedKeys) {
    sortedData[key] = data[key];
  }
  return JSON.stringify(sortedData);
};
