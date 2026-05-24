import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { IndianRupee, ClipboardList, Users, AlertCircle } from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend } from
"recharts";

export const Route = createFileRoute("/admin/")({ component: AdminOverview });

const rev = Array.from({ length: 14 }, (_, i) => ({ d: `D${i + 1}`, v: 80 + Math.round(Math.sin(i / 2) * 30 + Math.random() * 40) }));
const pie = [
{ name: "Blood", value: 45, color: "#C1121F" },
{ name: "Diabetes", value: 25, color: "#E63946" },
{ name: "Thyroid", value: 15, color: "#F77F00" },
{ name: "Others", value: 15, color: "#FCBF49" }];


function AdminOverview() {
  const stats = [
  { k: "Revenue (30d)", v: "₹4.82L", icon: IndianRupee, change: "+12.4%", tone: "from-rose-100 to-rose-50" },
  { k: "Bookings", v: "2,148", icon: ClipboardList, change: "+8.1%", tone: "from-emerald-100 to-emerald-50" },
  { k: "Users", v: "12,340", icon: Users, change: "+3.2%", tone: "from-sky-100 to-sky-50" },
  { k: "Pending orders", v: "24", icon: AlertCircle, change: "-2", tone: "from-amber-100 to-amber-50" }];

  return (
    <>
      <h2 className="font-display text-2xl font-bold">Admin overview</h2>
      <p className="text-sm text-muted-foreground">Performance and operational health.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) =>
        <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
        className={`p-5 rounded-2xl bg-gradient-to-br ${s.tone} border border-border shadow-soft`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.k}</span>
              <s.icon className="size-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-display font-bold">{s.v}</div>
            <div className="text-xs text-success mt-1">{s.change} vs prev</div>
          </motion.div>
        )}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold">Revenue (14 days)</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={rev}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C1121F" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#C1121F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#0000000A" />
                <XAxis dataKey="d" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#C1121F" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
          <div className="font-semibold mb-4">Bookings by category</div>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value">
                  {pie.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>);

}