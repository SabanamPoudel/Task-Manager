/**
 * Format a date to a readable string (e.g., "Mar 30, 2026")
 */
export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Check if a date is in the past (overdue)
 */
export function isOverdue(dateString) {
  if (!dateString) return false
  const dueDate = new Date(dateString)
  const today = new Date()
  
  // Reset time to midnight for fair comparison
  today.setHours(0, 0, 0, 0)
  dueDate.setHours(0, 0, 0, 0)
  
  return dueDate < today
}

/**
 * Check if a date is today
 */
export function isToday(dateString) {
  if (!dateString) return false
  const dueDate = new Date(dateString)
  const today = new Date()
  
  return (
    dueDate.getDate() === today.getDate() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getFullYear() === today.getFullYear()
  )
}

/**
 * Get a human-readable due date label
 */
export function getDueDateLabel(dateString) {
  if (!dateString) return ''
  
  if (isToday(dateString)) return 'Today'
  if (isOverdue(dateString)) return 'Overdue'
  
  const dueDate = new Date(dateString)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (
    dueDate.getDate() === tomorrow.getDate() &&
    dueDate.getMonth() === tomorrow.getMonth() &&
    dueDate.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Tomorrow'
  }
  
  return formatDate(dateString)
}
