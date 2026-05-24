import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, ClipboardList, FileText, User } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const Route = createFileRoute("/dashboard")({ component: DashboardLayout });

const items = [
{ to: "/dashboard", label: "Overview", icon: LayoutDashboard },
{ to: "/dashboard/orders", label: "My Bookings", icon: ClipboardList },
{ to: "/dashboard/reports", label: "Reports", icon: FileText },
{ to: "/dashboard/profile", label: "Profile", icon: User }];


function DashboardLayout() {
  return <DashboardShell items={items} title="Dashboard" requireRole="user" />;
}