import { useState } from 'react'
import { PRIORITIES } from '../utils/constants'
import '../styles/TaskForm.css'

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM)
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate input
    if (!title.trim()) {
      setError('Task title cannot be empty')
      return
    }

    // Clear error and submit
    setError('')
    onAddTask({
      title: title.trim(),
      priority,
      dueDate
    })

    // Reset form
    setTitle('')
    setPriority(PRIORITIES.MEDIUM)
    setDueDate('')
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group" style={{ gridColumn: '1 / 3' }}>
          <label htmlFor="title" className="form-label">Task Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError('')
            }}
            autoFocus
          />
          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={PRIORITIES.LOW}>Low</option>
            <option value={PRIORITIES.MEDIUM}>Medium</option>
            <option value={PRIORITIES.HIGH}>High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </div>
    </form>
  )
}
