import { NavLink, Route, Routes } from 'react-router-dom';
import { Sparkles, LayoutGrid, PackageOpen } from 'lucide-react';
import CollectionPage from './pages/CollectionPage';
import PacksPage from './pages/PacksPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-ink-950/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
            <Sparkles className="w-5 h-5 text-rarity-legendary" />
            <span>All-Stars</span>
            <span className="text-ink-300 font-normal text-sm">Trading Cards</span>
          </NavLink>
          <nav className="flex items-center gap-1 text-sm">
            <NavTab to="/" icon={<LayoutGrid className="w-4 h-4" />}>Collection</NavTab>
            <NavTab to="/packs" icon={<PackageOpen className="w-4 h-4" />}>Packs</NavTab>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<CollectionPage />} />
          <Route path="/packs" element={<PacksPage />} />
        </Routes>
      </main>
    </div>
  );
}

function NavTab({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
          isActive
            ? 'bg-white/10 text-ink-100'
            : 'text-ink-300 hover:text-ink-100 hover:bg-white/5'
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}
