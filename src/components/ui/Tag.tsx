export default function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-accent hover:text-accent">
      {children}
    </span>
  );
}
