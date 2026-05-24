import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts, Link } from
"@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center gradient-cream px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gradient">404</div>
        <h2 className="mt-3 text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page took a wrong turn. Let's get you back.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center px-5 h-11 rounded-full gradient-primary text-white text-sm font-medium shadow-glow">Go home</Link>
      </div>
    </div>);

}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="min-h-screen grid place-items-center gradient-cream px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => {router.invalidate();reset();}} className="mt-6 px-5 h-11 rounded-full gradient-primary text-white text-sm font-medium">Try again</button>
      </div>
    </div>);

}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "LabX — Premium Diagnostic Lab Tests at Home" },
    { name: "description", content: "Book NABL-certified lab tests with home sample collection. Fast reports, expert care, transparent pricing." },
    { property: "og:title", content: "LabX — Lab Tests at Home" },
    { property: "og:description", content: "Premium diagnostics with home collection and fast digital reports." },
    { property: "og:type", content: "website" }],

    links: [
    { rel: "stylesheet", href: appCss },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" }]

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});

function RootShell({ children }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>);

}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
      </AppProvider>
    </QueryClientProvider>);

}