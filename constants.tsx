
import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Calendar, 
  Clock, 
  Tag, 
  BarChart3,
  Sun,
  Moon,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const ICONS = {
  Check: CheckCircle2,
  Unchecked: Circle,
  Delete: Trash2,
  Add: Plus,
  Date: Calendar,
  Time: Clock,
  Tag: Tag,
  Stats: BarChart3,
  Sun: Sun,
  Moon: Moon,
  Arrow: ChevronRight,
  Subject: BookOpen
};

export const PRIORITY_COLORS = {
  Low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
};
