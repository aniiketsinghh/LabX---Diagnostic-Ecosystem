import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Container } from "@/components/common/Section";
import { useApp } from "@/context/AppContext";
import { Calendar, MapPin, User2 } from "lucide-react";
import { toast } from "sonner";
import { createOrder, createRazorpayOrder, verifyPayment } from "@/services/orderService";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

const schema = z.object({
  fullName: z.string().min(2, "Required"),
  age: z.number().int().min(1).max(120),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().regex(/^\d{10}$/, "10-digit phone"),
  email: z.string().email(),
  address: z.string().min(8, "Full address"),
  pincode: z.string().regex(/^\d{6}$/, "6-digit pincode"),
  instructions: z.string().max(300).optional(),
});

const slots = [
  "Tomorrow • 6–8 AM",
  "Tomorrow • 8–10 AM",
  "Tomorrow • 4–6 PM",
  "Day after • 6–8 AM",
  "Day after • 8–10 AM",
];

async function sendEmails({ patient, cart, total, slot, orderId }) {
  const hasEmailJS =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;

  if (!hasEmailJS) {
    console.log("EmailJS not configured — skipping emails");
    return;
  }

  const testNames = cart.map((i) => `${i.test.title} x${i.qty}`).join(", ");
  const commonParams = {
    order_id: orderId,
    test_names: testNames,
    total: `₹${total}`,
    slot,
    patient_name: patient.fullName,
    patient_email: patient.email,
    patient_phone: patient.phone,
  };

  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER,
    { ...commonParams, to_email: patient.email, to_name: patient.fullName },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );

  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN,
    {
      ...commonParams,
      to_email: import.meta.env.VITE_ADMIN_EMAIL,
      to_name: "Admin",
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}

function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, user, authLoading } = useApp();
  const nav = useNavigate();
  const [slot, setSlot] = useState(slots[0]);
  const [paying, setPaying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!authLoading && !user) nav({ to: "/login" });
  }, [authLoading, user, nav]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const tax = Math.round(cartSubtotal * 0.05);
  const total = cartSubtotal + tax;

  const hasRazorpay =
    import.meta.env.VITE_RAZORPAY_KEY_ID &&
    import.meta.env.VITE_RAZORPAY_KEY_ID !== "rzp_test_xxxxxx";

  const onSubmit = async (data) => {
    if (cart.length === 0) { toast.error("Your cart is empty"); return; }
    setPaying(true);

    try {
      if (hasRazorpay) {
        // Real Razorpay flow
        const rzpData = await createRazorpayOrder({
          tests: cart.map((c) => c.test.id),
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: rzpData.amount * 100,
          currency: "INR",
          name: "LabX",
          description: "Diagnostic Test Booking",
          order_id: rzpData.razorpayOrderId,
          prefill: { name: data.fullName, email: data.email, contact: data.phone },
          theme: { color: "#C1121F" },
          handler: async (response) => {
            try {
              const order = await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                tests: cart.map((c) => c.test.id),
                bookingDate: new Date().toISOString(),
                bookingSlot: slot,
                address: `${data.address}, ${data.pincode}`,
                patient: {
                  fullName: data.fullName,
                  age: data.age,
                  gender: data.gender,
                  phone: data.phone,
                  email: data.email,
                },
              });
              await sendEmails({
                patient: data,
                cart,
                total,
                slot,
                orderId: order.id || order._id,
              }).catch(() => {});
              clearCart();
              toast.success("Booking confirmed!");
              window.location.href = "/payment-success";
            } catch (e) {
              toast.error(e.message || "Payment verification failed");
              setPaying(false);
            }
          },
          modal: {
            ondismiss: () => {
              setPaying(false);
              toast.error("Payment cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        // Mock flow — no Razorpay keys
        toast.info("Demo mode — payment skipped");

        const order = await createOrder({
          tests: cart.map((c) => c.test.id),
          bookingSlot: slot,
          bookingDate: new Date().toISOString(),
          address: `${data.address}, ${data.pincode}`,
          patient: {
            fullName: data.fullName,
            age: data.age,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
          },
        });

        await sendEmails({
          patient: data,
          cart,
          total,
          slot,
          orderId: order?.id || "DEMO-" + Date.now(),
        }).catch(() => {});

        clearCart();
        toast.success("Booking confirmed!");
        window.location.href = "/payment-success";
      }
    } catch (e) {
      toast.error(e.message || "Could not create booking");
      setPaying(false);
    }
  };

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:mt-8 grid lg:grid-cols-[1fr_380px] gap-5 sm:gap-6">
        <div className="space-y-5">
          <Card title="Patient details" icon={<User2 className="size-4" />}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full name" error={errors.fullName?.message}>
                <input {...register("fullName")} className={input} />
              </Field>
              <Field label="Age" error={errors.age?.message}>
                <input type="number" {...register("age", { valueAsNumber: true })} className={input} />
              </Field>
              <Field label="Gender" error={errors.gender?.message}>
                <select {...register("gender")} className={input}>
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register("phone")} className={input} />
              </Field>
              <Field label="Email" error={errors.email?.message} className="sm:col-span-2">
                <input {...register("email")} className={input} />
              </Field>
            </div>
          </Card>

          <Card title="Collection address" icon={<MapPin className="size-4" />}>
            <Field label="Address" error={errors.address?.message}>
              <textarea {...register("address")} rows={3} className={input + " resize-none"} />
            </Field>
            <Field label="Pincode" error={errors.pincode?.message}>
              <input {...register("pincode")} className={input + " max-w-[200px]"} />
            </Field>
          </Card>

          <Card title="Pick a slot" icon={<Calendar className="size-4" />}>
            <div className="grid sm:grid-cols-2 gap-2">
              {slots.map((s) => (
                <button type="button" key={s} onClick={() => setSlot(s)}
                  className={`p-3 rounded-xl text-sm text-left border transition ${slot === s ? "border-primary bg-primary-soft text-primary font-semibold" : "border-border bg-white hover:border-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Special instructions">
            <textarea
              {...register("instructions")}
              rows={3}
              placeholder="e.g. ring the doorbell twice"
              className={input + " resize-none"}
            />
          </Card>
        </div>

        <aside className="self-start lg:sticky lg:top-24 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-card">
          <div className="font-semibold mb-3">Booking summary</div>
          <div className="space-y-2 max-h-44 overflow-auto pr-1">
            {cart.length === 0 && (
              <div className="text-sm text-muted-foreground">Cart is empty.</div>
            )}
            {cart.map((i) => (
              <div key={i.test.id} className="flex justify-between text-sm">
                <span className="truncate pr-2">{i.test.title} × {i.qty}</span>
                <span className="font-medium">₹{i.test.price * i.qty}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-border my-4" />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Slot: <span className="font-medium text-foreground">{slot}</span>
          </div>
          {!hasRazorpay && (
            <div className="mt-3 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              Demo mode — payment gateway not configured
            </div>
          )}
          <button
            disabled={isSubmitting || paying || cart.length === 0}
            className="mt-5 w-full h-12 rounded-full gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60">
            {paying
              ? "Opening payment…"
              : isSubmitting
              ? "Processing…"
              : hasRazorpay
              ? `Pay ₹${total}`
              : `Confirm booking · ₹${total}`}
          </button>
        </aside>
      </form>
    </Container>
  );
}

const input = "w-full h-10 px-3 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-xs font-medium mb-1.5 text-muted-foreground">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </label>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-soft">
      <div className="font-semibold mb-4 flex items-center gap-2">{icon}{title}</div>
      {children}
    </div>
  );
}