import { Product } from '@typings/models';
import { FetchStatus, LoadableData } from '@typings/common';

import { AppState, StoreDispatch } from '@store/store';

import { FETCH_STATUSES } from '@constants/common';
import { getProductList } from '@services/requests';

const SET_PENDING = 'SET_PRODUCT_LIST_PENDING';
const SET_FULFILLED = 'SET_PRODUCT_LIST_FULFILLED';
const SET_REJECTED = 'SET_PRODUCT_LIST_REJECTED';

const initialState = {
  data: [],
  status: FETCH_STATUSES.IDLE,
  error: null,
};

type SetPendingAction = {
  type: typeof SET_PENDING;
  status: FetchStatus;
};
type SetFulfilledAction = {
  type: typeof SET_FULFILLED;
  status: FetchStatus;
  data: Array<Product>;
};
type SetRejectedAction = {
  type: typeof SET_REJECTED;
  status: FetchStatus;
};

type ProductListAction =
  | SetPendingAction
  | SetFulfilledAction
  | SetRejectedAction;

function setProductListPending(): ProductListAction {
  return { type: SET_PENDING, status: FETCH_STATUSES.LOADING };
}

function setProductListFulfilled(data: Array<Product>): ProductListAction {
  return { type: SET_FULFILLED, status: FETCH_STATUSES.SUCCESS, data };
}

function setProductListRejected(): ProductListAction {
  return { type: SET_REJECTED, status: FETCH_STATUSES.FAILURE };
}

function productListReducer(
  state: LoadableData<Array<Product>> = initialState,
  action: ProductListAction
) {
  switch (action.type) {
    case SET_PENDING:
    case SET_REJECTED:
      return { ...state, status: action.status };
    case SET_FULFILLED:
      return { ...state, status: action.status, data: action.data };
    default:
      return state;
  }
}

export function getProductListThunk() {
  return async (dispatch: StoreDispatch, getState: () => AppState) => {
    const status = getState().productList.status;

    if (status === FETCH_STATUSES.SUCCESS) {
      return;
    }

    dispatch(setProductListPending());

    try {
      const response = await getProductList();
      console.log('resp products: ', response.data.length);
      dispatch(setProductListFulfilled(response.data));
    } catch (error) {
      dispatch(setProductListRejected());
    }
  };
}

export default productListReducer;
