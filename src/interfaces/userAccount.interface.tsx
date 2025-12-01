export interface IUserAccount {
  _id: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserAccountDetail {
  _id: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditUserAccount {
  _id?: string;
  username: string;
  role: string;
  status: string;
}