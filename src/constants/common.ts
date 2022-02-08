import { ConstantMap, FetchStatus } from '@typings/common';

export const FETCH_STATUSES: ConstantMap<FetchStatus> = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const ROUTES = {
  catalog: {
    label: 'Каталог',
    url: '/catalog',
  },
  shops: {
    label: 'Магазины',
    url: '/shops',
  },
  delivery: {
    label: 'Доставка и оплата',
    url: '/delivery',
  },
  faq: {
    label: 'FAQ',
    url: '/faq',
  },
  certs: {
    label: 'Сертификаты',
    url: '/certs',
  },
  checkout: {
    label: 'Оформление заказа',
    url: '/checkout',
  },
  userAgreement: {
    label: 'Пользовательское соглашение',
    url: '/user-agreement',
  },
  dataPolicy: {
    label: 'Политика обработки персональных данных',
    url: '/data-policy',
  },
};

export const DYNAMIC_ROUTES = {
  category: '/catalog/category',
  product: '/catalog',
};

export const CUSTOM_CATEGORIES: {
  [key: string]: { type: string; url: string };
} = {
  'letique-x-botanova': {
    type: 'botanovna',
    url: '/botanovna',
  },
  'letique-x-kristitheone': {
    type: 'kristitheone',
    url: '/kristitheone',
  },
};

export const MESSENGERS = {
  whatsapp: {
    label: 'whatsapp',
    url: 'https://wa.me/',
  },
  viber: {
    label: 'viber',
    url: 'viber://chat?number=',
  },
  telegram: {
    label: 'telegram',
    url: 'tg://resolve?domain=',
  },
};

export const DELIVERY = {
  department: {
    price: 4,
    name: 'DEPARTMENT',
    title: 'В отделение',
    description: '',
    actionLabel: 'Список отделений',
    actionLink: !process.env.REACT_APP_IS_DEMO_SHOP
      ? 'https://evropochta.by/about/offices/'
      : '/',
    isUnavailable: false,
  },
  door: {
    price: 6,
    name: 'DOOR_TO_DOOR',
    title: 'До двери',
    description: '',
    actionLabel: 'Проверить ваш адрес',
    actionLink: !process.env.REACT_APP_IS_DEMO_SHOP
      ? 'https://gipermall.by/about/delivery/#/dzone/'
      : '/',
    isUnavailable: false,
  },
};

export const PAYMENT = {
  card: {
    name: 'CARD',
    title: 'Картой',
    description:
      '<p>Оплата банковской картой после получения ссылки на оплату на электронную почту</p>',
    isUnavailable: false,
  },
  cash: {
    name: 'CASH',
    title: 'Наличными',
    description:
      '<p>Оплата наличными при получении заказа в отделении или курьером</p>',
    isUnavailable: !process.env.REACT_APP_IS_DEMO_SHOP,
  },
};
