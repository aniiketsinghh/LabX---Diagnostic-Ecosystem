import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/common/Section";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold">Get in touch</h1>
      <p className="mt-2 text-muted-foreground">We typically respond within 2 hours.</p>
      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-6">
        <form onSubmit={(e) => {e.preventDefault();toast.success("Message sent");}} className="p-6 rounded-3xl bg-card border border-border shadow-soft space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><input required className={inp} /></Field>
            <Field label="Email"><input required type="email" className={inp} /></Field>
            <Field label="Phone"><input className={inp} /></Field>
            <Field label="Subject"><input className={inp} /></Field>
          </div>
          <Field label="Message"><textarea rows={5} required className={inp + " resize-none"} /></Field>
          <button className="h-12 px-6 rounded-full gradient-primary text-white font-semibold shadow-soft hover:shadow-glow">Send message</button>
        </form>
        <aside className="space-y-3">
          <Info icon={Mail} label="Email" value="care@labx.in" />
          <Info icon={Phone} label="Phone" value="+91 80000 12345" />
          <Info icon={MapPin} label="HQ" value="WeWork, Andheri W, Mumbai" />
        </aside>
      </div>
    </Container>);

}
const inp = "w-full h-11 px-3 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
function Field({ label, children }) {
  return <label className="block"><div className="text-xs font-medium text-muted-foreground mb-1.5">{label}</div>{children}</label>;
}
function Info({ icon: I, label, value }) {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border shadow-soft flex items-center gap-3">
      <div className="size-10 rounded-xl bg-primary-soft text-primary grid place-items-center"><I className="size-5" /></div>
      <div><div className="text-xs text-muted-foreground">{label}</div><div className="font-semibold">{value}</div></div>
    </div>);

}