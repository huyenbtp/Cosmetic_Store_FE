export interface IStaff {
  _id: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  position: string;
  status: string;
  account_id: string;
}

export interface IStaffDetail {
  _id: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  account_id: string;
}

export interface IAddEditStaff {
  _id?: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  position: string;
  status: string;
  account_id: string;
}