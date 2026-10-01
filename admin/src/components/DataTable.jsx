import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search...',
  actions,
  loading,
  emptyMessage = 'No data found',
  emptyIcon: EmptyIcon,
  pageSize = 10
}) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = searchKey
    ? data.filter((item) => {
        const value = typeof searchKey === 'function' ? searchKey(item) : item[searchKey];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    : data;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Resolve a column cell value — supports both `render`/`key` and `accessor` patterns
  const renderCell = (col, item) => {
    if (col.render) return col.render(item);
    if (typeof col.accessor === 'function') return col.accessor(item);
    if (typeof col.accessor === 'string') return item[col.accessor];
    if (col.key) return item[col.key];
    return null;
  };

  if (loading) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-12 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Search */}
      {searchKey && (
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-background/50">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted">
                    {EmptyIcon && <EmptyIcon size={32} className="opacity-40" />}
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((item, idx) => (
                <tr key={item._id || idx} className="hover:bg-background/50 transition-colors">
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-3 text-sm">
                      {renderCell(col, item)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {actions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-muted">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-border/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors
                    ${page === pageNum
                      ? 'bg-primary text-white'
                      : 'hover:bg-border/50 text-muted'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-border/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
