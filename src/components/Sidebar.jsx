import { useState } from 'react'
import '../styles/Sidebar.css'

export default function Sidebar({ activePage, onPageChange, stats }) {
  const [isOpen, setIsOpen] = useState(true)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'all', label: 'All Tasks' },
    { id: 'today', label: 'Today' },
    { id: 'active', label: 'Active Tasks' },
    { id: 'completed', label: 'Completed' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'priority', label: 'By Priority' }
  ]

  const handleNavClick = (pageId) => {
    onPageChange(pageId)
    // Keep sidebar open on desktop, close on mobile
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              title={item.label}
            >
              <span className="nav-label">{item.label}</span>
              {item.id === 'active' && stats?.remaining > 0 && (
                <span className="nav-badge">{stats.remaining}</span>
              )}
              {item.id === 'completed' && stats?.completed > 0 && (
                <span className="nav-badge">{stats.completed}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-stats">
            <div className="stat-item">
              <span className="stat-number">{stats?.total || 0}</span>
              <span className="stat-text">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats?.completed || 0}</span>
              <span className="stat-text">Done</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
