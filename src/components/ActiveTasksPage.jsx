import TaskForm from './TaskForm'
import TaskList from './TaskList'
import SearchBar from './SearchBar'
import { useState } from 'react'
import '../styles/Pages.css'

export default function ActiveTasksPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  editingTaskId,
  onEditTask
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Get active (incomplete) tasks
  let activeTasks = tasks.filter(task => !task.completed)

  if (searchQuery.trim()) {
    activeTasks = activeTasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Sort by priority: High > Medium > Low
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  activeTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return (
    <div className="page active-page">
      <div className="page-header">
        <h1>⚡ Active Tasks</h1>
        <p className="page-subtitle">{activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''} to complete</p>
      </div>

      <TaskForm onAddTask={onAddTask} />
      
      {activeTasks.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} />}

      <TaskList
        tasks={activeTasks}
        onToggleComplete={onToggleComplete}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        onEditTask={onEditTask}
        editingTaskId={editingTaskId}
      />
    </div>
  )
}
