import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getMyOrders } from "@/services/orderService";
import { statusFlow } from "@/lib/data";
import { GridSkeleton, ErrorState, EmptyState } from "@/components/common/Loaders";

export const Route = createFileRoute("/dashboard/orders")({ component: Orders });

function Orders() {
  const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["my-orders"], queryFn: getMyOrders,
  });

  return (
    <>
      <h2 className="font-display text-2xl font-bold">My bookings</h2>
      <p className="text-sm text-muted-foreground">All your past and upcoming tests.</p>

      <div className="mt-6">
        {isLoading ? <GridSkeleton count={3} />
          : isError ? <ErrorState message={error?.message} onRetry={refetch} />
          : orders.length === 0 ? <EmptyState title="No bookings yet" subtitle="Your bookings will appear here." action={<Link to="/tests" className="inline-flex items-center px-5 h-10 rounded-full gradient-primary text-white text-sm font-medium">Browse tests</Link>} />
          : (
            <div className="space-y-3">
              {orders.map((o, i) => {
                const stepIndex = Math.max(0, statusFlow.findIndex((s) => s.key === o.status));
                const progress = (stepIndex + 1) / statusFlow.length * 100;
                const itemsLabel = o.items?.map((it) => it.title || it.name).filter(Boolean).join(", ") || "Booking";
                return (
                  <motion.div key={o.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="p-5 rounded-2xl bg-card border border-border shadow-soft">
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{o.id}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-soft text-primary font-medium">{statusFlow[stepIndex]?.label}</span>
                        </div>
                        <div className="mt-1 font-semibold">{itemsLabel}</div>
                        <div className="text-xs text-muted-foreground mt-1">{o.slot || (o.createdAt && new Date(o.createdAt).toLocaleString())}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹{o.total}</div>
                        <Link to="/tracking/$id" params={{ id: o.id }} className="mt-2 inline-block text-xs px-3 py-1.5 rounded-full bg-foreground text-background">Track</Link>
                      </div>
                    </div>
                    <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full gradient-primary" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
      </div>
    </>
  );
}
