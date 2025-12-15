export interface IProduct {
  _id: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  stock_quantity: number;
  selling_price: number;
  status: string;
  image: string;
}

export interface IMinMaxFilterData {
  price: {
    min: number;
    max: number;
  };
  stock: {
    min: number;
    max: number;
  };
}

export interface IProductDetail {
  _id: string;
  sku: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  selling_price: number;
  import_price: number;
  description: string;
  image: string;
  stock_quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  totalSold: number;
  totalRevenue: number;
  lastImportDate: string | null;
}

export interface IAddEditProduct {
  _id?: string;
  sku?: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  selling_price: number;
  description: string;
  status: string;
  image: string;
}

export interface IFetchedCategory {
  _id: string;
  name: string;
}

export interface IFetchedBrand {
  _id: string;
  name: string;
}