
import React, { useState, useEffect, useMemo } from 'react';
import { StudyTask, Priority, Theme } from './types';
import { ICONS } from './constants';
import { StudyForm } from './components/StudyForm';
import { TaskItem } from './components/TaskItem';
import { ProgressHeader } from './components/ProgressHeader';
import { ThemeToggle } from './components/ThemeToggle';

const STORAGE_KEY = 'focusflow_tasks';
const THEME_KEY = 'focusflow_theme';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Load initial data
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Save to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const addTask = (taskData: Omit<StudyTask, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: StudyTask = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks].sort((a, b) => {
      // Sort by completion first
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      // Then by priority
      const pMap = { [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
      if (pMap[a.priority] !== pMap[b.priority]) return pMap[b.priority] - pMap[a.priority];
      // Then by time
      return a.startTime.localeCompare(b.startTime);
    });

    if (filter === 'pending') return result.filter(t => !t.completed);
    if (filter === 'completed') return result.filter(t => t.completed);
    return result;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center notion-shadow">
              <ICONS.Add className="w-6 h-6 text-white rotate-45" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FocusFlow</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">GDG Campus Study Planner</p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        {/* Progress Section */}
        <ProgressHeader tasks={tasks} />

        {/* Action Section */}
        <StudyForm onAdd={addTask} />

        {/* Task List Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
            {filter === 'all' ? 'All Tasks' : filter === 'pending' ? 'To Do' : 'Finished'}
          </h2>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#252525] p-1 rounded-lg">
            {(['all', 'pending', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  filter === f 
                    ? 'bg-white dark:bg-[#323232] text-indigo-600 dark:text-indigo-400 notion-shadow' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-[#1E1E1E] rounded-xl border-2 border-dashed border-gray-100 dark:border-[#2F2F2F]">
              <div className="flex flex-col items-center gap-2">
                <ICONS.Subject className="w-10 h-10 text-gray-200 dark:text-[#323232]" />
                <p className="text-gray-400 font-medium">No tasks found in this category.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center pb-10">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} FocusFlow • GDG Campus Event Hackathon Demo
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
