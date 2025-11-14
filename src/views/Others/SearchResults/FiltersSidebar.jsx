import { useState } from "react";

export default function FiltersSidebar() {
  const [filters, setFilters] = useState({
    category: "",
    certificate: "",
    price: "",
    rating: "",
  });

  const categories = ["Programming", "Design", "Marketing", "Electronics", "General"];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="bg-surface rounded-lg shadow-md p-4 space-y-5 sticky top-4 h-fit">
      <h2 className="font-semibold text-lg mb-2 text-text-primary">Filters</h2>

      {/* Category */}
      <div>
        <label className="font-medium text-sm text-text-secondary">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="mt-1 w-full border border-input rounded px-2 py-1 bg-background text-sm"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Certificate */}
      <div>
        <label className="font-medium text-sm text-text-secondary">Certificate</label>
        <div className="flex gap-2 mt-1">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={filters.certificate === "true"}
              onChange={() =>
                setFilters({
                  ...filters,
                  certificate: filters.certificate === "true" ? "" : "true",
                })
              }
            />
            Included
          </label>
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="font-medium text-sm text-text-secondary">Price</label>
        <select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="mt-1 w-full border border-input rounded px-2 py-1 bg-background text-sm"
        >
          <option value="">All</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="font-medium text-sm text-text-secondary">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          className="mt-1 w-full border border-input rounded px-2 py-1 bg-background text-sm"
        >
          <option value="">All</option>
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r} ★ & up
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
