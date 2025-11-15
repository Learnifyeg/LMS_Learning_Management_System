export default function FiltersSidebar({ filters, setFilters }) {
  const categories = ["Programming", "Design", "Marketing", "Electronics", "General"];
  const ratings = [5, 4, 3, 2, 1];

  const clearFilters = () => {
    setFilters({
      category: "",
      certificate: "",
      price: "",
      rating: ""
    });
  };

  const hasActiveFilters = filters.category || filters.certificate || filters.price || filters.rating;

  return (
    <div className="bg-[var(--color-card)] rounded-2xl shadow-lg p-6 space-y-6 border border-[var(--color-border)] sticky top-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-2 h-6 bg-[var(--color-primary)] rounded-full"></span>
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <label className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="text-lg">📚</span>
          Category
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setFilters({ ...filters, category: "" })}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
              filters.category === ""
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                filters.category === cat
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Filter */}
      <div className="space-y-3">
        <label className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="text-lg">📜</span>
          Certificate
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFilters({ ...filters, certificate: "" })}
            className={`px-4 py-3 rounded-xl border-2 text-center transition-all duration-200 ${
              filters.certificate === ""
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilters({ ...filters, certificate: "true" })}
            className={`px-4 py-3 rounded-xl border-2 text-center transition-all duration-200 flex items-center justify-center gap-2 ${
              filters.certificate === "true"
                ? "border-green-500 bg-green-500/10 text-green-600 font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-green-500 hover:bg-green-500/5"
            }`}
          >
            {/* <span className="text-lg"></span> */}
            Included
          </button>
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <label className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="text-lg">💰</span>
          Price
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setFilters({ ...filters, price: "" })}
            className={`px-3 py-3 rounded-xl border-2 text-center transition-all duration-200 ${
              filters.price === ""
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilters({ ...filters, price: "free" })}
            className={`px-3 py-3 rounded-xl border-2 text-center transition-all duration-200 flex items-center justify-center gap-1 ${
              filters.price === "free"
                ? "border-green-500 bg-green-500/10 text-green-600 font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-green-500 hover:bg-green-500/5"
            }`}
          >
            {/* <span className="text-sm">🆓</span> */}
            Free
          </button>
          <button
            onClick={() => setFilters({ ...filters, price: "paid" })}
            className={`px-3 py-3 rounded-xl border-2 text-center transition-all duration-200 flex items-center justify-center gap-1 ${
              filters.price === "paid"
                ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/5"
            }`}
          >
            {/* <span className="text-sm">💳</span> */}
            Paid
          </button>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <label className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="text-lg">⭐</span>
          Minimum Rating
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setFilters({ ...filters, rating: "" })}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
              filters.rating === ""
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            }`}
          >
            All Ratings
          </button>
          {ratings.map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, rating: r.toString() })}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                filters.rating === r.toString()
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-600 font-semibold"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-yellow-500 hover:bg-yellow-500/5"
              }`}
            >
              <span>{r} Star{r !== 1 ? 's' : ''} & up</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < r 
                        ? filters.rating === r.toString() ? "text-yellow-600" : "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Active filters:</span>
            <span className="font-semibold text-[var(--color-primary)]">
              {[
                filters.category && "Category",
                filters.certificate && "Certificate",
                filters.price && "Price",
                filters.rating && "Rating"
              ].filter(Boolean).length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}