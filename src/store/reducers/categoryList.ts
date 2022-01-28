import { FetchStatus, LoadableData } from '@typings/common';
import { ProductCategory } from '@typings/models';

import { AppState, StoreDispatch } from '@store/store';

import { FETCH_STATUSES } from '@constants/common';
import { getProductCategoryList } from '@services/requests';

const SET_PENDING = 'SET_CATEGORY_LIST_PENDING';
const SET_FULFILLED = 'SET_CATEGORY_LIST_FULFILLED';
const SET_REJECTED = 'SET_CATEGORY_LIST_REJECTED';

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
  data: Array<ProductCategory>;
};
type SetRejectedAction = {
  type: typeof SET_REJECTED;
  status: FetchStatus;
};

type CategoryListAction =
  | SetPendingAction
  | SetFulfilledAction
  | SetRejectedAction;

function setCategoryListPending(): CategoryListAction {
  return { type: SET_PENDING, status: FETCH_STATUSES.LOADING };
}
function setCategoryListFulfilled(
  data: Array<ProductCategory>
): CategoryListAction {
  return { type: SET_FULFILLED, status: FETCH_STATUSES.SUCCESS, data };
}
function setCategoryListRejected(): CategoryListAction {
  return { type: SET_REJECTED, status: FETCH_STATUSES.FAILURE };
}

function categoryListReducer(
  state: LoadableData<Array<ProductCategory>> = initialState,
  action: CategoryListAction
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

export function getCategoryListThunk() {
  return async (dispatch: StoreDispatch, getState: () => AppState) => {
    const status = getState().categoryList.status;

    if (status === FETCH_STATUSES.SUCCESS) {
      return;
    }

    dispatch(setCategoryListPending());

    try {
      const response = await getProductCategoryList();
      dispatch(setCategoryListFulfilled(response.data));
    } catch (error) {
      dispatch(setCategoryListRejected());
    }
  };
}

export default categoryListReducer;
