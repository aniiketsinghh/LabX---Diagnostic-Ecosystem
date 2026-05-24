import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { uploadReport } from "@/services/reportService";

export const Route = createFileRoute("/admin/reports")({ component: AdminReports });

function AdminReports() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [last, setLast] = useState(null);

  const uploadM = useMutation({
    mutationFn: ({ file, orderId, title }) =>
      uploadReport({ file, orderId, title, onProgress: setProgress }),
    onSuccess: (r) => {
      toast.success("Report uploaded");
      setLast(r);
      setOpen(false); setFile(null); setProgress(0);
    },
    onError: (e) => { toast.error(e.message); setProgress(0); },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    if (!file) return toast.error("Choose a PDF file");
    uploadM.mutate({ file, orderId: f.orderId.value, title: f.title.value });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Reports</h2>
          <p className="text-sm text-muted-foreground">Upload patient reports as PDFs.</p>
        </div>
        <button onClick={() => setOpen(true)} className="h-11 px-5 rounded-full gradient-primary text-white text-sm font-semibold inline-flex items-center gap-2 shadow-soft hover:shadow-glow transition">
          <UploadCloud className="size-4" /> Upload report
        </button>
      </div>

      {last && (
        <div className="mt-6 p-5 rounded-2xl bg-card border border-border shadow-soft flex items-center gap-3">
          <div className="size-12 rounded-xl gradient-primary text-white grid place-items-center"><FileText className="size-5" /></div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold truncate">{last.title}</div>
            <div className="text-xs text-muted-foreground truncate">Uploaded · {last.uploaded}</div>
          </div>
          {last.fileUrl && <a href={last.fileUrl} target="_blank" rel="noreferrer" className="text-xs px-3 h-9 rounded-full bg-foreground text-background inline-flex items-center">Open</a>}
        </div>
      )}

      {open &&
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-3xl border border-border w-full max-w-md p-6 shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold">Upload report</h3>
              <button onClick={() => setOpen(false)} className="size-8 rounded-lg bg-muted grid place-items-center"><X className="size-4" /></button>
            </div>
            <form onSubmit={onSubmit} className="space-y-3">
              <Field label="Order ID"><input name="orderId" required placeholder="e.g. 65f…" className={inp} /></Field>
              <Field label="Report title"><input name="title" required className={inp} placeholder="e.g. Lipid Profile" /></Field>
              <Field label="PDF file">
                <label className="block p-6 rounded-xl bg-muted border-2 border-dashed border-border text-center cursor-pointer hover:border-primary transition">
                  <UploadCloud className="size-6 mx-auto text-primary" />
                  <div className="text-sm font-medium mt-1">{file ? file.name : "Click to upload or drag & drop"}</div>
                  <div className="text-xs text-muted-foreground">PDF up to 10 MB</div>
                  <input onChange={(e) => setFile(e.target.files?.[0] || null)} type="file" accept="application/pdf" className="hidden" />
                </label>
              </Field>
              {progress > 0 && (
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary transition-all" style={{ width: `${progress}%` }} />
                </div>
              )}
              <button disabled={uploadM.isPending} className="w-full h-11 rounded-xl gradient-primary text-white font-semibold disabled:opacity-60">
                {uploadM.isPending ? `Uploading… ${progress}%` : "Upload"}
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
