# 📋 Advanced Task Manager App

A fully functional task management application built with **React 18**, **Vite**, and modern web technologies. Features dark mode, drag-and-drop reordering, and persistent storage.

## ✨ Features

- ✅ **Add Tasks** - Create new tasks with form validation
- ✅ **Complete Tasks** - Mark tasks as done with checkbox
- ✅ **Delete Tasks** - Remove tasks with smooth animations
- ✅ **Filter Tasks** - View All/Active/Completed tasks
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Drag & Drop** - Reorder tasks by dragging
- ✅ **Persistent Storage** - Tasks saved in localStorage
- ✅ **Responsive Design** - Works on desktop, tablet, mobile
- ✅ **Smooth Animations** - Beautiful transitions and effects
- ✅ **Statistics** - Track total, completed, and progress percentage

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **State Management:** Context API
- **Styling:** Custom CSS with CSS Variables
- **Storage:** localStorage
- **Hosting:** Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pranavmakesitcool24k/Task-manager-app.git
cd Task-manager-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📁 Project Structure

```
Task-manager-app/
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Root component
│   ├── context.jsx        # Context API & useLocalStorage hook
│   ├── components.jsx     # All UI components
│   ├── App.css            # Component styles
│   └── index.css          # Global styles
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── index.html             # HTML entry
└── .gitignore             # Git ignore rules
```

## 🎯 How to Use

1. **Add Task** - Type in the input field and press Enter or click "Add"
2. **Complete Task** - Click the checkbox to mark as complete
3. **Delete Task** - Click the ✕ button to remove
4. **Reorder Tasks** - Drag tasks up/down to reorder
5. **Filter Tasks** - Click filter buttons to view specific tasks
6. **Clear Completed** - Click "Clear" button to remove all completed tasks
7. **Toggle Theme** - Click moon/sun button in header to switch between light/dark mode

## 🎨 Customization

### Change Theme Colors

Edit `src/App.css`:

```css
:root {
  --primary: #4f46e5;        /* Main color */
  --primary-hover: #4338ca;  /* Hover state */
  --danger: #ef4444;         /* Delete button */
  --bg-primary: #ffffff;     /* Light background */
}

[data-theme="dark"] {
  --primary: #8b5cf6;        /* Dark mode primary */
  --bg-primary: #111827;     /* Dark background */
}
```

## 📱 Responsive Design

- **Desktop** (> 768px) - Full layout with side-by-side header
- **Tablet** (≤ 768px) - Optimized layout
- **Mobile** (≤ 480px) - Mobile-first with touch-friendly sizes

## 🔧 React Implementation Details

### Custom Hooks
- **useLocalStorage** - Handles all localStorage operations with error handling

### Context API
- **TaskContext** - Manages all task data and operations
- **TaskProvider** - Wraps app with context provider (no prop drilling)

### Performance Optimization
- **React.memo** - Memoized TaskItem component
- **useCallback** - Memoized all event handlers
- **useMemo** - Memoized filtered tasks and statistics

### State Management
```javascript
// All task operations in one place
- addTask(text)
- deleteTask(id)
- toggleTask(id)
- reorderTasks(sourceIndex, destinationIndex)
- clearCompleted()
```

## 📊 Key Features Explained

### Task Management
- Tasks stored in localStorage as JSON
- Each task has: id, text, completed status, createdAt timestamp
- Unique ID generated using Date.now()

### Filtering
- **All** - Shows all tasks
- **Active** - Shows incomplete tasks only
- **Completed** - Shows completed tasks only
- Filter count updates dynamically

### Theming
- Light mode (default) & Dark mode available
- Theme preference saved to localStorage
- Smooth CSS transitions between themes
- Uses CSS variables for easy customization

### Drag & Drop
- Native HTML5 drag events (no external library needed)
- Drag handle indicator (⋮⋮)
- Visual feedback on drag
- Tasks reorder on drop

### Animations
- **slideInLeft** - New tasks slide in from left (0.4s)
- **slideOutRight** - Deleted tasks slide out to right (0.3s)
- **Smooth transitions** - All interactions are animated (0.3s)

## 🌐 Live Demo

Visit the live demo: https://advancetaskmanager.netlify.app/

## 💻 Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Form Validation

- Empty task validation with error message
- Error message clears when user starts typing
- Form clears after successful task addition
- Auto-focus on input after task submission

## 💾 Data Persistence

All data persists in browser's localStorage:
- Tasks list
- Theme preference (light/dark)
- Automatically saved after each action
- Data survives page refresh

## 🔒 Best Practices Implemented

- ✅ React hooks best practices
- ✅ Context API for state management
- ✅ Performance optimization with memo/useCallback
- ✅ Error handling in localStorage
- ✅ Semantic HTML
- ✅ CSS organization with variables
- ✅ Mobile-first responsive design
- ✅ Accessibility considerations
- ✅ Clean code structure
- ✅ Proper component separation

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Context API](https://react.dev/reference/react/useContext)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Pranav Pardeshi**
- GitHub: [@pranavmakesitcool24k](https://github.com/pranavmakesitcool24k)

## 🙋 Support

For issues or questions:
1. Check GitHub Issues
2. Create a new issue with details
3. Include error messages and screenshots

---

**Made with ❤️ by Pranav**

Last Updated: November 1, 2025
