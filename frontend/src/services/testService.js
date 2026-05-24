import api from "./api";

const normalize = (t) => ({
  ...t,
  id: t?.id || t?._id,
  rating: t?.rating ?? 4.7,
  reviews: t?.reviews ?? 0,
  parameters: t?.parameters || [],
  benefits: t?.benefits || [],
  reportIn: t?.reportIn || t?.reportTime || "24 hrs",
  mrp: t?.mrp ?? Math.round((t?.price || 0) * 1.6),
  categorySlug: t?.categorySlug || (t?.category || "").toLowerCase().replace(/\s+/g, "-"),
});

export async function getTests(params = {}) {
  const response = await api.get("/tests", { params });

  console.log("TEST API:", response.data);

  const arr = response?.data?.data?.tests || [];

  return arr.map(normalize);
}

export async function getTest(id) {
  const { data } = await api.get(`/tests/${id}`);
  return normalize(data?.data?.test || data);
}

export async function createTest(payload) {
  const { data } = await api.post("/tests", payload);
  return normalize(data?.data?.test || data);
}

export async function updateTest(id, payload) {
  const { data } = await api.put(`/tests/${id}`, payload);
  return normalize(data?.data?.test || data);
}

export async function deleteTest(id) {
  await api.delete(`/tests/${id}`);
  return true;
}
