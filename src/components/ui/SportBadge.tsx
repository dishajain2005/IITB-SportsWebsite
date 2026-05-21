export function SportBadge({ text }: { text: string }) {
  return (
    <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
      <div className="h-px w-8 bg-accent/60" />
      <span className="font-mono-custom text-[9px] text-white uppercase tracking-[0.3em] font-black drop-shadow-md">
        {text}
      </span>
    </div>
  );
}
