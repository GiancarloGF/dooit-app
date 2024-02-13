import { Notebook } from "./notebook";

export interface DeleteNotebookReqDto {
  userId: string;
}

export interface DeleteNotebookResDto {
  message: string;
  data: Notebook;
}
