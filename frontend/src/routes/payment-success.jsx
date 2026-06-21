import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, FileText, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/common/Section";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/payment-success")({ component: PaymentSuccess });

function PaymentSuccess() {
  const [bookingId, setBookingId] = useState("LBX-XXXXX");

  // Client pe hi generate karo — SSR mismatch avoid
  useEffect(() => {
    setBookingId(`LBX-${Math.floor(10000 + Math.random() * 89999)}`);
  }, []);

  return (
    <Container className="py-20">
      <div className="max-w-xl mx-auto text-center">
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="size-24 mx-auto rounded-full gradient-primary grid place-items-center shadow-glow">
          <Check className="size-12 text-white" strokeWidth={3} />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-6 font-display text-3xl sm:text-4xl font-bold">Booking confirmed!</motion.h1>
        <p className="mt-3 text-muted-foreground">Your sample collection has been scheduled. We've sent a confirmation to your email.</p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl bg-card border border-border shadow-soft text-left">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Booking ID</div>
              <div className="font-semibold mt-0.5">{bookingId}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <div className="font-semibold mt-0.5 text-success">Confirmed</div>
            </div>
            <div>
              <div className="text-muted-foreground">Slot</div>
              <div className="font-semibold mt-0.5">Tomorrow • 8–10 AM</div>
            </div>
            <div>
              <div className="text-muted-foreground">Technician</div>
              <div className="font-semibold mt-0.5">Assigning…</div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/tracking/$id" params={{ id: bookingId }}
            className="px-5 h-11 rounded-full gradient-primary text-white text-sm font-semibold inline-flex items-center gap-2">
            <FileText className="size-4" /> Track booking
          </Link>
          <Link to="/dashboard"
            className="px-5 h-11 rounded-full bg-white border border-border text-sm font-semibold inline-flex items-center gap-2">
            <LayoutDashboard className="size-4" /> Go to dashboard
          </Link>
        </div>
      </div>
    </Container>
  );
}