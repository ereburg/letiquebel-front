export type CheckoutState = 'IDLE' | 'IN_PROGRESS' | 'ON_SUCCESS' | 'ON_ERROR';

export type CheckoutOrder = {
  name: string;
  phone: string;
  email: string;
  wrap: {
    id: number;
    price: number;
  };
  delivery: {
    method: string;
    price: number;
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
