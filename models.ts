export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

interface IRating {
  rate: number;
  count: number;
}

export interface ICartItem extends IProduct {
  count: number;
}

export interface Cart {
  items: ICartItem[];
  totalPrice: number;
}
