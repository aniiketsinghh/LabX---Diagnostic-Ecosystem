import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, X, MapPin, Clock, Phone, ClipboardList } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export const Route = createFileRoute("/technician")({ component: TechPage });






const seed = [
{ id: "LBX-10241", patient: "Aarav Sharma", address: "Andheri W, Mumbai · 400053", slot: "Tomorrow · 8–10 AM", tests: ["Full Body Checkup"], phone: "98765 43210", status: "pending" },
{ id: "LBX-10238", patient: "Diya Patel", address: "Bandra E, Mumbai · 400051", slot: "Today · 4–6 PM", tests: ["Thyroid Profile", "Vitamin D"], phone: "98765 12340", status: "accepted" },
{ id: "LBX-10229", patient: "Rohan Mehta", address: "Powai, Mumbai · 400076", slot: "Today · 6–8 PM", tests: ["CBC"], phone: "98765 09812", status: "pending" }];


function TechPage() {
  const { user, logout } = useApp();
  const nav = useNavigate();
  const [jobs, setJobs] = useState(seed);

  useEffect(() => {
    if (!user) nav({ to: "/login" });else
    if (user.role !== "technician") nav({ to: "/login" });
  }, [user, nav]);

  if (!user) return null;

  const update = (id, status) => {
    setJobs((p) => p.map((j) => j.id === id ? { ...j, status } : j));
    toast.success("Updated");
  };

  return (
    <div className="min-h-screen bg-cream-deep">
      <header className="h-16 sticky top-0 z-30 bg-white border-b border-border flex items-center px-4 sm:px-6 gap-3">
        <div className="size-9 rounded-xl gradient-primary text-white grid place-items-center"><ClipboardList className="size-5" /></div>
        <div>
          <div className="font-display font-bold leading-none">Technician</div>
          <div className="text-xs text-muted-foreground">{user.name}</div>
        </div>
        <button onClick={() => {logout();nav({ to: "/login" });}} className="ml-auto text-sm px-4 h-10 rounded-full bg-muted">Logout</button>
      </header>

      <main className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
          { k: "Today", v: jobs.filter((j) => j.status !== "collected").length },
          { k: "Pending", v: jobs.filter((j) => j.status === "pending").length },
          { k: "Collected", v: jobs.filter((j) => j.status === "collected").length }].
          map((s) =>
          <div key={s.k} className="p-4 rounded-2xl bg-card border border-border shadow-soft">
              <div className="text-xs text-muted-foreground">{s.k}</div>
              <div className="text-2xl font-display font-bold mt-1">{s.v}</div>
            </div>
          )}
        </div>

        <h2 className="mt-8 font-display text-xl font-bold mb-3">Assigned bookings</h2>
        <div className="space-y-3">
          {jobs.map((j, i) =>
          <motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{j.id}</span>
                    <Status status={j.status} />
                  </div>
                  <div className="mt-1 font-semibold">{j.patient}</div>
                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    <div className="flex items-start gap-2"><MapPin className="size-4 mt-0.5" /> {j.address}</div>
                    <div className="flex items-center gap-2"><Clock className="size-4" /> {j.slot}</div>
                    <div className="flex items-center gap-2"><Phone className="size-4" /> {j.phone}</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {j.tests.map((t) => <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-primary-soft text-primary">{t}</span>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  {j.status === "pending" &&
                <>
                      <button onClick={() => update(j.id, "accepted")} className="h-10 px-4 rounded-full gradient-primary text-white text-sm font-semibold inline-flex items-center gap-1.5"><Check className="size-4" /> Accept</button>
                      <button onClick={() => {setJobs((p) => p.filter((x) => x.id !== j.id));toast("Rejected");}} className="h-10 px-4 rounded-full bg-muted text-sm font-medium inline-flex items-center gap-1.5"><X className="size-4" /> Reject</button>
                    </>
                }
                  {j.status === "accepted" &&
                <button onClick={() => update(j.id, "collected")} className="h-10 px-4 rounded-full gradient-primary text-white text-sm font-semibold">Mark collected</button>
                }
                  {j.status === "collected" && <span className="h-10 px-4 grid place-items-center rounded-full bg-success/15 text-success text-sm font-semibold">Done</span>}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>);

}
function Status({ status }) {
  const map = { pending: "bg-amber-100 text-amber-700", accepted: "bg-sky-100 text-sky-700", collected: "bg-emerald-100 text-emerald-700" };
  const label = { pending: "Pending", accepted: "Accepted", collected: "Collected" }[status];
  return <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${map[status]}`}>{label}</span>;
}