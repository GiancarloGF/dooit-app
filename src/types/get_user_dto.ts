import { Folder } from "./folder";

export interface GetUserResDto {
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    folders: Folder[];
    notes: string[];
    notebooks: string[];
    labels: string[];
  };
}
