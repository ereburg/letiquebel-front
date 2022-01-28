import { FetchStatus, LoadableData } from '@typings/common';
import { GlobalParams } from '@typings/models';

import { AppState, StoreDispatch } from '@store/store';

import { FETCH_STATUSES } from '@constants/common';
import { getGlobalParams } from '@services/requests';

const SET_PENDING = 'SET_GLOBAL_PARAMS_PENDING';
const SET_FULFILLED = 'SET_GLOBAL_PARAMS_FULFILLED';
const SET_REJECTED = 'SET_GLOBAL_PARAMS_REJECTED';

const initialState = {
  data: {
    doorDeliveryText: '',
    doorDeliveryCost: 0,
    minOrderPriceForDelivery: 0,
    officeDeliveryText: '',
    messageAfterOrder: '',
    currency: '',
    instagram: '',
    whatsapp: '',
    telegram: '',
    viber: '',
    email: '',
    phone: '',
  },
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
  data: GlobalParams;
};
type SetRejectedAction = {
  type: typeof SET_REJECTED;
  status: FetchStatus;
};

type GlobalParamsAction =
  | SetPendingAction
  | SetFulfilledAction
  | SetRejectedAction;

function setGlobalParamsPending(): GlobalParamsAction {
  return { type: SET_PENDING, status: FETCH_STATUSES.LOADING };
}
function setGlobalParamsFulfilled(data: GlobalParams): GlobalParamsAction {
  return { type: SET_FULFILLED, status: FETCH_STATUSES.SUCCESS, data };
}
function setGlobalParamsRejected(): GlobalParamsAction {
  return { type: SET_REJECTED, status: FETCH_STATUSES.FAILURE };
}

function globalParamsReducer(
  state: LoadableData<GlobalParams> = initialState,
  action: GlobalParamsAction
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

export function getGlobalParamsThunk() {
  return async (dispatch: StoreDispatch, getState: () => AppState) => {
    const status = getState().globalParams.status;

    if (status === FETCH_STATUSES.SUCCESS) {
      return;
    }

    dispatch(setGlobalParamsPending());

    try {
      const response = await getGlobalParams();
      dispatch(setGlobalParamsFulfilled(response.data));
    } catch (error) {
      dispatch(setGlobalParamsRejected());
    }
  };
}

export default globalParamsReducer;
