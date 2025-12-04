export interface IOrderDetail {
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

export interface IAddEditOrderDetail {
  _id?: string;
  order_id?: string;
  product_id: string;
  quantity: number;
  price: number;
}