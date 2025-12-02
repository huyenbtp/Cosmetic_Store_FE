import { IAddEditUserAccount, IUserAccount, IUserAccountDetail } from "./userAccount.interface";

export interface IStaff {
  _id: string;
  staff_code: string;
  full_name: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  account: IUserAccount;
}

export interface IStaffDetail {
  _id: string;
  staff_code: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  account: IUserAccountDetail;
  purchasesHandled: IStaffPurchasesHandled[];
}

export interface IStaffPurchasesHandled {
  _id: string;
  receipt_code: string;
  customerName: string;
  date: string;
  final_amount: number;
  payment_method: string;
}

export interface IAddEditStaff {
  _id?: string;
  staff_code?: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  account: IAddEditUserAccount;
}