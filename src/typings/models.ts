export type ErrorCode = string;

export type Collection<Entity> = {
  data: Array<Entity>;
};

export type GlobalParams = {
  doorDeliveryText: string;
  doorDeliveryCost: number;
  minOrderPriceForDelivery: number;
  officeDeliveryText: string;
  messageAfterOrder: string;
  currency: string;
  instagram: string;
  whatsapp: string;
  telegram: string;
  viber: string;
  email: string;
  phone: string;
};

export type Order = {
  name: string;
  phone: string;
  email: string;
  wrapId: number;
  items: Array<{
    amount: number;
    id: number;
  }>;
  delivery: {
    method: string;
    region: string;
    area: string;
    locality: string;
    street: string;
    house: string;
    building: string;
    frontDoor: string;
    flat: string;
  };
  paymentMethod: string;
};

export type OrderStatus = {
  status:
    | 'WAITING'
    | 'SUCCESS_PAYMENT'
    | 'REFUND'
    | 'CANCELLATION'
    | 'DECLINED';
};

export type PaymentDetails = {
  status: string;
  url: string;
};

export type Gift = {
  id: number;
  price: number;
  product: CartProduct;
};

export type Promo = {
  url: string;
};

export type Image = {
  id: number;
  url: string;
};

export type Slide = {
  id: number;
  status?: string;
  file?: Image;
  backgroundImage?: Image;
  category?: {
    id: number;
    alias: string;
    custom: boolean;
    productCount: number;
    title: string;
  };
  link: string;
  title: string;
  subtitle: string;
  description: string;
};

export type Product = {
  id: number;
  link: string;
  status?: string;
  file?: Image;
  categories: Array<{ id: number; title: string; alias: string }>;
  types: Array<{ id: number; productCount: number; title: string }>;
  title: string;
  discountPrice: number;
  price: number;
  volume: string;
};

export type ProductDetails = Product & {
  description: string;
  ingredients: Array<Ingredient>;
  effect: Effect;
  usage: Usage;
  relations: Array<{
    id: number;
    title: string;
    products: Array<Product>;
  }>;
};

export type CartProduct = {
  id: number;
  link: string;
  title: string;
  file?: Image;
  discountPrice: number;
  totalPrice: number;
  price: number;
  amount: number;
};

export type ProductType = {
  id: number;
  title: string;
};

export type ProductCategory = {
  id: number;
  title: string;
  alias: string;
  custom: boolean;
  priority: number;
};

export type ProductPackage = {
  id: number;
  title: string;
  description: string;
  price: number;
  freeFrom: number;
  file: Image;
};

export type Usage = {
  text: string;
  file?: Image;
};

export type Ingredient = {
  id: number;
  title: string;
  description: string;
  file?: Image;
};

export type Effect = {
  texts: Array<string>;
  effects: Array<string>;
};

export type Question = {
  id: number;
  category: string;
  question: string;
  answer: string;
  number: number;
};

export type QuestionGroup = {
  title: string;
  items: Array<Question>;
};

export type Shop = {
  id: number;
  city: string;
  address: string;
  metro?: string;
  workingHours: string;
  place: string;
  phone: string;
  file?: Image;
  coordinates: Array<number>;
};
