import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  {
    to: '/chat',
    label: 'Chat',
    description: 'Query the RAG pipeline and inspect sources.',
  },
  {
    to: '/evaluation',
    label: 'Evaluation',
    description: 'Launch benchmark runs and track pipeline quality.',
  },
  {
    to: '/ingestion',
    label: 'Ingestion',
    description: 'Submit new datasets and documents for indexing.',
  },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell__inner">
        <aside className="sidebar">
          <div className="brand-mark">RAG</div>
          <h1 className="brand-title">Enterprise RAG Assistant</h1>
          <p className="brand-copy">
            Production-oriented operator console for retrieval, evaluation, and
            ingestion flows.
          </p>

          <nav className="nav-list" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link--active' : 'nav-link'
                }
                to={item.to}
              >
                <strong>{item.label}</strong>
                <div className="field-help">{item.description}</div>
              </NavLink>
            ))}
          </nav>

          <div className="meta-list">
            <span>Frontend: Vite + React + TypeScript</span>
            <span>Routing: React Router</span>
            <span>API base: VITE_API_BASE_URL or /api</span>
          </div>
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
