import { combineReducers } from 'redux';

import { Product, CartProduct, ProductDetails } from '@typings/models';
import { AppStore } from '@store/store';

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CHANGE_PRODUCT_AMOUNT = 'CHANGE_PRODUCT_AMOUNT';
const SET_CART_INITIALIZED = 'SET_CART_INITIALIZED';
const SET_CART_VISIBILITY = 'SET_CART_VISIBILITY';
const RESTORE_CART = 'RESTORE_CART';
const RESET_CART = 'RESET_CART';

const initialState: CartState = {
  isInitialized: false,
  isPreviewVisible: false,
  productList: [],
  totalPrice: 0,
};

export type CartState = {
  isInitialized: boolean;
  isPreviewVisible: boolean;
  productList: Array<CartProduct>;
  totalPrice: number;
};

type SetCartInitialized = {
  type: typeof SET_CART_INITIALIZED;
  value: boolean;
};
type SetCartVisibility = {
  type: typeof SET_CART_VISIBILITY;
  value: boolean;
};
type AddProduct = {
  type: typeof ADD_PRODUCT;
  product: Product | ProductDetails | CartProduct;
};
type RemoveProduct = {
  type: typeof REMOVE_PRODUCT;
  product: CartProduct;
};
type ChangeProductAmount = {
  type: typeof CHANGE_PRODUCT_AMOUNT;
  product: CartProduct;
  amount: number;
};
type RestoreCart = {
  type: typeof RESTORE_CART;
  data: CartState;
};
type ResetCart = {
  type: typeof RESET_CART;
};

type CartAction =
  | AddProduct
  | RemoveProduct
  | ChangeProductAmount
  | SetCartInitialized
  | SetCartVisibility
  | RestoreCart
  | ResetCart;

export function addProduct(
  product: Product | ProductDetails | CartProduct
): CartAction {
  return { type: ADD_PRODUCT, product };
}
export function removeProduct(product: CartProduct): CartAction {
  return { type: REMOVE_PRODUCT, product };
}
export function changeProductAmount(
  product: CartProduct,
  amount: number
): CartAction {
  return {
    type: CHANGE_PRODUCT_AMOUNT,
    product,
    amount,
  };
}
export function setCartInitialized(value: boolean): CartAction {
  return { type: SET_CART_INITIALIZED, value };
}
export function setCartVisibility(value: boolean): CartAction {
  return { type: SET_CART_VISIBILITY, value };
}
export function restoreCart(data: CartState): CartAction {
  return { type: RESTORE_CART, data };
}
export function resetCart(): CartAction {
  return { type: RESET_CART };
}

function setInitialized(
  state = initialState.isInitialized,
  action: CartAction
) {
  switch (action.type) {
    case SET_CART_INITIALIZED:
      return action.value;
    default:
      return state;
  }
}

function setPreviewVisibility(
  state = initialState.isPreviewVisible,
  action: CartAction
) {
  switch (action.type) {
    case SET_CART_VISIBILITY:
      return action.value;
    default:
      return state;
  }
}

function updateProductList(
  state: Array<CartProduct> = initialState.productList,
  action: CartAction
) {
  switch (action.type) {
    case ADD_PRODUCT:
      let sameProduct = null;
      const filteredState = state.filter((product) => {
        if (product.id !== action.product.id) return true;

        const amount = product.amount + 1;
        const price = product.discountPrice || product.price;
        const totalPrice = amount * price;
        sameProduct = { ...product, amount, totalPrice };

        return false;
      });

      return [
        ...filteredState,
        sameProduct ?? {
          id: action.product.id,
          link: action.product.link,
          title: action.product.title,
          file: action.product.file,
          price: action.product.price,
          discountPrice: action.product.discountPrice,
          totalPrice: action.product.discountPrice || action.product.price,
          amount: 1,
        },
      ];
    case REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case CHANGE_PRODUCT_AMOUNT:
      return state.map((product) => {
        if (product.id === action.product.id) {
          const price = product.discountPrice || product.price;
          const totalPrice = action.amount * price;
          const amount = action.amount;
          return { ...product, totalPrice, amount };
        }

        return product;
      });
    case RESTORE_CART:
      return [...action.data.productList];
    case RESET_CART:
      return [];
    default:
      return state;
  }
}

function updateTotalPrice(state = initialState.totalPrice, action: CartAction) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state + getProductPrice(action.product);
    case REMOVE_PRODUCT:
      return state - action.product.totalPrice;
    case CHANGE_PRODUCT_AMOUNT:
      const productPrice = getProductPrice(action.product);
      const productTotalPrice = productPrice * action.amount;

      return state - action.product.totalPrice + productTotalPrice;
    case RESTORE_CART:
      return action.data.totalPrice;
    case RESET_CART:
      return 0;
    default:
      return state;
  }
}

export function initCartAutoPersist(store: AppStore) {
  const localCartState = localStorage.getItem('cartState');

  try {
    if (localCartState) {
      const { data } = store.getState().productList;
      const parsedCartState = JSON.parse(localCartState);
      const localProductList = parsedCartState.productList;

      const resultProductList: Array<CartProduct> = [];
      let resultTotalPrice: number = 0;

      data.forEach((product) => {
        const targetProduct = localProductList.find(
          (localProduct: CartProduct) => localProduct.id === product.id
        );

        if (targetProduct && product.status !== 'SOLD OUT') {
          resultTotalPrice += getProductPrice(targetProduct);
          resultProductList.push(targetProduct);
        }
      });

      const resultCartState = {
        ...parsedCartState,
        productList: resultProductList,
        totalPrice: resultTotalPrice,
      };

      store.dispatch(restoreCart(resultCartState));
    }
  } catch (e) {}

  store.dispatch(setCartInitialized(true));

  let previousCartState: CartState;

  store.subscribe(() => {
    const currentCartState = store.getState().cart;

    if (previousCartState !== currentCartState) {
      const serializedCartState = JSON.stringify(currentCartState);
      localStorage.setItem('cartState', serializedCartState);
    }

    previousCartState = currentCartState;
  });
}

function getProductPrice(product: Product | ProductDetails | CartProduct) {
  return product.discountPrice || product.price;
}

export default combineReducers({
  isInitialized: setInitialized,
  isPreviewVisible: setPreviewVisibility,
  productList: updateProductList,
  totalPrice: updateTotalPrice,
});
