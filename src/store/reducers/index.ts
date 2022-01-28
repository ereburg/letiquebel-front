import { combineReducers } from 'redux';

import globalParamsReducer from './globalParams';
import categoryListReducer from './categoryList';
import productListReducer from './products';
import giftListReducer from './giftList';
import promoReducer from './promo';
import cartReducer from './cart';

const rootReducer = combineReducers({
  globalParams: globalParamsReducer,
  categoryList: categoryListReducer,
  productList: productListReducer,
  giftList: giftListReducer,
  promo: promoReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
