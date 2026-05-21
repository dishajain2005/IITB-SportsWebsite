type SectionHeadlineProps = {
  before: string;
  accent: string;
  light?: boolean;
};

export function SectionHeadline({ before, accent, light = false }: SectionHeadlineProps) {
  return (
    <h2
      className={`font-serif-display text-3xl md:text-4xl leading-tight ${
        light ? 'text-[#F5F0E8]' : 'text-[#111111]'
      }`}
    >
      {before} <span className="text-accent">{accent}</span>
    </h2>
  );
}
