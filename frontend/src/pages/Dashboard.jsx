import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getLeads, createLead, updateLead, deleteLead } from '../api/leads';
import LeadsTable from '../components/LeadsTable';
import LeadForm from '../components/LeadForm';
import StatsPanel from '../components/StatsPanel';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [statsKey, setStatsKey] = useState(0);
  const limit = 10;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeads({ search, status, sortBy, order, page, limit });
      setLeads(res.data.leads);
      setTotal(res.data.total);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [search, status, sortBy, order, page]);

  useEffect(() => {
    const timer = setTimeout(fetchLeads, 300);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleSort = (col) => {
    if (sortBy === col) setOrder(order === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setOrder('asc'); }
    setPage(1);
  };

  const handleFilterByStatus = (selectedStatus) => {
    if (status === selectedStatus) {
      setStatus('');
      toast('Showing all leads', { icon: '◎' });
    } else {
      setStatus(selectedStatus);
      setPage(1);
      toast(`Showing ${selectedStatus} leads`, { icon: '◎' });
    }
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSave = async (form) => {
    try {
      if (editLead) {
        const res = await updateLead(editLead._id, form);
        setLeads((prev) => prev.map((l) => l._id === editLead._id ? res.data : l));
        toast.success('Lead updated successfully');
      } else {
        const res = await createLead(form);
        setLeads((prev) => [res.data, ...prev]);
        setTotal((prev) => prev + 1);
        toast.success('Lead added successfully');
      }
      setStatsKey((k) => k + 1);
      setShowForm(false);
      setEditLead(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (lead) => { setEditLead(lead); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead? This cannot be undone.')) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      setTotal((prev) => prev - 1);
      setStatsKey((k) => k + 1);
      toast.success('Lead deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="page">
      <div className="container">
        <StatsPanel key={statsKey} onFilterByStatus={handleFilterByStatus} />

        <div className="toolbar">
          <div className="search-wrapper">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search by name, email, company..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All Status</option>
            {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {status && (
            <button className="btn-secondary" onClick={() => setStatus('')}>
              Clear Filter ×
            </button>
          )}
          <button className="btn-primary" onClick={() => { setEditLead(null); setShowForm(true); }}>
            + Add Lead
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading leads...</div>
        ) : (
          <LeadsTable
            leads={leads}
            sortBy={sortBy}
            order={order}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRefresh={fetchLeads}
          />
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <span>{(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</span>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>← Prev</button>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next →</button>
          </div>
        )}
      </div>

      {showForm && (
        <LeadForm
          lead={editLead}
          onClose={() => { setShowForm(false); setEditLead(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}