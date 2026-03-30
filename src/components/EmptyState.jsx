import '../styles/EmptyState.css'

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h2 className="empty-title">No tasks yet!</h2>
      <p className="empty-message">
        Create your first task above to get started. Stay organized and boost your productivity! 🚀
      </p>
    </div>
  )
}
