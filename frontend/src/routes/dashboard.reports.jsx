import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Download, FileText, Eye } from "lucide-react";
import { getMyReports } from "@/services/reportService";
import { GridSkeleton, ErrorState, EmptyState } from "@/components/common/Loaders";

export const Route = createFileRoute("/dashboard/reports")({ component: Reports });

function Reports() {
  const { data: reports = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["my-reports"], queryFn: getMyReports,
  });

  return (
    <>
      <h2 className="font-display text-2xl font-bold">My reports</h2>
      <p className="text-sm text-muted-foreground">View and download your test reports. Only you can access these.</p>

      <div className="mt-6">
        {isLoading ? <GridSkeleton count={3} />
          : isError ? <ErrorState message={error?.message} onRetry={refetch} />
          : reports.length === 0 ? <EmptyState title="No reports yet" subtitle="Reports will appear here once your samples are processed." />
          : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((r, i) =>
                <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-2xl bg-card border border-border shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl gradient-primary grid place-items-center text-white shadow-soft"><FileText className="size-5" /></div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{r.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{r.orderId || r.id}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">Uploaded on {r.uploaded || "—"}</div>
                  <div className="mt-4 flex gap-2">
                    <a href={r.fileUrl} target="_blank" rel="noreferrer"
                      className={`flex-1 h-9 rounded-full bg-muted text-sm font-medium inline-flex items-center justify-center gap-1.5 ${!r.fileUrl ? "opacity-50 pointer-events-none" : ""}`}>
                      <Eye className="size-4" /> View
                    </a>
                    <a href={r.fileUrl} download
                      className={`flex-1 h-9 rounded-full gradient-primary text-white text-sm font-medium inline-flex items-center justify-center gap-1.5 ${!r.fileUrl ? "opacity-50 pointer-events-none" : ""}`}>
                      <Download className="size-4" /> PDF
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          )}
      </div>
    </>
  );
}
