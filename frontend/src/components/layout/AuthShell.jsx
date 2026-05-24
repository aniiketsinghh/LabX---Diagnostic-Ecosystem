import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { motion } from "motion/react";


export function AuthShell({ title, subtitle, children, footer

}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 gradient-cream">
      <div className="hidden lg:flex relative overflow-hidden gradient-primary text-white p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-white/15 grid place-items-center"><Activity className="size-5" /></div>
          <span className="font-display text-lg font-bold">LabX.</span>
        </Link>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">Diagnostics<br />that feel premium.</h2>
          <p className="mt-4 text-white/85">Trusted by 1.2M+ patients across 120 cities. NABL-certified labs, fast digital reports.</p>
          <div className="mt-8 flex gap-6">
            <Stat k="4.9★" v="Avg rating" />
            <Stat k="6 hrs" v="Avg report" />
            <Stat k="120+" v="Cities" />
          </div>
        </motion.div>
        <div className="relative text-xs text-white/70">© 2026 LabX Diagnostics</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center text-white"><Activity className="size-5" /></div>
            <span className="font-display text-lg font-bold">LabX.</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>
        </motion.div>
      </div>
    </div>);

}
function Stat({ k, v }) {
  return <div><div className="text-2xl font-display font-bold">{k}</div><div className="text-xs text-white/80">{v}</div></div>;
}