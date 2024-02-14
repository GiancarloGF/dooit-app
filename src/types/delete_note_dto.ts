import { Note } from "./note";

export interface DeleteNoteReqDto {}

export interface DeleteNoteResDto {
  message: string;
  data: Note;
}
