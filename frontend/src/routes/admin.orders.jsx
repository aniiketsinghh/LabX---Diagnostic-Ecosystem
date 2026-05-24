import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrders, updateOrderStatus } from "@/services/orderService";
import { statusFlow } from "@/lib/data";
import { toast } from "sonner";
import { GridSkeleton, ErrorState, EmptyState } from "@/components/common/Loaders";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["all-orders"], queryFn: getAllOrders,
  });

  const updateM = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => { toast.success("Status updated"); qc.invalidateQueries({ queryKey: ["all-orders"] }); },
    onError: (e) => toast.error(e.message),
  });

  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <h2 className="font-display text-2xl font-bold">Orders</h2>
      <p className="text-sm text-muted-foreground">Track and update booking status.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>All ({orders.length})</Chip>
        {statusFlow.map((s) =>
          <Chip key={s.key} active={filter === s.key} onClick={() => setFilter(s.key)}>{s.label}</Chip>
        )}
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-card border border-border shadow-soft overflow-x-auto">
        {isLoading ? <GridSkeleton count={3} />
          : isError ? <ErrorState message={error?.message} onRetry={refetch} />
          : list.length === 0 ? <EmptyState title="No orders" />
          : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-4 py-3">Order</th><th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Slot</th><th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) =>
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-4 py-3">{o.patient?.fullName || o.patient || o.user?.name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.slot || (o.createdAt && new Date(o.createdAt).toLocaleDateString())}</td>
                    <td className="px-4 py-3 font-semibold">₹{o.total}</td>
                    <td className="px-4 py-3">
                      <select value={o.status} onChange={(e) => updateM.mutate({ id: o.id, status: e.target.value })}
                        className="h-9 px-2 rounded-lg bg-muted border border-border text-xs">
                        {statusFlow.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
      </div>
    </>
  );
}
function Chip({ active, children, ...p }) {
  return <button {...p} className={`text-xs px-3 h-8 rounded-full border ${active ? "gradient-primary text-white border-transparent" : "bg-white border-border hover:border-primary"}`}>{children}</button>;
}
