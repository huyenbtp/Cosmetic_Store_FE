export interface IProduct {
  _id: string;
  name: string;
  category: string;
  brand: string;
  stock_quantity: number;
  selling_price: number;
  status: string;
  image: string;
}

export interface IProductDetail {
  _id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  selling_price: number;
  import_price: number;
  description: string;
  image: string;
  stock_quantity: number;
  totalSold: number;
  totalRevenue: number;
  status: string;
  createdDate: string;
  lastUpdated: string;
  lastImportDate: string;
}