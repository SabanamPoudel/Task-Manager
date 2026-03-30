import { STORAGE_KEYS } from './constants.js'

/**
 * Save tasks to localStorage
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks))
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err)
  }
}

/**
 * Load tasks from localStorage
 */
export function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err)
    return []
  }
}

/**
 * Save theme preference to localStorage
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  } catch (err) {
    console.error('Failed to save theme to localStorage:', err)
  }
}

/**
 * Load theme preference from localStorage
 */
export function loadTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
  } catch (err) {
    console.error('Failed to load theme from localStorage:', err)
    return 'light'
  }
}
