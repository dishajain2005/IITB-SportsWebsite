'use client';

type FilterPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  ariaLabel?: string;
};

export function FilterPill({ label, active, onClick, ariaLabel }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel || `Filter by ${label}`}
      className={`font-mono-custom text-[10px] uppercase tracking-[0.2em] font-black px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
        active
          ? 'bg-accent text-white shadow-md'
          : 'bg-white border border-[#111111]/10 hover:border-accent/40'
      }`}
    >
      {label}
    </button>
  );
}
