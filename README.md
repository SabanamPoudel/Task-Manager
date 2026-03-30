# ✓ Task Manager

A modern, feature-rich task management application built with React and Vite. Perfect for staying organized and tracking your daily productivity with an intuitive interface and powerful features.

> **Portfolio Ready** — This project demonstrates professional React patterns, state management, localStorage persistence, responsive design, and modern CSS practices.

## 🎯 Features

- ✅ **Add, Edit, Delete Tasks** — Full CRUD operations with form validation
- 🎯 **Priority Levels** — Low, Medium, High with visual indicators
- 📅 **Due Dates** — Set deadlines with smart date labels (Today, Tomorrow, Overdue)
- ⚠️ **Overdue Indicators** — Clear visual highlighting for tasks past their due date
- 🔍 **Search Tasks** — Instant filtering by task title
- 🏷️ **Filter by Status** — View All, Active, or Completed tasks
- 📊 **Task Statistics** — Real-time counters for total, completed, and remaining tasks
- 🌓 **Dark/Light Mode** — Theme preference persists across sessions
- 💾 **Data Persistence** — All tasks and preferences saved in localStorage
- 📱 **Fully Responsive** — Beautiful on desktop, tablet, and mobile devices
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite (fast development server & optimized builds)
- **Styling:** Plain CSS with CSS Variables for theming
- **State Management:** React Hooks (useState, useEffect)
- **Data Persistence:** Browser localStorage API
- **JavaScript:** Modern ES6+ with functional components

## 📋 Project Structure

```
To-Do/
├── src/
│   ├── components/           # React components
│   │   ├── App.jsx          # Main state manager
│   │   ├── Header.jsx       # App header with theme toggle
│   │   ├── TaskForm.jsx     # New task input form
│   │   ├── TaskFilter.jsx   # Filter tabs (All/Active/Completed)
│   │   ├── SearchBar.jsx    # Task search input
│   │   ├── TaskStats.jsx    # Statistics counters
│   │   ├── TaskList.jsx     # Task list container
│   │   ├── TaskItem.jsx     # Individual task card
│   │   └── EmptyState.jsx   # Empty state view
│   ├── styles/              # Component stylesheets
│   │   ├── theme.css        # CSS variables & theme system
│   │   ├── index.css        # Global styles & utilities
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── TaskForm.css
│   │   ├── TaskFilter.css
│   │   ├── SearchBar.css
│   │   ├── TaskStats.css
│   │   ├── TaskList.css
│   │   ├── TaskItem.css
│   │   └── EmptyState.css
│   ├── utils/               # Helper functions
│   │   ├── constants.js     # App constants (priorities, filters, etc.)
│   │   ├── dateUtils.js     # Date formatting & logic
│   │   ├── filterUtils.js   # Filter & search logic
│   │   └── storageUtils.js  # localStorage helpers
│   ├── main.jsx            # React app entry point
│   └── App.jsx             # Main component
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd To-Do
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open automatically at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output is in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 How to Use

### Adding a Task
1. Type your task title in the input field
2. (Optional) Select a priority level (Low, Medium, High)
3. (Optional) Pick a due date using the date picker
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete Task:** Click the checkbox next to the task
- **Edit Task:** Click the "Edit" button to modify title, priority, or due date
- **Delete Task:** Click the "Delete" button to remove the task
- **Search:** Use the search bar to filter tasks by title in real-time

### Filtering & Organizing
- **All Tasks:** View all tasks regardless of status
- **Active:** Show only incomplete tasks
- **Completed:** Show only finished tasks
- **Statistics:** View total, completed, and remaining task counts

### Theme
- Click the sun/moon icon in the header to toggle between light and dark mode
- Your preference is saved automatically

## 💡 Key Features Explained

### Task Data Model
Each task includes:
- `id` — Unique identifier (timestamp)
- `title` — Task description
- `completed` — Boolean flag for completion status
- `priority` — Low, Medium, or High
- `dueDate` — Optional ISO date string
- `createdAt` — Timestamp of creation

### localStorage Architecture
- **STORAGE_KEY.TASKS:** JSON array of all tasks
- **STORAGE_KEY.THEME:** User's theme preference (light/dark)
- Automatic sync on every state change
- Graceful fallback if storage is unavailable

### Filtering & Search
- **Filter Logic:** Separates tasks by completion status
- **Search Logic:** Case-insensitive substring matching
- **Combined:** Both filters and search work together
- **Performance:** Not optimized for large datasets (OK for <5000 tasks)

### Date Display
- Overdue tasks show "Overdue" in red
- Today's tasks show "Today" in warning color
- Tomorrow's tasks show "Tomorrow"
- Other dates show formatted as "Mar 30, 2026"

### Edit Mode
- Click "Edit" on any task to enter inline edit mode
- Press **Enter** to save changes
- Press **Escape** to cancel editing
- Edit form validates that title is not empty

### Responsive Design
- **Desktop (900px+):** Full form layout with all controls in one row
- **Tablet (768px-899px):** 2-column form, stacked task meta
- **Mobile (<768px):** Single column, optimized spacing and touch targets

## 🎨 Styling System

### CSS Variables (theme.css)
- **Colors:** Primary, secondary, success, error, warning
- **Light Mode:** Clean white backgrounds with subtle borders
- **Dark Mode:** Dark gray backgrounds with adjusted contrast
- **Spacing:** Consistent 8px grid (xs, sm, md, lg, xl)
- **Shadows:** Subtle shadow system for depth
- **Radius:** Rounded corners (4px, 8px, 12px)
- **Transitions:** 150ms cubic-bezier for smooth animations

### Customizing Theme
Edit CSS variables in `src/styles/theme.css`:
```css
:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  /* ... more variables ... */
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  /* ... dark mode overrides ... */
}
```

## 🧠 Component Architecture

### State Flow (Top-Down)
```
App (state manager)
├── Header (theme toggle)
├── TaskForm (add task)
├── TaskStats (display counters)
├── SearchBar (search input)
├── TaskFilter (filter tabs)
└── TaskList (task array)
    └── TaskItem × N (individual tasks)
