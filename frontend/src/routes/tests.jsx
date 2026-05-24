import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/data";
import { getTests } from "@/services/testService";
import { Container, SectionHeader } from "@/components/common/Section";
import { TestCard } from "@/components/common/TestCard";
import { GridSkeleton, ErrorState, EmptyState } from "@/components/common/Loaders";

export const Route = createFileRoute("/tests")({ component: TestsPage });

function TestsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [max, setMax] = useState(3000);
  const [sort, setSort] = useState("popular");

  const { data: tests = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(),
  });

  const list = useMemo(() => {
    let arr = tests.filter((t) =>
      (cat === "all" || t.categorySlug === cat) &&
      (t.price ?? 0) <= max &&
      (q.trim() === "" || (t.title || "").toLowerCase().includes(q.toLowerCase()))
    );
    arr = [...arr].sort((a, b) =>
      sort === "low" ? a.price - b.price :
      sort === "high" ? b.price - a.price :
      sort === "rating" ? (b.rating || 0) - (a.rating || 0) :
      Number(!!b.popular) - Number(!!a.popular)
    );
    return arr;
  }, [q, cat, max, sort, tests]);

  return (
    <div className="gradient-cream">
      <Container className="py-12">
        <SectionHeader eyebrow="Catalogue" title="All diagnostic tests" subtitle="Search 500+ tests and book in seconds." />
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold mb-3"><SlidersHorizontal className="size-4" /> Filters</div>
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tests…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-2">Category</div>
                <div className="flex flex-wrap gap-1.5">
                  {["all", ...categories.map((c) => c.slug)].map((s) =>
                    <button key={s} onClick={() => setCat(s)}
                      className={`text-xs px-2.5 py-1.5 rounded-full border transition ${cat === s ? "gradient-primary text-white border-transparent" : "bg-white border-border hover:border-primary"}`}>
                      {s === "all" ? "All" : categories.find((c) => c.slug === s)?.title}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-2 flex justify-between"><span>Max price</span><span className="text-primary font-semibold">₹{max}</span></div>
                <input type="range" min={199} max={3000} step={50} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full accent-[--primary]" />
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-2">Sort by</div>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white border border-border text-sm">
                  <option value="popular">Most popular</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 text-sm text-muted-foreground">{isLoading ? "Loading…" : `${list.length} tests`}</div>
            {isLoading ? <GridSkeleton count={6} />
              : isError ? <ErrorState message={error?.message} onRetry={refetch} />
              : list.length === 0 ? <EmptyState title="No tests found" subtitle="Try adjusting your filters." />
              : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {list.map((t, i) => <TestCard key={t.id} t={t} i={i} />)}
                </div>
              )}
          </div>
        </div>
      </Container>
    </div>
  );
}
