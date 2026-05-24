import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Menu, X, Activity, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

const nav = [
{ to: "/", label: "Home" },
{ to: "/tests", label: "Tests" },
{ to: "/about", label: "About" },
{ to: "/contact", label: "Contact" }];


export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, cartCount } = useApp();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hideOn = path.startsWith("/dashboard") || path.startsWith("/admin") || path.startsWith("/technician");
  if (hideOn) return null;

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 h-14 sm:h-16 flex items-center gap-2 sm:gap-3">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="size-8 sm:size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
              <Activity className="size-4 sm:size-5 text-white" />
            </div>
            <span className="font-display text-base sm:text-lg font-bold tracking-tight">LabX<span className="text-primary">.</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-2 lg:ml-4">
            {nav.map((n) =>
            <Link key={n.to} to={n.to}
            className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/60 transition"
            activeProps={{ className: "px-3 py-2 text-sm rounded-lg text-foreground bg-white/70" }}>
                {n.label}
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search tests, packages, symptoms…"
                className="w-full h-10 pl-9 pr-3 rounded-full bg-white/70 border border-white/60 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <Link to="/cart" aria-label="Cart" className="relative size-10 grid place-items-center rounded-full bg-white/70 hover:bg-white transition">
              <ShoppingCart className="size-4" />
              {cartCount > 0 &&
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold size-5 grid place-items-center rounded-full">{cartCount}</span>
              }
            </Link>
            {user ?
            <div className="hidden sm:flex items-center gap-2">
                <Link to={user.role === "admin" ? "/admin" : user.role === "technician" ? "/technician" : "/dashboard"}
              className="flex items-center gap-2 px-3 h-10 rounded-full bg-white/70 hover:bg-white text-sm">
                  <UserIcon className="size-4" /> <span className="max-w-[6rem] truncate">{user.name.split(" ")[0]}</span>
                </Link>
                <button onClick={logout} className="size-10 grid place-items-center rounded-full bg-white/70 hover:bg-white" aria-label="Logout">
                  <LogOut className="size-4" />
                </button>
              </div> :

            <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-4 h-10 grid place-items-center rounded-full text-sm font-medium hover:bg-white/70">Login</Link>
                <Link to="/register" className="px-4 h-10 grid place-items-center rounded-full text-sm font-medium gradient-primary text-white shadow-soft hover:shadow-glow transition">
                  Sign up
                </Link>
              </div>
            }
            <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="md:hidden size-10 grid place-items-center rounded-full bg-white/70">
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="lg:hidden px-3 sm:px-6 pb-3">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search tests…"
              className="w-full h-10 pl-9 pr-3 rounded-full bg-white/80 border border-white/60 focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
          </div>
        </div>

        <AnimatePresence>
          {open &&
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-white/95 border-t border-border">
              <div className="px-4 py-4 space-y-1">
                {nav.map((n) =>
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block px-3 py-3 rounded-lg hover:bg-muted text-sm">
                    {n.label}
                  </Link>
              )}
                <div className="pt-2 flex gap-2">
                  {user ?
                <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-3 rounded-lg gradient-primary text-white text-sm">Dashboard</Link> :

                <>
                      <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-3 rounded-lg bg-muted text-sm">Login</Link>
                      <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-3 rounded-lg gradient-primary text-white text-sm">Sign up</Link>
                    </>
                }
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </header>);

}