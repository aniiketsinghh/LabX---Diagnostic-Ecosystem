import api from "./api";

const normalize = (o) => ({
  ...o,
  id: o?._id || o?.id,
  items: o?.tests || [],
  status: o?.orderStatus || "Pending",
  total: o?.totalAmount ?? 0,
  createdAt: o?.createdAt || o?.date,
});

export async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return normalize(data?.order || data);
}

export async function getMyOrders() {
  const { data } = await api.get("/orders/my");
  const arr = Array.isArray(data) ? data : data?.orders || [];
  return arr.map(normalize);
}

export async function getAllOrders() {
  const { data } = await api.get("/orders");
  const arr = Array.isArray(data) ? data : data?.orders || [];
  return arr.map(normalize);
}

export async function updateOrderStatus(id, status) {
  const { data } = await api.patch(`/orders/${id}`, { status });
  return normalize(data?.order || data);
}
export async function createRazorpayOrder(payload) {
  const { data } = await api.post("/orders/razorpay-order", payload);
  return data?.data;
}

export async function verifyPayment(payload) {
  const { data } = await api.post("/orders/verify-payment", payload);
  return normalize(data?.order || data?.data?.order || data);
}
