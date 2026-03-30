import { FILTER_TYPES } from './constants.js'

/**
 * Filter tasks based on filter type (all, active, completed)
 */
export function filterTasks(tasks, filterType) {
  if (filterType === FILTER_TYPES.ACTIVE) {
    return tasks.filter(task => !task.completed)
  }
  
  if (filterType === FILTER_TYPES.COMPLETED) {
    return tasks.filter(task => task.completed)
  }
  
  return tasks // FILTER_TYPES.ALL
}

/**
 * Search tasks by title (case-insensitive)
 */
export function searchTasks(tasks, searchQuery) {
  if (!searchQuery.trim()) return tasks
  
  const query = searchQuery.toLowerCase()
  return tasks.filter(task => task.title.toLowerCase().includes(query))
}

/**
 * Combine filter and search
 */
export function getFilteredAndSearchedTasks(tasks, filterType, searchQuery) {
  let result = filterTasks(tasks, filterType)
  result = searchTasks(result, searchQuery)
  return result
}

/**
 * Get task statistics
 */
export function getTaskStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    remaining: tasks.filter(t => !t.completed).length
  }
}
