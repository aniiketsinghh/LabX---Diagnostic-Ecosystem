import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Container } from "@/components/common/Section";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal } = useApp();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const apply = () => {
    if (coupon.trim().toUpperCase() === "HEALTH20") {setDiscount(Math.round(cartSubtotal * 0.2));toast.success("20% off applied");} else
    {setDiscount(0);toast.error("Invalid coupon");}
  };

  const tax = Math.round((cartSubtotal - discount) * 0.05);
  const total = cartSubtotal - discount + tax;

  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl font-bold">Your cart</h1>
      <p className="text-sm text-muted-foreground mt-1">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>

      {cart.length === 0 ?
      <div className="mt-12 text-center p-12 rounded-3xl bg-card border border-border">
          <div className="size-16 mx-auto rounded-full bg-primary-soft grid place-items-center text-primary mb-4"><ShoppingBag className="size-7" /></div>
          <div className="text-lg font-semibold">Your cart is empty</div>
          <div className="text-sm text-muted-foreground mt-1">Add some tests to get started.</div>
          <Link to="/tests" className="mt-5 inline-flex px-6 h-11 items-center rounded-full gradient-primary text-white text-sm font-medium">Browse tests</Link>
        </div> :

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-3">
            {cart.map((i) =>
          <motion.div key={i.test.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-soft flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center">
                <div className="size-12 sm:size-14 rounded-xl gradient-primary grid place-items-center text-white text-xl font-bold flex-shrink-0">{i.test.title[0]}</div>
                <div className="flex-1 min-w-0 basis-[calc(100%-4rem)] sm:basis-auto">
                  <div className="font-semibold truncate">{i.test.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{i.test.category} · Report in {i.test.reportIn}</div>
                  <div className="text-sm font-semibold mt-1 text-primary">₹{i.test.price}</div>
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-full p-1 ml-auto sm:ml-0">
                  <button onClick={() => updateQty(i.test.id, i.qty - 1)} className="size-7 rounded-full bg-white grid place-items-center"><Minus className="size-3.5" /></button>
                  <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                  <button onClick={() => updateQty(i.test.id, i.qty + 1)} className="size-7 rounded-full bg-white grid place-items-center"><Plus className="size-3.5" /></button>
                </div>
                <button onClick={() => {removeFromCart(i.test.id);toast("Removed");}} className="size-9 rounded-full bg-muted hover:bg-destructive/10 hover:text-destructive grid place-items-center">
                  <Trash2 className="size-4" />
                </button>
              </motion.div>
          )}
          </div>

          <aside className="self-start lg:sticky lg:top-24 p-6 rounded-3xl bg-card border border-border shadow-card">
            <div className="font-semibold mb-4">Order summary</div>
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={`₹${cartSubtotal}`} />
              {discount > 0 && <Row label="Discount" value={`-₹${discount}`} className="text-success" />}
              <Row label="Taxes (5%)" value={`₹${tax}`} />
              <div className="h-px bg-border my-3" />
              <Row label="Total" value={`₹${total}`} bold />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 relative">
                <Tag className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Try HEALTH20"
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm" />
              </div>
              <button onClick={apply} className="px-4 rounded-lg bg-foreground text-background text-sm font-medium">Apply</button>
            </div>
            <Link to="/checkout" className="mt-5 w-full h-12 rounded-full gradient-primary text-white font-semibold inline-flex items-center justify-center gap-2 shadow-soft hover:shadow-glow transition">
              Checkout <ArrowRight className="size-4" />
            </Link>
          </aside>
        </div>
      }
    </Container>);

}

function Row({ label, value, bold, className = "" }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-base" : ""} ${className}`}>
      <span className="text-muted-foreground">{label}</span><span>{value}</span>
    </div>);

}