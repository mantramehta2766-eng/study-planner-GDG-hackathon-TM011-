
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Priority, StudyTask } from '../types';

interface StudyFormProps {
  onAdd: (task: Omit<StudyTask, 'id' | 'completed' | 'createdAt'>) => void;
}

export const StudyForm: React.FC<StudyFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) return;

    onAdd({
      title,
      subject,
      date,
      startTime,
      endTime,
      priority
    });

    setTitle('');
    setSubject('');
    setIsExpanded(false);
  };

  return (
    <div className="mb-8 bg-white dark:bg-[#252525] rounded-xl notion-shadow border border-gray-100 dark:border-transparent overflow-hidden">
      {!isExpanded ? (
        <button 
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 p-4 text-gray-500 hover:bg-gray-50 dark:hover:bg-[#2F2F2F] transition-colors text-left"
        >
          <ICONS.Add className="w-5 h-5" />
          <span className="text-sm font-medium">Add a study task...</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 task-card-enter">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Task Title</label>
            <input
              autoFocus
              type="text"
              placeholder="e.g., Review Neural Networks"
              className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 focus:outline-none focus:border-indigo-500 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
              <div className="relative">
                <ICONS.Subject className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Computer Science"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 pl-6 focus:outline-none focus:border-indigo-500 transition-colors"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</label>
              <div className="relative">
                <ICONS.Date className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 pl-6 focus:outline-none focus:border-indigo-500 transition-colors"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Start Time</label>
              <div className="relative">
                <ICONS.Time className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 pl-6 focus:outline-none focus:border-indigo-500 transition-colors"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">End Time</label>
              <div className="relative">
                <ICONS.Time className="absolute left-0 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 pl-6 focus:outline-none focus:border-indigo-500 transition-colors"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority</label>
              <select
                className="w-full bg-transparent border-b border-gray-200 dark:border-[#323232] py-2 focus:outline-none focus:border-indigo-500 transition-colors"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors notion-shadow"
            >
              Create Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
