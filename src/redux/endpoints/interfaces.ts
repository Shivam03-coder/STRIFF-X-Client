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
  High = "High",
  Urgent = "Urgent",
  Medium = "Medium",
  Backlog = "Backlog",
}

export enum StatusDataType {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface SearchResultsType {
  Tasks?: TaskDataType[];
  Users?: UserType[];
  Projects?: Projects[];
}

export interface UsersType {
  Users?: UserType[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}
