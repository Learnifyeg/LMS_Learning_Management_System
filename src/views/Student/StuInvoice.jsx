import React, { useEffect, useState } from "react";
import axios from "axios";

const mockInvoices = [
  { id: "INV-2025-001", date: "2025-07-01", amount: 199.99, status: "Paid", type: "Payout" },
  { id: "INV-2025-002", date: "2025-06-12", amount: 49.0, status: "Unpaid", type: "Purchase" },
  { id: "INV-2025-003", date: "2025-05-22", amount: 29.99, status: "Refunded", type: "Purchase" },
  { id: "INV-2025-004", date: "2025-05-01", amount: 129.5, status: "Paid", type: "Payout" },
  { id: "INV-2025-005", date: "2025-04-18", amount: 9.99, status: "Paid", type: "Purchase" },
];

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("/api/invoices")
      .then((res) => {
        if (!mounted) return;
        const data = res.data || res.data?.invoices || mockInvoices;
        setInvoices(Array.isArray(data) ? data : mockInvoices);
      })
      .catch((err) => {
        console.warn("Failed to fetch invoices, using mock", err?.message);
        if (!mounted) return;
        setInvoices(mockInvoices);
        setError(err?.message || "Network error");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = invoices
    .filter((inv) => (filterStatus === "all" ? true : inv.status.toLowerCase() === filterStatus))
    .filter((inv) => (search ? inv.id.toLowerCase().includes(search.toLowerCase()) : true));

  const totalAmount = filtered.reduce((s, i) => s + Number(i.amount || 0), 0);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  function downloadInvoice(inv) {
    const blob = new Blob([`Invoice ${inv.id}\nAmount: $${inv.amount}`], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${inv.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="custom-container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Invoices</h2>
            <div className="text-sm text-[var(--color-text-secondary)]">View and download your invoices and payout receipts.</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-[var(--color-text-secondary)]">Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span></div>
            <button className="btn btn-primary">Request new invoice</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4">
            <div className="text-sm text-[var(--color-text-secondary)]">Total invoices</div>
            <div className="text-xl font-semibold">{invoices.length}</div>
          </div>

          <div className="card p-4">
            <div className="text-sm text-[var(--color-text-secondary)]">Paid</div>
            <div className="text-xl font-semibold">{invoices.filter(i => i.status === 'Paid').length}</div>
          </div>

          <div className="card p-4">
            <div className="text-sm text-[var(--color-text-secondary)]">Unpaid</div>
            <div className="text-xl font-semibold">{invoices.filter(i => i.status === 'Unpaid').length}</div>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-[var(--color-text-secondary)]">Filter</label>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="border rounded px-2 py-1">
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input placeholder="Search by invoice id" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="border rounded px-3 py-2" />
              <button onClick={() => { setSearch(""); setFilterStatus("all"); }} className="btn btn-hover border text-[var(--color-text-primary)] hover:text-white">Clear</button>
            </div>
          </div>
        </div>

        <div className="card p-0 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[var(--surface)]">
              <tr>
                <th className="text-left px-4 py-3">Invoice ID</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-right px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center">Loading invoices...</td></tr>
              ) : pageItems.length ? (
                pageItems.map((inv) => (
                  <tr key={inv.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{inv.id}</td>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)]">{inv.date}</td>
                    <td className="px-4 py-3">{inv.type}</td>
                    <td className="px-4 py-3 text-right font-semibold">${Number(inv.amount).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : inv.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-sm btn btn-hover border text-[var(--color-text-primary)] hover:text-white" onClick={() => alert(JSON.stringify(inv, null, 2))}>View</button>
                        <button className="text-sm btn btn-hover border text-[var(--color-text-primary)] hover:text-white" onClick={() => downloadInvoice(inv)}>Download</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-6 text-center text-[var(--color-text-secondary)]">No invoices found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-[var(--color-text-secondary)]">Showing {pageItems.length} of {filtered.length} invoices</div>

          <div className="flex items-center gap-2">
            <button className="btn btn-hover border px-3 py-1 text-[var(--color-text-primary)] hover:text-white" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
            <div className="px-3 py-1 border rounded">{page} / {pageCount}</div>
            <button className="btn btn-hover border px-3 py-1 text-[var(--color-text-primary)] hover:text-white" disabled={page === pageCount} onClick={() => setPage(p => Math.min(pageCount, p + 1))}>Next</button>
          </div>
        </div>

        {error && (
          <div className="mt-6 prose card">Failed to fetch invoices: {error}</div>
        )}
      </div>
    </div>
  );
}