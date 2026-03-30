import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import DashboardPage from './DashboardPage'
import TodayPage from './TodayPage'
import ActiveTasksPage from './ActiveTasksPage'
import CompletedPage from './CompletedPage'
import OverduePage from './OverduePage'
import PriorityPage from './PriorityPage'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { loadTasks, saveTasks, loadTheme, saveTheme } from '../utils/storageUtils'
import { getTaskStats } from '../utils/filterUtils'
import { THEMES } from '../utils/constants'
import '../styles/App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [theme, setTheme] = useState(THEMES.LIGHT)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Load tasks and theme from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks()
    const loadedTheme = loadTheme()
    setTasks(loadedTasks)
    setTheme(loadedTheme)
    document.documentElement.setAttribute('data-theme', loadedTheme)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Handle adding a new task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([newTask, ...tasks])
  }

  // Handle updating a task
  const handleUpdateTask = (id, updatedData) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedData } : task
    ))
    setEditingTaskId(null)
  }

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Handle toggling task completion
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    setTheme(newTheme)
    saveTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Get task statistics
  const stats = getTaskStats(tasks)

  // Render current page
  const renderPage = () => {
    const pageProps = {
      tasks,
      onAddTask: handleAddTask,
      onUpdateTask: handleUpdateTask,
      onDeleteTask: handleDeleteTask,
      onToggleComplete: handleToggleComplete,
      stats,
      editingTaskId,
      onEditTask: setEditingTaskId
    }

    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage stats={stats} />
      case 'today':
        return <TodayPage {...pageProps} />
      case 'active':
        return <ActiveTasksPage {...pageProps} />
      case 'completed':
        return <CompletedPage {...pageProps} />
      case 'overdue':
        return <OverduePage {...pageProps} />
      case 'priority':
        return <PriorityPage {...pageProps} />
      case 'all':
        return (
          <div className="page all-tasks-page">
            <div className="page-header">
              <h1>📋 All Tasks</h1>
              <p className="page-subtitle">Complete overview of all tasks.</p>
            </div>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              onEditTask={setEditingTaskId}
              editingTaskId={editingTaskId}
            />
          </div>
        )
      default:
        return <DashboardPage {...pageProps} />
    }
  }

  return (
    <div className="app">
      <Header onThemeToggle={handleThemeToggle} theme={theme} />
      <div className="app-layout">
        <Sidebar activePage={currentPage} onPageChange={setCurrentPage} stats={stats} />
        <main className="app-main-with-sidebar">
          {renderPage()}
        </main>
      </div>
      <footer className="app-footer">
        <p>© 2026 Sabanam Poudel. All rights reserved.</p>
      </footer>
    </div>
  )
}
