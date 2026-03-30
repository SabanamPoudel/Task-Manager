import TaskList from './TaskList'
import SearchBar from './SearchBar'
import { useState } from 'react'
import { isOverdue } from '../utils/dateUtils'
import '../styles/Pages.css'

export default function OverduePage({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  editingTaskId,
  onEditTask
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Get overdue tasks (incomplete and past due date)
  let overdueTasks = tasks.filter(task => 
    !task.completed && isOverdue(task.dueDate)
  )

  if (searchQuery.trim()) {
    overdueTasks = overdueTasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Sort by due date (oldest first = most overdue)
  overdueTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  return (
    <div className="page overdue-page">
      <div className="page-header">
        <h1>⚠️ Overdue Tasks</h1>
        <p className="page-subtitle">{overdueTasks.length} task{overdueTasks.length !== 1 ? 's' : ''} past due. Complete them urgently!</p>
      </div>

      {overdueTasks.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} />}

      <TaskList
        tasks={overdueTasks}
        onToggleComplete={onToggleComplete}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        onEditTask={onEditTask}
        editingTaskId={editingTaskId}
      />
    </div>
  )
}
