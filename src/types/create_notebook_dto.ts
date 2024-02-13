import { Notebook } from "./notebook";

export interface CreateNotebookReqDto {
  name: string;
  isFeatured: boolean;
  folderId: string;
  userId: string;
}

export interface CreateNotebookResDto {
  message: string;
  data: Notebook;
}
