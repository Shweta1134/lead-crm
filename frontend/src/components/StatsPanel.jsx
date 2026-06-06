import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getStats } from '../api/leads';

const STATUS_CONFIG = {
  New:       { color: '#38bdf8', cls: 'blue' },
  Contacted: { color: '#ff8c42', cls: 'orange' },
  Qualified: { color: '#22d3a5', cls: 'green' },
  Converted: { color: '#8b85ff', cls: 'accent' },
  Lost:      { color: '#ff4d6d', cls: 'red' },
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1c1c26',
      border: '1px solid #2a2a3d',
      borderRadius: 8,
      padding: '8px 14px',
      fontSize: 13,
      color: '#e8e8f0',
    }}>
      <strong>{payload[0].payload.name}</strong>: {payload[0].value}
    </div>
  );
};

export default function StatsPanel({ onFilterByStatus }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const chartData = Object.entries(stats.byStatus).map(([name, count]) => ({ name, count }));

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="label">Total Leads</div>
          <div className="value">{stats.total}</div>
        </div>
        {Object.entries(stats.byStatus).map(([status, count]) => (
          <div
            className="stat-card stat-clickable"
            key={status}
            onClick={() => onFilterByStatus(status)}
            title={`Filter by ${status}`}
          >
            <div className="label">{status}</div>
            <div className={`value ${STATUS_CONFIG[status]?.cls || ''}`}>{count}</div>
            <div className="stat-filter-hint">click to filter</div>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="chart-card">
          <h3>Pipeline Overview</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={36}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#5a5a78', fontFamily: 'Plus Jakarta Sans' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#5a5a78' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108,99,255,0.06)' }} />
              <Bar
                dataKey="count"
                radius={[6, 6, 0, 0]}
                style={{ cursor: 'pointer' }}
                onClick={(data) => onFilterByStatus(data.name)}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_CONFIG[entry.name]?.color || '#6c63ff'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}