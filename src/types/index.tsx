export interface Product {
  id: number;
  title: string;
  stock: number;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  dimensions: {
    depth: number;
    height: number;
    width: number;
  };
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  tags: string[];
  warrantyInformation: string;
  weight: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerEmail: string;
  reviewerName: string;
}
