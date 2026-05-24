import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { getTests, createTest, updateTest, deleteTest } from "@/services/testService";
import { GridSkeleton, ErrorState, EmptyState } from "@/components/common/Loaders";

export const Route = createFileRoute("/admin/tests")({ component: AdminTests });

function AdminTests() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: list = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tests"], queryFn: () => getTests(),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["tests"] });

  const createM = useMutation({
    mutationFn: createTest,
    onSuccess: () => { toast.success("Test created"); invalidate(); setOpen(false); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });
  const updateM = useMutation({
    mutationFn: ({ id, payload }) => updateTest(id, payload),
    onSuccess: () => { toast.success("Test updated"); invalidate(); setOpen(false); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });
  const deleteM = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => { toast.success("Deleted"); invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const filtered = list.filter((t) => (t.title || "").toLowerCase().includes(q.toLowerCase()));

  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      title: f.title.value,
      price: Number(f.price.value),
      mrp: Number(f.mrp.value),
      category: f.category.value,
      categorySlug: f.category.value.toLowerCase().replace(/\s+/g, "-"),
      description: f.description.value,
      reportIn: f.reportIn.value || "24 hrs",
    };
    if (editing) updateM.mutate({ id: editing.id, payload });
    else createM.mutate(payload);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Tests</h2>
          <p className="text-sm text-muted-foreground">Manage your diagnostic catalogue.</p>
        </div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="h-11 px-5 rounded-full gradient-primary text-white text-sm font-semibold inline-flex items-center gap-2 shadow-soft hover:shadow-glow transition">
          <Plus className="size-4" /> Add test
        </button>
      </div>

      <div className="mt-6 p-3 rounded-2xl bg-card border border-border shadow-soft">
        <div className="relative mb-3">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tests…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm" />
        </div>
        {isLoading ? <GridSkeleton count={3} />
          : isError ? <ErrorState message={error?.message} onRetry={refetch} />
          : filtered.length === 0 ? <EmptyState title="No tests" subtitle="Click 'Add test' to create one." />
          : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3">Test</th><th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th><th className="px-4 py-3">Report</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) =>
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3 font-medium">{t.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.category}</td>
                      <td className="px-4 py-3 font-semibold">₹{t.price}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.reportIn}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { setEditing(t); setOpen(true); }} className="size-8 rounded-lg bg-muted grid place-items-center hover:bg-primary hover:text-white"><Edit className="size-3.5" /></button>
                          <button onClick={() => { if (confirm("Delete this test?")) deleteM.mutate(t.id); }} className="size-8 rounded-lg bg-muted grid place-items-center hover:bg-destructive hover:text-white"><Trash2 className="size-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {open &&
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl border border-border w-full max-w-lg p-6 shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold">{editing ? "Edit test" : "Add new test"}</h3>
              <button onClick={() => setOpen(false)} className="size-8 rounded-lg bg-muted grid place-items-center"><X className="size-4" /></button>
            </div>
            <form onSubmit={onSubmit} className="space-y-3">
              <Field label="Title"><input name="title" required defaultValue={editing?.title} className={inp} placeholder="e.g. Vitamin B12" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Price"><input name="price" required type="number" defaultValue={editing?.price} className={inp} /></Field>
                <Field label="MRP"><input name="mrp" required type="number" defaultValue={editing?.mrp} className={inp} /></Field>
              </div>
              <Field label="Category"><input name="category" required defaultValue={editing?.category} className={inp} /></Field>
              <Field label="Report in"><input name="reportIn" defaultValue={editing?.reportIn} placeholder="e.g. 24 hrs" className={inp} /></Field>
              <Field label="Description"><textarea name="description" rows={3} defaultValue={editing?.description} className={inp + " resize-none"} /></Field>
              <button disabled={createM.isPending || updateM.isPending} className="w-full h-11 rounded-xl gradient-primary text-white font-semibold disabled:opacity-60">
                {createM.isPending || updateM.isPending ? "Saving…" : editing ? "Save changes" : "Create"}
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
}
const inp = "w-full h-10 px-3 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
function Field({ label, children }) {
  return <label className="block"><div className="text-xs font-medium text-muted-foreground mb-1.5">{label}</div>{children}</label>;
}
