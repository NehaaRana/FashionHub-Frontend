const PageHeader = ({ eyebrow, title, titleAccent, description }) => (
  <section className="bg-secondary/40 border-b border-border">
    <div className="container py-16 lg:py-24 text-center animate-fade-in-up">
      {eyebrow && (
        <span className="inline-block bg-accent/15 text-accent font-body text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-sm font-semibold mb-5">
          {eyebrow}
        </span>
      )}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="italic font-normal text-accent">{titleAccent}</span>
          </>
        )}
      </h1>
      {description && (
        <p className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  </section>
);

export default PageHeader;
