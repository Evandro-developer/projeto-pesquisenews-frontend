export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.pesquisenews.com.br"
    : "http://localhost:3001";

const getHeaders = () => ({
  "Content-Type": "application/json; charset=UTF-8",
});

export const getFetchOptions = (method, body = null) => ({
  method: method,
  headers: getHeaders(),
  credentials: "include",
  ...(body && { body: JSON.stringify(body) }),
});
