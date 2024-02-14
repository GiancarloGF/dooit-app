import { Note } from "./note";

export interface UpdateNoteReqDto {
  description?: string;
  isCompleted?: boolean;
}

export interface UpdateNoteResDto {
  message: string;
  data: Note;
}
