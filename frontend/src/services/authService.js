import api, { TOKEN_KEY } from "./api";

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data?.user || data;
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("labx_user");
  localStorage.removeItem("labx_cart");
}
