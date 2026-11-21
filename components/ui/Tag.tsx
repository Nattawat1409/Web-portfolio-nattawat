export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </li>
  );
}

export function TagList({ tags, label }: { tags: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </ul>
  );
}
