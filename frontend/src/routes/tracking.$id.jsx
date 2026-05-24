import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Check, MapPin, Phone, User, Clock } from "lucide-react";
import { Container } from "@/components/common/Section";
import { statusFlow } from "@/lib/data";
import { getMyOrders } from "@/services/orderService";
import { Spinner, ErrorState } from "@/components/common/Loaders";

export const Route = createFileRoute("/tracking/$id")({ component: Tracking });

function Tracking() {
  const { id } = Route.useParams();
  const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["my-orders"], queryFn: getMyOrders,
  });
  const order = orders.find((o) => o.id === id);

  if (isLoading) return <Container className="py-24 grid place-items-center"><Spinner /></Container>;
  if (isError) return <Container className="py-24"><ErrorState message={error?.message} onRetry={refetch} /></Container>;

  const currentIndex = Math.max(0, statusFlow.findIndex((s) => s.key === (order?.status || "pending")));

  return (
    <div className="gradient-cream min-h-screen">
      <Container className="py-12">
        <div className="font-mono text-xs text-muted-foreground">Booking</div>
        <h1 className="font-display text-3xl font-bold">{id}</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time status of your booking.</p>

        <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-soft">
            <div className="font-semibold mb-6">Progress</div>
            <ol className="relative">
              {statusFlow.map((s, i) => {
                const done = i <= currentIndex;
                return (
                  <motion.li key={s.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 pb-6 last:pb-0 relative">
                    {i < statusFlow.length - 1 && <span className={`absolute left-[15px] top-8 bottom-0 w-px ${done ? "bg-primary" : "bg-border"}`} />}
                    <div className={`size-8 rounded-full grid place-items-center flex-shrink-0 z-10 ${done ? "gradient-primary text-white shadow-glow" : "bg-muted text-muted-foreground"}`}>
                      {done ? <Check className="size-4" /> : <span className="text-xs font-semibold">{i + 1}</span>}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{done ? "Completed" : "Pending"}</div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <aside className="space-y-4">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-soft text-sm space-y-3">
              <div className="font-semibold">Booking details</div>
              <div className="flex items-center gap-2 text-muted-foreground"><User className="size-4" /> {order?.patient?.fullName || order?.patient || "—"}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4" /> {order?.address || "—"}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4" /> {order?.slot || (order?.createdAt && new Date(order.createdAt).toLocaleString())}</div>
              <div className="pt-2 border-t border-border font-semibold text-foreground">Total ₹{order?.total ?? "—"}</div>
            </div>
            {order?.technician && (
              <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
                <div className="font-semibold mb-3">Technician</div>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full gradient-primary grid place-items-center text-white font-bold">{(order.technician.name || order.technician)?.[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{order.technician.name || order.technician}</div>
                  </div>
                  <button className="ml-auto size-10 rounded-full gradient-primary text-white grid place-items-center"><Phone className="size-4" /></button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
