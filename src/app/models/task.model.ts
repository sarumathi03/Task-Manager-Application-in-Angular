export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  reminder: boolean;
  completed: boolean;
  userId: string;
}
