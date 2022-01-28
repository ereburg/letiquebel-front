import Products from '@modules/Checkout/components/Products';
import Packages from '@modules/Checkout/components/Packages';
import Information from '@modules/Checkout/components/Information';

export const STEP_LIST = [
  {
    label: 'Корзина',
    section: Products,
  },
  {
    label: 'Выбор коробки',
    section: Packages,
  },
  {
    label: 'Данные',
    section: Information,
  },
];

export const REGION_OPTIONS = [
  {
    label: 'Брестская',
    value: 'Брестская',
  },
  {
    label: 'Витебская',
    value: 'Витебская',
  },
  {
    label: 'Гомельская',
    value: 'Гомельская',
  },
  {
    label: 'Гродненская',
    value: 'Гродненская',
  },
  {
    label: 'Минская',
    value: 'Минская',
  },
  {
    label: 'Могилевская',
    value: 'Могилевская',
  },
];

export const INIT_ORDER_DATA = {
  phone: '',
  email: '',
  name: '',
  wrap: {
    id: 0,
    price: 0,
  },
  delivery: {
    method: 'DEPARTMENT',
    price: 0,
    region: '',
    area: '',
    locality: '',
    street: '',
    house: '',
    building: '',
    frontDoor: '',
    flat: '',
  },
  paymentMethod: 'CARD',
};
