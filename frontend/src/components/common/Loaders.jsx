export function CardSkeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-muted h-48 ${className}`} />;
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function Spinner({ className = "" }) {
  return (
    <div className={`inline-block size-5 border-2 border-primary border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

export function EmptyState({ title = "Nothing here yet", subtitle, action }) {
  return (
    <div className="p-12 rounded-2xl bg-card border border-border text-center">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20 text-center">
      <div className="font-semibold text-destructive">Something went wrong</div>
      <div className="text-sm text-muted-foreground mt-1">{message || "Please try again."}</div>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 h-10 px-5 rounded-full gradient-primary text-white text-sm font-medium">
          Retry
        </button>
      )}
    </div>
  );
}
