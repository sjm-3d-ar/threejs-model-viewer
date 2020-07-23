export const queryStringToObject = queryString => {
  if (!queryString) return {};

  const pairsString =
    queryString.charAt(0) === "?" ? queryString.slice(1) : queryString.slice(0);

  const pairs = pairsString.split("&");

  const result = {};
  pairs.forEach(pair => {
    const kv = pair.split("=");
    if (kv[0]) result[kv[0]] = decodeURIComponent(kv[1] || "");
  });

  return result;
};
