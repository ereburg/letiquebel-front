import { get, post } from '@services/api';
import {
  Collection,
  GlobalParams,
  Gift,
  Slide,
  Product,
  ProductType,
  ProductPackage,
  ProductCategory,
  ProductDetails,
  QuestionGroup,
  Shop,
  Order,
  OrderStatus,
  PaymentDetails,
  Promo,
} from '@typings/models';

export function getPromo(): Promise<{ data: Promo }> {
  return get({ path: '/promo' });
}

export function getGlobalParams(): Promise<{ data: GlobalParams }> {
  return get({ path: '/init' });
}

export function getGiftList(): Promise<Collection<Gift>> {
  return get({ path: '/gifts' });
}

export function getSliderList(): Promise<Collection<Slide>> {
  return get({ path: '/sliders' });
}

export function getProductList(
  categoryAlias?: string
): Promise<Collection<Product>> {
  const params = categoryAlias ? { category: categoryAlias } : undefined;
  return get({ path: '/products', params });
}

export function getProductSetList(): Promise<Collection<Product>> {
  return get({ path: '/products/sets' });
}

export function getProductDetails(
  productAlias: string
): Promise<Collection<ProductDetails>> {
  return get({
    path: `/products/${productAlias}`,
  });
}

export function getProductTypeList(): Promise<Collection<ProductType>> {
  return get({ path: '/types' });
}

export function getProductCategoryList(): Promise<Collection<ProductCategory>> {
  return get({ path: '/categories' });
}

export function getQuestionGroupList(): Promise<Array<QuestionGroup>> {
  return get({ path: '/faq' });
}

export function getShopList(): Promise<Collection<Shop>> {
  return get({ path: '/shops' });
}

export function getProductPackageList(): Promise<Collection<ProductPackage>> {
  return get({ path: '/wraps' });
}

export function checkoutOrder(body: Order): Promise<OrderStatus> {
  return post({ path: '/order', body });
}

export function getPaymentLink(orderId: string): Promise<PaymentDetails> {
  return get({ path: `/orders/${orderId}/pay` });
}

export function getPaymentStatus(orderId: string): Promise<PaymentDetails> {
  return get({ path: `/order/status/${orderId}` });
}
