import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api/client';

const fallbackModules = [
  { name: 'Employee Management', description: 'Manage employee profiles, roles, departments, positions, and schedules.', path: '/api/admin/employees' },
  { name: 'Attendance Monitoring', description: 'Review live attendance activity and employee check-in status.', path: '/api/admin/monitor' },
  { name: 'Reports', description: 'Export attendance data as Excel or PDF reports.', path: '/api/admin/reports' },
];

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/admin/modules')
      .then((response) => setModules(response.data.modules || []))
      .catch(() => {
        setModules(fallbackModules);
        setError('Unable to load the module catalog from the API. Showing default modules.');
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return modules;

    return modules.filter((module) => `${module.name} ${module.description}`.toLowerCase().includes(normalizedQuery));
  }, [modules, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Nama Modul</p>
          <h1 className="text-3xl font-bold">Application Modules</h1>
          <p className="text-slate-600">Browse the attendance system modules available to administrators.</p>
        </div>
        <input
          className="input md:w-80"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search modules"
          value={query}
        />
      </div>

      {error && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</div>}
      {loading ? <div className="card">Loading modules...</div> : null}

      {!loading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleModules.map((module) => (
            <article className="card flex h-full flex-col gap-3" key={module.name}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold">{module.name}</h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
              </div>
              <p className="flex-1 text-slate-600">{module.description}</p>
              <code className="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-700">{module.path}</code>
            </article>
          ))}
        </div>
      )}

      {!loading && visibleModules.length === 0 && <div className="card">No modules match your search.</div>}
    </section>
  );
}
