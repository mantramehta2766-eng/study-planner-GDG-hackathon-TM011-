
import React from 'react';
import { ICONS } from '../constants';
import { StudyTask } from '../types';

interface ProgressHeaderProps {
  tasks: StudyTask[];
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-8 p-6 bg-white dark:bg-[#252525] rounded-xl notion-shadow border border-gray-100 dark:border-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <ICONS.Stats className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-semibold">Your Progress</h2>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {completed}/{total} tasks finished
        </span>
      </div>
      
      <div className="relative w-full h-3 bg-gray-100 dark:bg-[#323232] rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {percentage === 100 
          ? "Great job! You've crushed all your goals today." 
          : percentage > 50 
          ? "Keep going! You're more than halfway there." 
          : total > 0 
          ? "Starting is the hardest part. You got this!" 
          : "Add a task to start tracking your progress."}
      </p>
    </div>
  );
};
