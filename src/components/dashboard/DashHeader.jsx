const DashHeader = ({ eyebrow, title, titleAccent, description }) => (
  <div className="mb-10 animate-fade-in-up">
    <span className="inline-block bg-accent/15 text-accent font-body text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded-sm font-semibold mb-3">
      {eyebrow}
    </span>
    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground">
      {title}
      {titleAccent && <span className="italic font-normal text-accent"> {titleAccent}</span>}
    </h1>
    {description && (
      <p className="font-body text-muted-foreground text-sm md:text-base mt-3 max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

export default DashHeader;
