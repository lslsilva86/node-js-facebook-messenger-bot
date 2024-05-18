import Product from '../models/Product';

export const getProductDescription = async (productId: string): Promise<string> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return product.description;
  } else {
    throw new Error('Product not found');
  }
};

export const getProductPrice = async (productId: string): Promise<number> => {
  const product = await Product.findOne({ where: { sku: productId } });
  console.log(product);
  if (product) {
    return product.price;
  } else {
    throw new Error('Product not found');
  }
};

export const getProductShippingFee = async (productId: string): Promise<string> => {
  const product = await Product.findOne({ where: { sku: productId } });
  if (product) {
    return product.shipping;
  } else {
    throw new Error('Product not found');
  }
};
