import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ShieldCheck, Home, Clock3, Headphones, ArrowRight, Sparkles, Activity,
  TestTube2, Truck, FileCheck2, Star, Quote, PlayCircle, Stethoscope } from
"lucide-react";
import { categories } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { getTests } from "@/services/testService";
import { Container, SectionHeader } from "@/components/common/Section";
import { TestCard } from "@/components/common/TestCard";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <>
      <Hero />
      <Trust />
      <Categories />
      <PopularTests />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>);

}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-cream">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <Container className="relative pt-12 pb-16 sm:pt-24 sm:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 h-8 rounded-full glass text-xs font-medium">
            <Sparkles className="size-3.5 text-primary" /> NABL Certified • 12,000+ tests delivered this week
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            
            Book lab tests
            <br />
            <span className="text-gradient">from your home</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
            Fast · Trusted · Affordable. Free home sample collection, digital reports in hours, and 24/7 medical support.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3">
            <Link to="/tests" className="inline-flex items-center gap-2 px-6 h-12 rounded-full gradient-primary text-white text-sm font-semibold shadow-glow hover:scale-[1.02] transition">
              Explore Tests <ArrowRight className="size-4" />
            </Link>
            <Link to="/tests/$id" params={{ id: "full-body" }} className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white border border-border text-sm font-semibold hover:bg-muted transition">
              <PlayCircle className="size-4" /> Full Body Checkup
            </Link>
          </motion.div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-8 text-sm">
            {[
            { k: "1.2M+", v: "Happy patients" },
            { k: "4.9★", v: "Average rating" },
            { k: "120+", v: "Cities served" }].
            map((s) =>
            <div key={s.k}>
                <div className="text-xl sm:text-2xl font-bold font-display">{s.k}</div>
                <div className="text-muted-foreground text-xs">{s.v}</div>
              </div>
            )}
          </div>
        </div>

        {/* 3D-feeling visual */}
        <div className="lg:col-span-5 relative h-[340px] sm:h-[420px] lg:h-[460px] w-full max-w-md mx-auto lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
            style={{ perspective: 1200 }}>
            
            <motion.div
              animate={{ rotateY: [-8, 8, -8], rotateX: [4, -4, 4] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 rounded-[2.5rem] gradient-primary shadow-glow"
              style={{ transformStyle: "preserve-3d" }} />
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="absolute left-4 top-10 w-56 p-4 rounded-2xl glass shadow-card animate-float">
            
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 grid place-items-center"><Activity className="size-5 text-primary" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Heart Profile</div>
                <div className="text-sm font-semibold">Lipid + ECG screen</div>
              </div>
            </div>
            <div className="mt-3 text-xs flex items-center gap-1 text-success font-medium"><FileCheck2 className="size-3.5" /> Report ready</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="absolute right-2 top-32 w-60 p-4 rounded-2xl bg-white shadow-card animate-float"
            style={{ animationDelay: "1.2s" }}>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Live</span>
              <span className="text-[10px] text-muted-foreground">8:32 AM</span>
            </div>
            <div className="mt-2 text-sm font-semibold">Technician on the way</div>
            <div className="mt-1 text-xs text-muted-foreground">Rakesh K. • arriving in 12 min</div>
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 2, delay: 1 }} className="h-full gradient-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
            className="absolute right-10 bottom-6 size-28 rounded-3xl bg-white shadow-card grid place-items-center animate-float"
            style={{ animationDelay: "0.6s" }}>
            
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-gradient">4.9★</div>
              <div className="text-[10px] text-muted-foreground mt-1">120k reviews</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>);

}

function Trust() {
  const items = [
  { icon: ShieldCheck, t: "NABL Certified Labs", d: "Pan-India network of accredited labs." },
  { icon: Home, t: "Home Collection", d: "Free pickup at your doorstep." },
  { icon: Clock3, t: "Fast Reports", d: "Digital reports in as little as 6 hours." },
  { icon: Headphones, t: "24/7 Support", d: "Doctors and experts always on call." }];

  return (
    <Container className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) =>
        <motion.div key={it.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.07 }}
        className="p-5 rounded-2xl bg-white border border-border shadow-soft hover:shadow-card transition">
            <div className="size-11 rounded-xl bg-primary-soft text-primary grid place-items-center mb-3">
              <it.icon className="size-5" />
            </div>
            <div className="font-semibold">{it.t}</div>
            <div className="text-xs text-muted-foreground mt-1">{it.d}</div>
          </motion.div>
        )}
      </div>
    </Container>);

}

