import { IOrderItem } from "./orderItem.interface";

export interface IOrder {
  _id: string;
  order_code: string;
  customer_id: string | null;
  customer: {
    _id: string;
    name: string;
    phone: string;
  } | null;
  total_items: number;
  total: number;
  payment_method: string;
  payment_status: string;
  createdAt: string;
}

export interface IOrderDetail {
  _id: string;
  order_code: string;
  cashier_id: string;
  cashier: {
    _id: string;
    staff_code: string;
    full_name: string;
  },
  customer_id: string | null;
  customer: {
    _id: string;
    name: string;
    phone: string;
  } | null;
  items: IOrderItem[];
  total_items: number;
  subtotal: number;
  discount_amount: number;
  points_used: number;
  total: number;
  payment_method: string;
  payment_status: string;
  note: string
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditOrder {
  _id?: string;
  order_code?: string;
  cashier_id: string;
  customer_id: string | null;
  total_items: number;
  subtotal: number;
  discount_amount: number;
  points_used: number;
  total: number;
  payment_method: string;
  payment_status: string;
}