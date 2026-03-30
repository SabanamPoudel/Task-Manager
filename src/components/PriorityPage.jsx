import TaskForm from './TaskForm'
import SearchBar from './SearchBar'
import { useState } from 'react'
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../utils/constants'
import '../styles/Pages.css'

export default function PriorityPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  editingTaskId,
  onEditTask
}) {
  const [searchQuery, setSearchQuery] = useState('')

  const priorities = ['high', 'medium', 'low']

  const renderPriorityGroup = (priority) => {
    let groupTasks = tasks.filter(t => t.priority === priority)

    if (searchQuery.trim()) {
      groupTasks = groupTasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (groupTasks.length === 0) return null

    // Incomplete first
    groupTasks.sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })

    return (
      <div key={priority} className="priority-group">
        <div className="priority-header" style={{ borderColor: PRIORITY_COLORS[priority] }}>
          <span className="priority-dot" style={{ backgroundColor: PRIORITY_COLORS[priority] }} />
          <h2 className="priority-title">{PRIORITY_LABELS[priority]} Priority</h2>
          <span className="priority-count">{groupTasks.length}</span>
        </div>
        <div className="priority-tasks">
          {groupTasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
              />
              <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
              </div>
              <div className="task-actions">
                <button
                  className="task-btn edit"
                  onClick={() => onEditTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="task-btn delete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="page priority-page">
      <div className="page-header">
        <h1>🔴 By Priority</h1>
        <p className="page-subtitle">Tasks organized by priority level.</p>
      </div>

      <TaskForm onAddTask={onAddTask} />
      {tasks.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} />}

      <div className="priority-container">
        {priorities.map(priority => renderPriorityGroup(priority))}
      </div>

      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p>No tasks yet. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}
