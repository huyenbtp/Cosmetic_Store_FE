import { IImportItem } from "./importItem.interface";

export interface IImport {
  _id: string;
  import_code: string;
  staff_id: string | null;
  staff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  products_updated: number;
  items_imported: number;
  total_amount: number;
  createdAt: string;
}

export interface IImportDetail {
  _id: string;
  import_code: string;
  staff_id: string | null;
  staff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  items: IImportItem[];
  products_updated: number;
  items_imported: number;
  total_amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditImport {
  _id?: string;
  import_code?: string;
  staff_id: string;
  products_updated: number;
  items_imported: number;
  total_amount: number;
}