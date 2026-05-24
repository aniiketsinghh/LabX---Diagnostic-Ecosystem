import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AuthShell } from "@/components/layout/AuthShell";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/register")({ component: RegisterPage });

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone"),
  password: z.string().min(6),
});

function RegisterPage() {
  const { register: signup } = useApp();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const user = await signup(data);
      toast.success("Account created");
      nav({ to: user?.role === "admin" ? "/admin" : "/dashboard" });
    } catch (e) {
      toast.error(e.message || "Registration failed");
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Start booking premium diagnostics in under a minute."
      footer={<>Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Full name" error={errors.name?.message}><input {...register("name")} className={input} /></Field>
        <Field label="Email" error={errors.email?.message}><input {...register("email")} className={input} /></Field>
        <Field label="Phone" error={errors.phone?.message}><input {...register("phone")} className={input} /></Field>
        <Field label="Password" error={errors.password?.message}><input type="password" {...register("password")} className={input} /></Field>
        <button disabled={isSubmitting} className="w-full h-12 rounded-xl gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60">
          {isSubmitting ? "Creating…" : "Create account"}
        </button>
        <p className="text-[11px] text-muted-foreground text-center">By creating an account you agree to our Terms & Privacy.</p>
      </form>
    </AuthShell>
  );
}
const input = "w-full h-11 px-3 rounded-xl bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm";
function Field({ label, error, children }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-muted-foreground mb-1.5">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </label>
  );
}
