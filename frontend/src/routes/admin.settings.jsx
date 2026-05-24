import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({ component: () =>
  <div>
    <h2 className="font-display text-2xl font-bold">Settings</h2>
    <p className="text-sm text-muted-foreground">Manage workspace preferences.</p>
    <div className="mt-6 grid gap-4 max-w-2xl">
      {["Brand", "Notifications", "Billing", "Team", "Integrations"].map((t) =>
      <div key={t} className="p-5 rounded-2xl bg-card border border-border shadow-soft flex items-center justify-between">
          <div><div className="font-semibold">{t}</div><div className="text-xs text-muted-foreground">Configure {t.toLowerCase()} preferences.</div></div>
          <button className="text-xs px-3 py-1.5 rounded-full bg-muted">Edit</button>
        </div>
      )}
    </div>
  </div>
});