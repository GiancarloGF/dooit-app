import { Folder } from "./folder";

export interface DeleteFolderReqDto {
  userId: string;
}
export interface DeleteFolderResDto {
  message: string;
  data: Folder;
}
