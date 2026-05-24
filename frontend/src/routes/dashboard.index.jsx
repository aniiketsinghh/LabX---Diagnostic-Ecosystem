import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CalendarCheck, ClipboardList, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { getMyOrders } from "@/services/orderService";
import { getMyReports } from "@/services/reportService";
import { statusFlow } from "@/lib/data";
import { Spinner } from "@/components/common/Loaders";

export const Route = createFileRoute("/dashboard/")({ component: Overview });

function Overview() {
  const { data: orders = [], isLoading: lo } = useQuery({ queryKey: ["my-orders"], queryFn: getMyOrders });
  const { data: reports = [], isLoading: lr } = useQuery({ queryKey: ["my-reports"], queryFn: getMyReports });

  const completed = orders.filter((o) => o.status === "completed").length;
  const pending = orders.filter((o) => !["completed", "uploaded"].includes(o.status)).length;
  const upcoming = orders.filter((o) => ["pending", "accepted", "assigned"].includes(o.status)).length;

  const stats = [
    { k: "Total bookings", v: orders.length, icon: ClipboardList, tone: "from-rose-100 to-rose-50" },
    { k: "Completed tests", v: completed, icon: CalendarCheck, tone: "from-emerald-100 to-emerald-50" },
    { k: "Reports", v: reports.length, icon: FileText, tone: "from-amber-100 to-amber-50" },
    { k: "Upcoming bookings", v: upcoming || pending, icon: TrendingUp, tone: "from-sky-100 to-sky-50" },
  ];

  return (
    <>
      <div>
        <h2 className="font-display text-2xl font-bold">Welcome back 👋</h2>
        <p className="text-sm text-muted-foreground">Here's your health snapshot.</p>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) =>
          <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${s.tone} border border-border shadow-soft`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.k}</span>
              <s.icon className="size-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-display font-bold">{lo || lr ? <Spinner /> : s.v}</div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">Recent bookings</div>
            <Link to="/dashboard/orders" className="text-xs text-primary inline-flex items-center gap-1">View all <ArrowRight className="size-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {orders.length === 0 && !lo && <div className="text-sm text-muted-foreground">No bookings yet.</div>}
            {orders.slice(0, 3).map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{o.items?.[0]?.title || "Booking"}</div>
                  <div className="text-xs text-muted-foreground">{o.id}</div>
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-primary-soft text-primary font-medium">
                  {statusFlow.find((s) => s.key === o.status)?.label || o.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">Latest reports</div>
            <Link to="/dashboard/reports" className="text-xs text-primary inline-flex items-center gap-1">View all <ArrowRight className="size-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {reports.length === 0 && !lr && <div className="text-sm text-muted-foreground">No reports yet.</div>}
            {reports.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <div className="size-10 rounded-lg bg-primary-soft text-primary grid place-items-center"><FileText className="size-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.uploaded}</div>
                </div>
                {r.fileUrl && <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-foreground text-background">Open</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
