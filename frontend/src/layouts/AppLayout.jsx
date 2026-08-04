import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function AppLayout(){ const { user, logout } = useAuth(); return <div><nav className="bg-slate-900 text-white"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><Link to="/" className="text-xl font-bold">AttendanceMS</Link><div className="flex gap-4"><Link to="/admin">Admin</Link><Link to="/employee">Employee</Link>{user && <button onClick={logout}>Logout</button>}</div></div></nav><main className="mx-auto max-w-7xl p-6"><Outlet /></main></div>; }
