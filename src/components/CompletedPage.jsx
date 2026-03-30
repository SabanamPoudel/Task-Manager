import TaskList from './TaskList'
import SearchBar from './SearchBar'
import { useState } from 'react'
import '../styles/Pages.css'

export default function CompletedPage({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  editingTaskId,
  onEditTask
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Get completed tasks
  let completedTasks = tasks.filter(task => task.completed)

  if (searchQuery.trim()) {
    completedTasks = completedTasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Sort by completion date (newest first)
  completedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="page completed-page">
      <div className="page-header">
        <h1>✓ Completed Tasks</h1>
        <p className="page-subtitle">Great work! You've completed {completedTasks.length} task{completedTasks.length !== 1 ? 's' : ''}.</p>
      </div>

      {completedTasks.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} />}

      <TaskList
        tasks={completedTasks}
        onToggleComplete={onToggleComplete}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        onEditTask={onEditTask}
        editingTaskId={editingTaskId}
      />
    </div>
  )
}
