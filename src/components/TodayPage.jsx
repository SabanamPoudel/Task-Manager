import TaskForm from './TaskForm'
import TaskList from './TaskList'
import SearchBar from './SearchBar'
import { useState } from 'react'
import { isToday } from '../utils/dateUtils'
import '../styles/Pages.css'

export default function TodayPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  editingTaskId,
  onEditTask
}) {
  const [searchQuery, setSearchQuery] = useState('')

  // Get today's tasks
  let todayTasks = tasks.filter(task => isToday(task.dueDate) || !task.dueDate)

  if (searchQuery.trim()) {
    todayTasks = todayTasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Prioritize incomplete tasks
  todayTasks.sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  return (
    <div className="page today-page">
      <div className="page-header">
        <h1>📅 Today's Tasks</h1>
        <p className="page-subtitle">Focus on what matters today.</p>
      </div>

      <TaskForm onAddTask={onAddTask} />
      
      {todayTasks.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} />}

      <TaskList
        tasks={todayTasks}
        onToggleComplete={onToggleComplete}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        onEditTask={onEditTask}
        editingTaskId={editingTaskId}
      />
    </div>
  )
}
