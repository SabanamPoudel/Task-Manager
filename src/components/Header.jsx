import '../styles/Header.css'

export default function Header({ onThemeToggle, theme }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">✓ Task Manager</h1>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label="Toggle theme"
        >
          <span className="theme-icon">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </header>
  )
}
