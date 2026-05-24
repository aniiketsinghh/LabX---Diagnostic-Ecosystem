import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { getProfile, loginUser as apiLogin, registerUser as apiRegister, logoutUser } from "@/services/authService";
import { TOKEN_KEY } from "@/services/api";

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cart, setCart] = useState([]);

  // hydrate cart
  useEffect(() => {
    try {
      const c = localStorage.getItem("labx_cart");
      if (c) setCart(JSON.parse(c));
    } catch {}
  }, []);

  // restore session via /auth/profile
  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY);
    if (!token) { setAuthLoading(false); return; }
    getProfile()
      .then((u) => {
        if (u) {
          setUser(u);
          localStorage.setItem("labx_user", JSON.stringify(u));
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("labx_user");
      })
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("labx_cart", JSON.stringify(cart));
  }, [cart]);

  const login = useCallback(async ({ email, password }) => {
    const res = await apiLogin({ email, password });
    const u = res?.user || (await getProfile());
    setUser(u);
    if (u) localStorage.setItem("labx_user", JSON.stringify(u));
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    const res = await apiRegister(payload);
    const u = res?.user || (await getProfile());
    setUser(u);
    if (u) localStorage.setItem("labx_user", JSON.stringify(u));
    return u;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    setCart([]);
  }, []);

  const addToCart = (t) =>
    setCart((p) => p.find((i) => i.test.id === t.id) ? p.map((i) => i.test.id === t.id ? { ...i, qty: i.qty + 1 } : i) : [...p, { test: t, qty: 1 }]);
  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.test.id !== id));
  const updateQty = (id, qty) =>
    setCart((p) => p.map((i) => i.test.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);

  const value = useMemo(() => ({
    user, authLoading, login, register, logout,
    cart, addToCart, removeFromCart, updateQty, clearCart,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    cartSubtotal: cart.reduce((s, i) => s + i.qty * i.test.price, 0),
  }), [user, authLoading, login, register, logout, cart]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};
