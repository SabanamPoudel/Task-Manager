import '../styles/TaskStats.css'

export default function TaskStats({ stats }) {
  const { total, completed, remaining } = stats

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="task-stats">
      <div className="stat-card">
        <div className="stat-label">Total Tasks</div>
        <div className="stat-value">{total}</div>
        {total > 0 && <span className="stat-badge">{completionPercentage}% done</span>}
      </div>

      <div className="stat-card">
        <div className="stat-label">Completed</div>
        <div className="stat-value">{completed}</div>
        {total > 0 && <span className="stat-badge">Great work!</span>}
      </div>

      <div className="stat-card">
        <div className="stat-label">Remaining</div>
        <div className="stat-value">{remaining}</div>
        {remaining > 0 && <span className="stat-badge">{remaining} left</span>}
      </div>
    </div>
  )
}
