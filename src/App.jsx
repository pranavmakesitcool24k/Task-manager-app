import { TaskProvider } from "./context.jsx";
import {
  Header,
  TaskInput,
  FilterButtons,
  TaskList,
  StatsBar,
} from "./components.jsx";
import "./App.css";

export default function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <Header />
        <main>
          <TaskInput />
          <FilterButtons />
          <div className="tasks-container">
            <TaskList />
          </div>
          <StatsBar />
        </main>
      </div>
    </TaskProvider>
  );
}
