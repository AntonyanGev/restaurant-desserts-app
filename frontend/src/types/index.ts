export interface Images {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  id: string;
  name: string;
  price: string;
  type: string;
  action: string;
  count: number;
  images: Images;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  count: number;
  totalPrice: number;
  image: string;
}
