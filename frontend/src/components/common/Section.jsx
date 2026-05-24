import { motion } from "motion/react";


export function SectionHeader({ eyebrow, title, subtitle, align = "left"

}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      className={`mb-8 sm:mb-10 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      
      {eyebrow && <span className="text-xs font-semibold tracking-widest uppercase text-primary">{eyebrow}</span>}
      <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-sm sm:text-base text-muted-foreground">{subtitle}</p>}
    </motion.div>);

}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}