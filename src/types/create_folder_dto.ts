import { Folder } from "./folder";

export interface CreateFolderResDto {
  message: string;
  data: Folder;
}

export interface CreateFolderReqDto {
  name: string;
  isFeatured: boolean;
  color: string;
  label: string;
  userId: string;
}
