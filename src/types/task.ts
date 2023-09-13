export interface Task {
    id: string;
    title: string;
    description: string;
    state: 'review' | 'selected' | 'development' | 'done' | '';
    reporter?: string;
    assignee?: string
}