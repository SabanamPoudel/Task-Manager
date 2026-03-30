import { FILTER_TYPES } from '../utils/constants'
import '../styles/TaskFilter.css'

export default function TaskFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { type: FILTER_TYPES.ALL, label: 'All Tasks' },
    { type: FILTER_TYPES.ACTIVE, label: 'Active' },
    { type: FILTER_TYPES.COMPLETED, label: 'Completed' }
  ]

  return (
    <div className="task-filter" role="tablist">
      {filters.map(filter => (
        <button
          key={filter.type}
          className={`filter-btn ${activeFilter === filter.type ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.type)}
          role="tab"
          aria-selected={activeFilter === filter.type}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
