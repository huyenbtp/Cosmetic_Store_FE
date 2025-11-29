export interface IStaff {
  _id: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
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
  image: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  account_id: string;
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
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  account_id: string;
}