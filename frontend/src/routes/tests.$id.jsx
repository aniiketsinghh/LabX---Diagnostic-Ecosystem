import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Clock, Star, ShieldCheck, Check, ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { getTest, getTests } from "@/services/testService";
import { Container } from "@/components/common/Section";
import { TestCard } from "@/components/common/TestCard";
import { Spinner, ErrorState } from "@/components/common/Loaders";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/tests/$id")({ component: TestDetail });

function TestDetail() {
  const { id } = Route.useParams();
  const { addToCart } = useApp();

  const { data: t, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["test", id],
    queryFn: () => getTest(id),
  });
  const { data: all = [] } = useQuery({ queryKey: ["tests"], queryFn: () => getTests() });

  if (isLoading) return <Container className="py-24 grid place-items-center"><Spinner /></Container>;
  if (isError || !t) return <Container className="py-24"><ErrorState message={error?.message || "Test not found"} onRetry={refetch} /></Container>;

  const related = all.filter((x) => x.categorySlug === t.categorySlug && x.id !== t.id).slice(0, 4);
  const params = t.parameters?.length ? t.parameters : [];
  const benefits = t.benefits?.length ? t.benefits : ["Trusted lab partners", "Free home collection", "Fast digital reports"];

  return (
    <div className="gradient-cream">
      <Container className="py-10">
        <Link to="/tests" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All tests</Link>
        <div className="mt-6 grid lg:grid-cols-[1fr_400px] gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-soft text-primary">{t.category}</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">{t.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star className="size-4 text-amber-500 fill-amber-500" /> {t.rating} <span>({t.reviews} reviews)</span></span>
              <span className="inline-flex items-center gap-1"><Clock className="size-4" /> Report in {t.reportIn}</span>
              {t.fasting && <span className="text-amber-600 font-medium">Fasting required</span>}
              <span className="inline-flex items-center gap-1 text-success"><ShieldCheck className="size-4" /> NABL certified</span>
            </div>

            <div className="mt-8 relative rounded-3xl overflow-hidden h-64 gradient-primary shadow-glow grid place-items-center">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute size-72 rounded-full border border-white/20" />
              <div className="relative text-white text-center">
                <div className="text-5xl font-display font-bold">{params.length}+</div>
                <div className="text-sm opacity-90">parameters analyzed</div>
              </div>
            </div>

            <Section title="About this test"><p className="text-muted-foreground">{t.description}</p></Section>

            {params.length > 0 && (
              <Section title="Included parameters">
                <div className="grid sm:grid-cols-2 gap-2">
                  {params.map((p) =>
                    <div key={p} className="flex items-center gap-2 p-3 rounded-xl bg-white border border-border text-sm">
                      <Check className="size-4 text-success" /> {p}
                    </div>
                  )}
                </div>
              </Section>
            )}

            <Section title="Benefits">
              <ul className="space-y-2">
                {benefits.map((b) =>
                  <li key={b} className="flex items-start gap-2 text-sm"><Check className="size-4 text-primary mt-0.5" /> {b}</li>
                )}
              </ul>
            </Section>
          </motion.div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="p-6 rounded-3xl bg-card border border-border shadow-card">
              <div className="text-3xl font-bold">₹{t.price} <span className="text-base text-muted-foreground line-through ml-1 font-normal">₹{t.mrp}</span></div>
              <div className="text-xs text-success font-semibold mt-1">You save ₹{t.mrp - t.price} ({Math.round((t.mrp - t.price) / t.mrp * 100)}% off)</div>
              <button onClick={() => { addToCart(t); toast.success("Added to cart"); }}
                className="mt-5 w-full h-12 rounded-full gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition inline-flex items-center justify-center gap-2">
                <Plus className="size-4" /> Add to cart
              </button>
              <Link to="/checkout" className="mt-3 w-full h-12 rounded-full bg-white border border-border font-semibold inline-flex items-center justify-center hover:bg-muted transition">
                Book now
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 &&
          <div className="mt-16">
            <h3 className="font-display text-2xl font-bold mb-6">You may also like</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r, i) => <TestCard key={r.id} t={r} i={i} />)}
            </div>
          </div>
        }
      </Container>
    </div>
  );
}

function Section({ title, children }) {
  return <div className="mt-8"><h3 className="font-display text-xl font-semibold mb-3">{title}</h3>{children}</div>;
}
