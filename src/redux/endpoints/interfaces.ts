export interface Projects {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface UserType {
  userId?: number;
  username?: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface AttachmentType {
  id: number;
  fileURL: string;
  fileName: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface TaskDataType {
  id: number;
  title: string;
  description?: string;
  status?: StatusDataType;
  priority?: PriorityDataType;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;
  assignee?: UserType;
  author?: UserType;
  attachments: AttachmentType[];
  comments: Comment[];
}

export enum PriorityDataType {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export enum StatusDataType {
  High = "High",
  Urgent = "Urgent",
  Low = "Low",
  Backlog = "Backlog",
}
