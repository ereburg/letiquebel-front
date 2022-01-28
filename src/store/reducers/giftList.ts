import { FetchStatus, LoadableData } from '@typings/common';
import { Gift } from '@typings/models';

import { AppState, StoreDispatch } from '@store/store';

import { FETCH_STATUSES } from '@constants/common';
import { getGiftList } from '@services/requests';

const SET_PENDING = 'SET_GIFT_LIST_PENDING';
const SET_FULFILLED = 'SET_GIFT_LIST_FULFILLED';
const SET_REJECTED = 'SET_GIFT_LIST_REJECTED';

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
  data: Array<Gift>;
};
type SetRejectedAction = {
  type: typeof SET_REJECTED;
  status: FetchStatus;
};

type GiftListAction = SetPendingAction | SetFulfilledAction | SetRejectedAction;

function setGiftListPending(): GiftListAction {
  return { type: SET_PENDING, status: FETCH_STATUSES.LOADING };
}
function setGiftListFulfilled(data: Array<Gift>): GiftListAction {
  return { type: SET_FULFILLED, status: FETCH_STATUSES.SUCCESS, data };
}
function setGiftListRejected(): GiftListAction {
  return { type: SET_REJECTED, status: FETCH_STATUSES.FAILURE };
}

function giftListReducer(
  state: LoadableData<Array<Gift>> = initialState,
  action: GiftListAction
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

export function getGiftListThunk() {
  return async (dispatch: StoreDispatch, getState: () => AppState) => {
    const status = getState().giftList.status;

    if (status === FETCH_STATUSES.SUCCESS) {
      return;
    }

    dispatch(setGiftListPending());

    try {
      const response = await getGiftList();
      dispatch(setGiftListFulfilled(response.data));
    } catch (error) {
      dispatch(setGiftListRejected());
    }
  };
}

export default giftListReducer;
