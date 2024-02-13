export interface Notebook {
  _id: string;
  name: string;
  isFeatured: boolean;
  user: string;
  folder: string;
  notes: string[];
}
