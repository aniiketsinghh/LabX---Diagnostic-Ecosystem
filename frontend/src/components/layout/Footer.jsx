import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path.startsWith("/dashboard") || path.startsWith("/admin") || path.startsWith("/technician")) return null;

  return (
    <footer className="mt-24 border-t border-border bg-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
              <Activity className="size-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold">LabX<span className="text-primary">.</span></span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Premium diagnostic care at home. NABL-certified labs, expert technicians, reports in hours.</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Twitter, Facebook, Linkedin].map((I, i) =>
            <a key={i} href="#" className="size-9 grid place-items-center rounded-full bg-white border border-border hover:bg-primary hover:text-white transition">
                <I className="size-4" />
              </a>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
            <li><a href="#" className="hover:text-foreground">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Care</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tests" className="hover:text-foreground">All Tests</Link></li>
            <li><a href="#" className="hover:text-foreground">Full Body Checkup</a></li>
            <li><a href="#" className="hover:text-foreground">Diabetes Care</a></li>
            <li><a href="#" className="hover:text-foreground">Heart Care</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Stay updated</h4>
          <p className="text-sm text-muted-foreground mb-3">Health tips and offers, straight to your inbox.</p>
          <form className="flex gap-2">
            <input type="email" placeholder="you@email.com" className="flex-1 h-10 px-3 rounded-full bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
            <button className="h-10 px-4 rounded-full gradient-primary text-white text-sm font-medium">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© 2026 LabX Diagnostics. All rights reserved.</span>
          <span>Made with care in India</span>
        </div>
      </div>
    </footer>);

}