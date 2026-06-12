import { Search, Plus, Filter, Download } from "lucide-react";
import { Button } from "../../components/ui/Button"


const AdminToolbar = ({
  searchPlaceholder = "Search...",
  search,
  onSearch,
  onAdd,
  addLabel = "Add New",
  showFilter = true,
  showExport = true,
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full bg-card border border-border rounded-sm pl-10 pr-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
      />
    </div>
    {/* {showFilter && (
      <Button variant="outline" size="sm" className="font-body text-xs uppercase tracking-[0.15em]">
        <Filter className="h-3.5 w-3.5" /> Filter
      </Button>
    )}
    {showExport && (
      <Button variant="outline" size="sm" className="font-body text-xs uppercase tracking-[0.15em]">
        <Download className="h-3.5 w-3.5" /> Export
      </Button>
    )} */}
    {onAdd && (
      <Button onClick={onAdd} variant="gold" size="sm">
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </Button>
    )}
  </div>
);

export default AdminToolbar;
