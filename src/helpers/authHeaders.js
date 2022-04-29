function authHeaders() {
  const currentToken = JSON.parse(localStorage.getItem("token"));
  if (currentToken) {
    return { Authorization: `Bearer ${currentToken}` };
  }
  return {};
}
