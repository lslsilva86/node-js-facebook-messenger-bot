import Product from '../models/Product';
import { getUserProfile } from './facebookService';
import { sendEmail } from './emailService';

export const getProductDescription = async (productId: string): Promise<string> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return product.description;
  } else {
    throw new Error('ProductNotFound');
  }
};

export const getProductPrice = async (productId: string): Promise<number> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return product.price;
  } else {
    throw new Error('ProductNotFound');
  }
};

export const getProductShippingFee = async (productId: string): Promise<string> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return product.shipping;
  } else {
    throw new Error('ProductNotFound');
  }
};

export const getProductDetails = async (productId: string): Promise<any> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return {
      name: product.name,
      price: product.price,
      shipping: product.shipping,
    };
  } else {
    throw new Error('ProductNotFound');
  }
};

export const handleBuyProduct = async (senderPsid: string, productId: string): Promise<string> => {
  const productDetails = await getProductDetails(productId);
  const userProfile = await getUserProfile(senderPsid);
  const emailSubject = `New Order: ${productDetails.name}`;
  const emailText = `${userProfile.name} from Facebook Messenger wants to buy the following product:\n\nName: ${productDetails.name}\nPrice: $${productDetails.price}\nShipping Fee: ${productDetails.shipping}`;
  await sendEmail(emailSubject, emailText);
  return 'Thank you for your purchase! We will process your order shortly.';
};
