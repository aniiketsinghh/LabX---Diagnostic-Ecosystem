import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Container, SectionHeader } from "@/components/common/Section";
import { ShieldCheck, Users, Beaker, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <>
      <section className="gradient-cream">
        <Container className="py-20 text-center">
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl sm:text-6xl font-bold tracking-tight">
            Diagnostics, <span className="text-gradient">reimagined.</span>
          </motion.h1>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">We're building the most loved diagnostic experience in India — clinical excellence with the warmth of a real care team.</p>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeader eyebrow="Mission" title="Care that meets you where you are" />
        <div className="grid md:grid-cols-4 gap-4">
          {[
          { i: ShieldCheck, t: "Clinical rigor", d: "NABL-certified labs and SOPs at every step." },
          { i: Users, t: "Real humans", d: "Doctors and care managers, always on call." },
          { i: Beaker, t: "Modern science", d: "Continuously upgraded test menu and methods." },
          { i: Heart, t: "Patient-first", d: "Every product decision starts with empathy." }].
          map((b, i) =>
          <motion.div key={b.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-soft">
              <b.i className="size-6 text-primary" />
              <div className="mt-3 font-semibold">{b.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
            </motion.div>
          )}
        </div>
      </Container>
    </>);

}