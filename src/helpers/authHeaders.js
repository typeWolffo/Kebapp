function authHeaders() {
  const currentToken = localStorage.getItem("token");
  if (currentToken) {
    return { Authorization: `Bearer ${currentToken}` };
  }
  return {};
}
export default authHeaders;
