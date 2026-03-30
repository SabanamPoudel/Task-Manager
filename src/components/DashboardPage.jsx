import TaskStats from './TaskStats'
import '../styles/Pages.css'

export default function DashboardPage({ stats }) {
  return (
    <div className="page dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <TaskStats stats={stats} />
    </div>
  )
}
