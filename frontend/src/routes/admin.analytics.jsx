import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({ component: () =>
  <div>
    <h2 className="font-display text-2xl font-bold">Analytics</h2>
    <p className="text-sm text-muted-foreground">Deep insights into your operations.</p>
    <div className="mt-8 p-12 rounded-3xl bg-card border border-border shadow-soft text-center">
      <BarChart3 className="size-12 mx-auto text-primary" />
      <div className="mt-3 font-semibold">Advanced analytics coming soon</div>
      <div className="text-sm text-muted-foreground mt-1">Cohort, funnel and city-wise breakdowns.</div>
    </div>
  </div>
});