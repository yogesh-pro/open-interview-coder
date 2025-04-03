export const trimmedApiKey = (key: string) => {
  if (key.length > 6) {
    return `${key.slice(0, 5)}...${key.slice(-5)}`;
  }
  return key;
};
