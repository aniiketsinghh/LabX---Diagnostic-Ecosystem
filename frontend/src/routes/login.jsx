import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { AuthShell } from "@/components/layout/AuthShell";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/login")({ component: LoginPage });

const userSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

const adminSchema = z.object({
  adminPassword: z.string().min(1, "Admin password required"),
});

function LoginPage() {
  const { login, setUser } = useApp();
  const nav = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(isAdmin ? adminSchema : userSchema),
  });

  const toggleMode = () => {
    setIsAdmin((v) => !v);
    reset();
  };

  const onSubmit = async (data) => {
    if (isAdmin) {
  const envPass = import.meta.env.VITE_ADMIN_PASSWORD;
  if (!envPass || data.adminPassword !== envPass) {
    toast.error("Invalid admin password");
    return;
  }
  const adminUser = { name: "Admin", email: "admin@labx.in", role: "admin" };
  localStorage.setItem("labx_user", JSON.stringify(adminUser));
  localStorage.setItem("labx_token", import.meta.env.VITE_ADMIN_TOKEN); // <-- token save karo
  setUser(adminUser);
  toast.success("Admin access granted");
  nav({ to: "/admin" });
  return;
}

    try {
      const user = await login(data);
      toast.success("Welcome back!");
      const role = user?.role;
      nav({ to: role === "admin" ? "/admin" : role === "technician" ? "/technician" : "/dashboard" });
    } catch (e) {
      toast.error(e.message || "Login failed");
    }
  };

  return (
    <AuthShell
      title={isAdmin ? "Admin Access" : "Welcome back"}
      subtitle={isAdmin ? "Enter your admin password to continue." : "Sign in to manage your bookings and reports."}
      footer={<>No account? <Link to="/register" className="text-primary font-medium">Create one</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <button
          type="button"
          onClick={toggleMode}
          className={`w-full h-10 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition
            ${isAdmin
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-muted border-border text-muted-foreground hover:text-foreground"}`}
        >
          <ShieldCheck className="size-4" />
          {isAdmin ? "Switch to User Login" : "Login as Admin"}
        </button>

        {isAdmin ? (
          <div>
            <label className="text-xs font-medium text-muted-foreground">Admin Password</label>
            <div className="mt-1.5 relative">
              <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                {...register("adminPassword")}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
            {errors.adminPassword && <div className="text-xs text-destructive mt-1">{errors.adminPassword.message}</div>}
          </div>
        ) : (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1.5 relative">
                <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input {...register("email")} placeholder="you@email.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              {errors.email && <div className="text-xs text-destructive mt-1">{errors.email.message}</div>}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="mt-1.5 relative">
                <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="password" {...register("password")} placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm" />
              </div>
              {errors.password && <div className="text-xs text-destructive mt-1">{errors.password.message}</div>}
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-[--primary]" /> Remember me</label>
              <Link to="/forgot-password" className="text-primary font-medium">Forgot password?</Link>
            </div>
          </>
        )}

        <button disabled={isSubmitting}
          className="w-full h-12 rounded-xl gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60">
          {isSubmitting ? "Signing in…" : isAdmin ? "Access Admin Panel" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}