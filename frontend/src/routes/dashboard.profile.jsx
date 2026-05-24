import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/profile")({ component: Profile });

function Profile() {
  const { user } = useApp();
  if (!user) return null;
  return (
    <>
      <h2 className="font-display text-2xl font-bold">Profile</h2>
      <p className="text-sm text-muted-foreground">Manage your personal information and addresses.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center">
          <div className="relative size-28 mx-auto">
            <div className="size-28 rounded-full gradient-primary grid place-items-center text-white text-4xl font-display font-bold shadow-glow">{user.name[0]}</div>
            <button className="absolute bottom-1 right-1 size-9 rounded-full bg-white shadow-soft border border-border grid place-items-center"><Camera className="size-4" /></button>
          </div>
          <div className="mt-4 font-semibold">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
          <div className="mt-4 text-xs px-3 py-1 inline-block rounded-full bg-primary-soft text-primary font-medium">{user.role.toUpperCase()}</div>
        </div>

        <form onSubmit={(e) => {e.preventDefault();toast.success("Profile updated");}} className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-soft space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Full name" defaultValue={user.name} />
            <F label="Email" defaultValue={user.email} type="email" />
            <F label="Phone" defaultValue="98765 43210" />
            <F label="Date of birth" type="date" />
            <F label="Address" defaultValue="221B Baker Street" className="sm:col-span-2" />
          </div>
          <div className="pt-2 flex gap-2">
            <button className="h-11 px-5 rounded-full gradient-primary text-white text-sm font-semibold inline-flex items-center gap-2"><Save className="size-4" /> Save changes</button>
            <button type="button" className="h-11 px-5 rounded-full bg-muted text-sm font-medium">Change password</button>
          </div>
        </form>
      </div>
    </>);

}
function F({ label, className = "", ...rest }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-xs font-medium text-muted-foreground mb-1.5">{label}</div>
      <input {...rest} className="w-full h-11 px-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </label>);

}