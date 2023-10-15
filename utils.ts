export const deterministicJson = (data: any): string => {
  const sortedKeys = Object.keys(data).sort();
  const sortedData: { [key: string]: unknown } = {};
  for (let key of sortedKeys) {
    sortedData[key] = data[key];
  }
  return JSON.stringify(sortedData);
};

export const id = (text: string): string => {
  return `s3-solve3-modal-${text}`;
};

export const convertAddressToShortString = (address: string) => {
  if (!address.includes("0x")) return address;
  return address.slice(0, 8) + "..." + address.slice(-6);
};
