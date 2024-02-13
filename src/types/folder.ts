import { Notebook } from "./notebook";

export interface Folder {
  _id: string;
  name: string;
  isFeatured: false;
  label: string;
  color: string;
  user: string;
  notebooks: Notebook[];
}
