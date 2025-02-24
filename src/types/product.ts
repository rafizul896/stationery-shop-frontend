export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string | File;
  description: string;
  averageRating: string;
  reviews: object[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
  quantity: number;
};
