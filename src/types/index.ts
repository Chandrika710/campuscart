export type ProductCategory =
  | 'Textbooks'
  | 'Calculators'
  | 'Engineering Drawing Instruments'
  | 'Lab Coats'
  | 'Lab Equipment'
  | 'Notes and Study Materials'
  | 'Electronics'
  | 'Other College Essentials';

export type ProductCondition = 'Brand New' | 'Like New' | 'Good Condition' | 'Fair';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  sellerName: string;
  sellerEmail: string;
  college: string;
  city: string;
  images: string[];
  primaryImage: string;
  isBudgetFriendly?: boolean;
  isRecentlyListed?: boolean;
  dateListed: string;
  quantity: number;
  status: 'active' | 'sold' | 'reserved';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BuyerUser {
  id: string;
  name: string;
  email: string;
  college: string;
  department: string;
  yearOfStudy: string;
  city: string;
}

export interface SellerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  city: string;
  payoutPlaceholder?: string;
}

export interface BuyerRequest {
  id: string;
  productId: string;
  productName: string;
  buyerName: string;
  buyerEmail: string;
  buyerCollege: string;
  offeredPrice: number;
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface OrderConfirmation {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  pickupLocation: string;
  preferredTime: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
}
