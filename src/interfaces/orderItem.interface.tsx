export interface IOrderItem {
  _id: string;
  order_id: string;
  product_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  quantity: number;
  price: number;
}

export interface IAddEditOrderItem {
  _id?: string;
  order_id?: string;
  product_id: string;
  quantity: number;
  price: number;
}