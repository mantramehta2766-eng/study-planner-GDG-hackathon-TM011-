
export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export type Theme = 'light' | 'dark';
