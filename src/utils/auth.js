export function getToken() {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const token = cookies.find(row => row.startsWith("token="));
    return token ? token.split("=")[1] : null;
  }
  return null;
}
