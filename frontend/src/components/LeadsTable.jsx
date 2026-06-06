import { updateLead } from '../api/leads';
import toast from 'react-hot-toast';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export default function LeadsTable({ leads, sortBy, order, onSort, onEdit, onDelete, onRefresh }) {
  const handleStatusChange = async (id, status) => {
    try {
      await updateLead(id, { status });
      toast.success('Status updated');
      onRefresh();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const Arrow = ({ col }) => {
    if (sortBy !== col) return <span style={{ opacity: 0.2, marginLeft: 4 }}>↕</span>;
    return <span style={{ marginLeft: 4, color: '#6c63ff' }}>{order === 'asc' ? '↑' : '↓'}</span>;
  };

  if (leads.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div style={{ fontSize: 32 }}>◎</div>
          <p>No leads found. Add your first lead to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => onSort('name')}>Name <Arrow col="name" /></th>
              <th onClick={() => onSort('email')}>Email <Arrow col="email" /></th>
              <th>Phone</th>
              <th onClick={() => onSort('company')}>Company <Arrow col="company" /></th>
              <th onClick={() => onSort('status')}>Status <Arrow col="status" /></th>
              <th onClick={() => onSort('createdAt')}>Created <Arrow col="createdAt" /></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="td-name">{lead.name}</td>
                <td className="td-email">{lead.email}</td>
                <td className="td-phone">{lead.phone}</td>
                <td className="td-company">{lead.company}</td>
                <td>
                  <select
                    className="status-select"
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="td-date">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td>
                  <button className="btn-edit" onClick={() => onEdit(lead)}>Edit</button>
                  <button className="btn-danger" onClick={() => onDelete(lead._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
