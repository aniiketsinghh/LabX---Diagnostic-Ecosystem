import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Activity, Bell, ChevronDown, LogOut, Menu, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export function DashboardShell({ items, title, requireRole }) {
  const { user, authLoading, logout } = useApp();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (requireRole && (!user || user.role !== requireRole)) nav({ to: "/login" });
  }, [user, authLoading, requireRole, nav]);

  if (authLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-cream-deep">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-[88%] max-w-[18rem] lg:w-72 bg-white border-r border-border transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-border shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center text-white"><Activity className="size-5" /></div>
            <span className="font-display text-lg font-bold">LabX.</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden size-9 grid place-items-center rounded-lg bg-muted"><X className="size-4" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((it) => {
            const active = path === it.to || (it.to !== "/admin" && it.to !== "/dashboard" && path.startsWith(it.to));
            return (
              <Link key={it.to} to={it.to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition ${active ? "gradient-primary text-white shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <it.icon className="size-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-3 p-3 rounded-2xl bg-muted shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full gradient-primary grid place-items-center text-white font-semibold shrink-0">
              {user.name?.[0] ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <button
              onClick={() => { logout(); nav({ to: "/login" }); }}
              className="size-9 rounded-lg bg-white grid place-items-center hover:bg-destructive hover:text-white transition shrink-0"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="h-16 sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-border flex items-center gap-2 sm:gap-3 px-3 sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden size-9 grid place-items-center rounded-lg bg-muted shrink-0" aria-label="Open menu"><Menu className="size-4" /></button>
          <div className="font-display font-semibold text-base sm:text-lg truncate">{title}</div>
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search…" className="w-full h-10 pl-9 pr-3 rounded-full bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <button className="ml-auto size-10 rounded-full bg-muted grid place-items-center relative shrink-0" aria-label="Notifications">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-full bg-muted shrink-0">
            <div className="size-7 rounded-full gradient-primary grid place-items-center text-white text-xs font-semibold">
              {user.name?.[0] ?? "A"}
            </div>
            <span className="text-sm font-medium max-w-[6rem] truncate">{user.name?.split(" ")[0]}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
        </header>
        <motion.main key={path} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </motion.main>
      </div>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}
    </div>
  );
}