import { Note } from "./note";

export interface CreateNoteReqDto {
  description: string;
  isCompleted: boolean;
  userId: string;
  notebookId: string;
  folderId: string;
}

export interface CreateNoteResDto {
  message: string;
  data: Note;
}
