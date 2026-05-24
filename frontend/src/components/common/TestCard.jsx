import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, Star, Plus, Check } from "lucide-react";
import { toast } from "sonner";

import { useApp } from "@/context/AppContext";

export function TestCard({ t, i = 0 }) {
  const { addToCart, cart } = useApp();
  const inCart = cart.some((c) => c.test.id === t.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
      whileHover={{ y: -6 }}
      className="group relative bg-card rounded-2xl border border-border p-5 shadow-soft hover:shadow-card transition-all overflow-hidden">
      
      <div className="absolute -top-12 -right-12 size-32 rounded-full gradient-primary opacity-10 group-hover:opacity-20 transition" />
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-primary-soft text-primary">{t.category}</span>
        {t.popular && <span className="text-[10px] font-bold uppercase tracking-wide text-accent">Popular</span>}
      </div>
      <Link to="/tests/$id" params={{ id: t.id }} className="block">
        <h3 className="font-semibold text-base leading-snug pr-4">{t.title}</h3>
      </Link>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {t.reportIn}</span>
        <span className="inline-flex items-center gap-1"><Star className="size-3.5 text-amber-500 fill-amber-500" /> {t.rating} <span className="opacity-60">({t.reviews})</span></span>
        {t.fasting && <span className="text-amber-600 font-medium">Fasting</span>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold text-foreground">₹{t.price}</div>
          <div className="text-xs text-muted-foreground line-through">₹{t.mrp}</div>
        </div>
        <button
          onClick={() => {addToCart(t);toast.success(`${t.title} added`);}}
          disabled={inCart}
          className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full gradient-primary text-white text-sm font-medium shadow-soft hover:shadow-glow disabled:opacity-70 transition">
          
          {inCart ? <><Check className="size-4" /> Added</> : <><Plus className="size-4" /> Add</>}
        </button>
      </div>
    </motion.article>);

}