import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

const users = [
{ id: "U-1001", name: "Aarav Sharma", email: "aarav@labx.in", phone: "98765 43210", bookings: 12, status: "Active" },
{ id: "U-1002", name: "Diya Patel", email: "diya@labx.in", phone: "98765 12340", bookings: 8, status: "Active" },
{ id: "U-1003", name: "Rohan Mehta", email: "rohan@labx.in", phone: "98765 09812", bookings: 3, status: "Disabled" },
{ id: "U-1004", name: "Sara Khan", email: "sara@labx.in", phone: "98765 67890", bookings: 18, status: "Active" },
{ id: "U-1005", name: "Vihaan Verma", email: "vihaan@labx.in", phone: "98765 11223", bookings: 5, status: "Active" }];


function AdminUsers() {
  const [q, setQ] = useState("");
  const list = users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <h2 className="font-display text-2xl font-bold">Users</h2>
      <p className="text-sm text-muted-foreground">Search and manage user accounts.</p>

      <div className="mt-6 p-3 rounded-2xl bg-card border border-border shadow-soft">
        <div className="relative mb-3">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-4 py-3">User</th><th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Bookings</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) =>
              <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full gradient-primary grid place-items-center text-white text-sm font-bold">{u.name[0]}</div>
                      <div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.phone}</td>
                  <td className="px-4 py-3 font-semibold">{u.bookings}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${u.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3"><button className="text-xs px-3 py-1.5 rounded-full bg-muted">View</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>);

}