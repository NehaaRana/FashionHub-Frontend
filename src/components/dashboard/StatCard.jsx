const StatCard = ({ label, value, delta, trend = "up", icon: Icon, delay = 0 }) => (
  <div
    className="group bg-card border border-border rounded-sm p-6 hover:border-accent/60 hover:shadow-lg transition-all animate-fade-in-up"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-start justify-between mb-5">
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </span>
      <div className="h-10 w-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <p className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-none">{value}</p>
    {delta && (
      <p
        className={`font-body text-xs mt-3 font-medium ${
          trend === "up" ? "text-emerald-600" : "text-destructive"
        }`}
      >
        {trend === "up" ? "▲" : "▼"} {delta} <span className="text-muted-foreground">vs last month</span>
      </p>
    )}
  </div>
);

export default StatCard;
