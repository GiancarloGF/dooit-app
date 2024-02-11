export interface GetUserResDto {
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    folders: string[];
    notes: string[];
    notebooks: string[];
    labels: string[];
  };
}
