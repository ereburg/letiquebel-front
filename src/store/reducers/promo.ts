import { Promo } from '@typings/models';
import { FetchStatus, LoadableData } from '@typings/common';
import { FETCH_STATUSES } from '@constants/common';
import { AppState, StoreDispatch } from '@store/store';
import { getPromo } from '@services/requests';

const SET_PENDING = 'SET_PROMO_PENDING';
const SET_FULFILLED = 'SET_PROMO_FULFILLED';
const SET_REJECTED = 'SET_PROMO_REJECTED';

const initialState: LoadableData<Promo> = {
  data: {} as Promo,
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
  data: Promo;
};
type SetRejectedAction = {
  type: typeof SET_REJECTED;
  status: FetchStatus;
};

type PromoAction = SetPendingAction | SetFulfilledAction | SetRejectedAction;

function setPromoPending(): PromoAction {
  return { type: SET_PENDING, status: FETCH_STATUSES.LOADING };
}
function setPromoFulfilled(data: Promo): PromoAction {
  return { type: SET_FULFILLED, status: FETCH_STATUSES.SUCCESS, data };
}
function setPromoRejected(): PromoAction {
  return { type: SET_REJECTED, status: FETCH_STATUSES.FAILURE };
}

function promoReducer(
  state: LoadableData<Promo> = initialState,
  action: PromoAction
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

export function getPromoThunk() {
  return async (dispatch: StoreDispatch, getState: () => AppState) => {
    const status = getState().promo.status;

    if (status === FETCH_STATUSES.SUCCESS) {
      return;
    }

    dispatch(setPromoPending());

    try {
      const response = await getPromo();
      dispatch(setPromoFulfilled(response.data));
    } catch (error) {
      dispatch(setPromoRejected());
    }
  };
}

export default promoReducer;
