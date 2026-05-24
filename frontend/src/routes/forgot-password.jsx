import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Reset password" subtitle="We'll email you a secure reset link."
    footer={<>Remembered it? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}>
      {sent ?
      <div className="p-6 rounded-2xl bg-success/10 text-sm">Check your inbox for the reset link.</div> :

      <form onSubmit={(e) => {e.preventDefault();setSent(true);toast.success("Reset link sent");}} className="space-y-4">
          <label className="block">
            <div className="text-xs font-medium text-muted-foreground mb-1.5">Email</div>
            <input type="email" required placeholder="you@email.com" className="w-full h-11 px-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
          </label>
          <button className="w-full h-12 rounded-xl gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition">Send reset link</button>
        </form>
      }
    </AuthShell>);

}