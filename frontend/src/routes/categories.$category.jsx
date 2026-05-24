import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, SectionHeader } from "@/components/common/Section";
import { TestCard } from "@/components/common/TestCard";
import { GridSkeleton, EmptyState } from "@/components/common/Loaders";
import { categories } from "@/lib/data";
import { getTests } from "@/services/testService";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/categories/$category")({ component: CategoryPage });

function CategoryPage() {
  const { category } = Route.useParams();
  const c = categories.find((x) => x.slug === category);
  const { data: tests = [], isLoading } = useQuery({ queryKey: ["tests"], queryFn: () => getTests() });
  const list = tests.filter((t) => t.categorySlug === category);

  return (
    <div className="gradient-cream">
      <Container className="py-12">
        <Link to="/tests" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All tests</Link>
        <SectionHeader eyebrow="Category" title={c?.title ?? category} subtitle={`${list.length} tests available · from ₹${c?.startingPrice ?? "—"}`} />
        {isLoading ? <GridSkeleton count={3} />
          : list.length === 0 ? <EmptyState title="No tests yet in this category." />
          : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((t, i) => <TestCard key={t.id} t={t} i={i} />)}
            </div>
          )}
      </Container>
    </div>
  );
}
