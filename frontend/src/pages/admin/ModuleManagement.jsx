import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const emptyModule = {
  name: '',
  slug: '',
  description: '',
  isEnabled: true,
  sortOrder: 0,
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ModuleManagement() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState(emptyModule);
  const [loading, setLoading] = useState(true);

  async function loadModules() {
    const { data } = await api.get('/admin/modules');
    setModules(data);
    setLoading(false);
  }

  useEffect(() => {
    loadModules();
  }, []);

  async function submitModule(event) {
    event.preventDefault();
    await api.post('/admin/modules', form);
    setForm(emptyModule);
    await loadModules();
  }

  async function toggleModule(module) {
    await api.patch(`/admin/modules/${module.id}`, {
      name: module.name,
      slug: module.slug,
      description: module.description,
      isEnabled: !module.isEnabled,
      sortOrder: module.sortOrder,
    });
    await loadModules();
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Admin</p>
        <h1 className="text-3xl font-bold">Module Management</h1>
        <p className="mt-2 text-slate-600">Kelola nama modul, slug, urutan, dan status aktif modul aplikasi.</p>
      </div>

      <form className="card grid gap-4 md:grid-cols-2" onSubmit={submitModule}>
        <input
          className="input"
          placeholder="Nama Modul"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value, slug: slugify(event.target.value) })}
        />
        <input
          className="input"
          placeholder="Slug Modul"
          value={form.slug}
          onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })}
        />
        <input
          className="input md:col-span-2"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
        />
        <input
          className="input"
          min="0"
          type="number"
          placeholder="Urutan"
          value={form.sortOrder}
          onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isEnabled}
            onChange={(event) => setForm({ ...form, isEnabled: event.target.checked })}
          />
          Aktif
        </label>
        <button className="btn md:col-span-2">Simpan Modul</button>
      </form>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="py-2">Nama Modul</th>
              <th>Slug</th>
              <th>Urutan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="py-4" colSpan="5">Memuat data...</td></tr>
            ) : modules.map((module) => (
              <tr className="border-b last:border-0" key={module.id}>
                <td className="py-3 font-semibold">{module.name}</td>
                <td>{module.slug}</td>
                <td>{module.sortOrder}</td>
                <td>{module.isEnabled ? 'Aktif' : 'Nonaktif'}</td>
                <td><button className="text-blue-600" onClick={() => toggleModule(module)}>Toggle</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
