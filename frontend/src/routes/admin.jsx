import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, TestTube2, ClipboardList, Users, FileText, BarChart3, Settings } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const items = [
{ to: "/admin", label: "Dashboard", icon: LayoutDashboard },
{ to: "/admin/tests", label: "Tests", icon: TestTube2 },
{ to: "/admin/orders", label: "Orders", icon: ClipboardList },
{ to: "/admin/users", label: "Users", icon: Users },
{ to: "/admin/reports", label: "Reports", icon: FileText },
{ to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
{ to: "/admin/settings", label: "Settings", icon: Settings }];


function AdminLayout() {
  return <DashboardShell items={items} title="Admin Console" requireRole="admin" />;
}