function Categories() {
  return (
    <section>
      <Container>
        <SectionHeader eyebrow="Browse" title="Tests by category" subtitle="Curated panels for every concern, with transparent pricing." />
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
          {categories.map((c, i) =>
          <motion.div key={c.slug} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: Math.min(i * 0.04, 0.3) }}
          className="snap-start min-w-[220px]">
              <Link to="/categories/$category" params={{ category: c.slug }}
            className={`block group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.tint} p-5 h-44 hover:shadow-card transition`}>
                <div className="size-12 rounded-xl bg-white shadow-soft grid place-items-center mb-3 group-hover:scale-110 transition">
                  <c.icon className="size-6 text-primary" />
                </div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.count} tests · from ₹{c.startingPrice}</div>
                <ArrowRight className="absolute bottom-4 right-4 size-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </Link>
            </motion.div>
          )}
        </div>
      </Container>
    </section>);

}

function PopularTests() {
  const { data: tests = [] } = useQuery({ queryKey: ["tests"], queryFn: () => getTests() });
  const popular = tests.filter((t) => t.popular).concat(tests.filter((t) => !t.popular)).slice(0, 8);
  return (
    <section className="py-20">
      <Container>
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="Most booked" title="Popular tests this week" subtitle="Loved by patients across 120+ cities." />
          <Link to="/tests" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">View all <ArrowRight className="size-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popular.map((t, i) => <TestCard key={t.id} t={t} i={i} />)}
        </div>
      </Container>
    </section>);

}

function HowItWorks() {
  const steps = [
  { icon: TestTube2, t: "Book a test", d: "Pick from 500+ tests with transparent pricing." },
  { icon: Truck, t: "Home collection", d: "Our technician collects your sample, on time." },
  { icon: FileCheck2, t: "Get reports", d: "NABL-certified digital reports in hours." }];

  return (
    <section className="py-20 bg-white/60 border-y border-border">
      <Container>
        <SectionHeader eyebrow="How it works" title="Three steps to better health" align="center" />
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) =>
          <motion.div key={s.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="relative p-8 rounded-3xl bg-card border border-border shadow-soft text-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 size-10 rounded-full gradient-primary text-white grid place-items-center font-bold shadow-glow">
                {i + 1}
              </div>
              <s.icon className="size-10 mx-auto text-primary mt-2" />
              <div className="mt-4 font-semibold text-lg">{s.t}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.d}</div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>);

}

function Testimonials() {
  const items = [
  { n: "Ananya P.", r: "Reports were ready in 6 hours. Super smooth!", c: "Bengaluru" },
  { n: "Rohan M.", r: "Technician was on time and very professional.", c: "Mumbai" },
  { n: "Sara K.", r: "The cleanest healthcare app I've used.", c: "Delhi" }];

  return (
    <Container className="py-20">
      <SectionHeader eyebrow="Loved by patients" title="What people say" align="center" />
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((it, i) =>
        <motion.div key={it.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
        className="p-6 rounded-2xl bg-card border border-border shadow-soft">
            <Quote className="size-6 text-primary" />
            <p className="mt-3 text-sm">{it.r}</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-sm">{it.n}</div>
                <div className="text-muted-foreground">{it.c}</div>
              </div>
              <div className="flex">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-3.5 text-amber-500 fill-amber-500" />)}</div>
            </div>
          </motion.div>
        )}
      </div>
    </Container>);

}

function CTA() {
  return (
    <Container className="pb-24">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 sm:p-14 text-white shadow-glow">
        <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold">Your health, on autopilot.</h3>
            <p className="mt-3 text-white/85">Join 1.2M patients getting reliable diagnostics from home.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/register" className="px-6 h-12 inline-flex items-center rounded-full bg-white text-primary font-semibold hover:scale-[1.02] transition">Create free account</Link>
            <Link to="/tests" className="px-6 h-12 inline-flex items-center rounded-full bg-white/15 border border-white/30 font-semibold hover:bg-white/25 transition">
              <Stethoscope className="size-4 mr-2" /> Book a test
            </Link>
          </div>
        </div>
      </div>
    </Container>);

}