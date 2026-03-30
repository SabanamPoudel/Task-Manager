import { useState } from 'react'
import { isOverdue, getDueDateLabel } from '../utils/dateUtils'
import { PRIORITY_LABELS, PRIORITY_COLORS } from '../utils/constants'
import '../styles/TaskItem.css'

export default function TaskItem({
  task,
  isEditing,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onEditTask
}) {
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '')

  const overdue = isOverdue(task.dueDate) && !task.completed

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    onUpdateTask(task.id, {
      title: editTitle.trim(),
      priority: editPriority,
      dueDate: editDueDate
    })
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate || '')
    onEditTask(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit()
    if (e.key === 'Escape') handleCancelEdit()
  }

  if (isEditing) {
    return (
      <div className="task-item edit-mode" role="listitem">
        <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveEdit() }}>
          <div className="form-group">
            <label htmlFor={`edit-title-${task.id}`} className="form-label">Title</label>
            <input
              id={`edit-title-${task.id}`}
              type="text"
              className="edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="edit-row">
            <div className="form-group">
              <label htmlFor={`edit-priority-${task.id}`} className="form-label">Priority</label>
              <select
                id={`edit-priority-${task.id}`}
                className="edit-input"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`edit-dueDate-${task.id}`} className="form-label">Due Date</label>
              <input
                id={`edit-dueDate-${task.id}`}
                type="date"
                className="edit-input"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="task-actions">
            <button
              type="submit"
              className="task-btn edit"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="task-btn delete"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
      role="listitem"
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        
        <div className="task-meta">
          <span
            className={`task-priority ${task.priority}`}
            style={{ borderColor: PRIORITY_COLORS[task.priority] }}
          >
            ● {PRIORITY_LABELS[task.priority]}
          </span>

          {task.dueDate && (
            <span className={`task-due-date ${overdue ? 'overdue' : getDueDateLabel(task.dueDate) === 'Today' ? 'today' : ''}`}>
              📅 {getDueDateLabel(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-btn edit"
          onClick={() => onEditTask(task.id)}
          title="Edit task"
        >
          Edit
        </button>
        <button
          className="task-btn delete"
          onClick={() => onDeleteTask(task.id)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
