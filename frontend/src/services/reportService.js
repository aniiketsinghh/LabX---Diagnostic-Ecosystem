import api from "./api";

const normalize = (r) => ({
  ...r,
  id: r?.id || r?._id,
  title: r?.title || r?.testTitle || "Report",
  fileUrl: r?.fileUrl || r?.url || r?.report,
  uploaded: r?.uploaded || (r?.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""),
  orderId: r?.orderId || r?.order?._id || r?.order,
});

export async function uploadReport({ file, orderId, title, onProgress }) {
  const fd = new FormData();
  fd.append("report", file);
  if (orderId) fd.append("orderId", orderId);
  if (title) fd.append("title", title);
  const { data } = await api.post("/reports/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return normalize(data?.report || data);
}

export async function getMyReports() {
  const { data } = await api.get("/reports/my");
  const arr = Array.isArray(data) ? data : data?.reports || [];
  return arr.map(normalize);
}
