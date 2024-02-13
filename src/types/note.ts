export interface Note {
  _id: string;
  description: string;
  isCompleted: boolean;
  user: string;
  folder: string;
  notebook: string;
}
