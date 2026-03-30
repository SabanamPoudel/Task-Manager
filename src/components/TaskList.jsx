import TaskItem from './TaskItem'
import EmptyState from './EmptyState'
import '../styles/TaskList.css'

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
  onEditTask,
  editingTaskId
}) {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="task-list" role="list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  )
}
