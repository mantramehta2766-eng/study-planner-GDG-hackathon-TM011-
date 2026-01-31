
import React from 'react';
import { ICONS, PRIORITY_COLORS } from '../constants';
import { StudyTask } from '../types';

interface TaskItemProps {
  task: StudyTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`group relative flex items-start gap-4 p-4 rounded-xl notion-shadow bg-white dark:bg-[#252525] border border-gray-100 dark:border-transparent transition-all duration-300 ${task.completed ? 'opacity-60' : 'hover:scale-[1.01]'}`}>
      <button 
        onClick={() => onToggle(task.id)}
        className="mt-1 flex-shrink-0 focus:outline-none"
      >
        {task.completed ? (
          <ICONS.Check className="w-6 h-6 text-indigo-500" />
        ) : (
          <ICONS.Unchecked className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
        )}
      </button>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-xs font-medium text-gray-400">{task.subject}</span>
        </div>
        
        <h3 className={`text-base font-semibold transition-all ${task.completed ? 'line-through text-gray-400' : 'text-[#37352F] dark:text-[#E3E3E3]'}`}>
          {task.title}
        </h3>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <ICONS.Date className="w-3.5 h-3.5" />
            <span>{new Date(task.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <ICONS.Time className="w-3.5 h-3.5" />
            <span>{task.startTime} - {task.endTime}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-lg transition-all"
        aria-label="Delete task"
      >
        <ICONS.Delete className="w-4 h-4" />
      </button>
    </div>
  );
};