```

### State Management
- **App component** holds all state (tasks, filter, search, theme)
- **Props drilling** for simplicity (no Redux/Context needed)
- **useEffect** syncs tasks to localStorage on mount and after changes
- **Handlers** passed as callbacks to child components

### Helper Functions
- **dateUtils.js:** `formatDate()`, `isOverdue()`, `getDueDateLabel()`
- **filterUtils.js:** `filterTasks()`, `searchTasks()`, `getTaskStats()`
- **storageUtils.js:** `saveTasks()`, `loadTasks()`, `saveTheme()`, `loadTheme()`

## 📸 Screenshots

[Add your screenshots here after running the app]

## 🔮 Future Improvements

### Features to Add
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task notes/description field
- [ ] Task attachments
- [ ] Subtasks/nested tasks
- [ ] Time estimates and time tracking
- [ ] Task templates
- [ ] Undo/Redo functionality
- [ ] Bulk operations (select multiple tasks)
- [ ] Export/Import tasks (CSV, JSON)

### Performance & Code Quality
- [ ] Implement useMemo for filtering (for 10k+ tasks)
- [ ] Add unit tests with Vitest
- [ ] Add E2E tests with Playwright
- [ ] Implement error boundaries
- [ ] Add error logging/monitoring
- [ ] Optimize bundle size analysis

### UI/UX Enhancements
- [ ] Drag-and-drop task reordering
- [ ] Animations & micro-interactions
- [ ] Toast notifications for actions
- [ ] Keyboard shortcuts guide (?)
- [ ] Customizable color themes
- [ ] Task list sorting options (by date, priority, created)

### Data & Persistence
- [ ] Sync with backend API/database
- [ ] Cloud backup
- [ ] Collaborative tasks (shared lists)
- [ ] Task history/activity log
- [ ] Data export functionality

### Accessibility
- [ ] Screen reader testing
- [ ] Keyboard navigation refinement
- [ ] High contrast mode
- [ ] Reduce motion support

## 💻 Development Notes

### Adding a New Feature

1. **Create component** in `src/components/`
2. **Create styles** in `src/styles/ComponentName.css`
3. **Import in parent** and pass necessary props
4. **Add to App state** if it needs data persistence

### Local Storage Gotchas
- localStorage is synchronous (avoid in tight loops)
- Check `@media (prefers-reduced-motion)` for animations
- Test with storage disabled (private browsing)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ JavaScript support
- localStorage must be enabled

## 📝 License

This project is free to use for personal and portfolio purposes.

## 🙏 Acknowledgments

- Designed with modern web development best practices
- Inspired by popular task management applications
- Built with React and Vite for optimal performance

---

**Built with ❤️ as a portfolio project**

Start using it now: `npm install && npm run dev`
