import {
  getProductDescription,
  getProductPrice,
  getProductShippingFee,
  handleBuyProduct,
} from '../../services/productService';
import Product from '../../models/product';
import { getUserProfile } from '../../services/facebookService';
import { sendEmail } from '../../services/emailService';

jest.mock('../../models/Product');
jest.mock('../../services/facebookService');
jest.mock('../../services/emailService');

describe('Product Service', () => {
  describe('getProductDescription', () => {
    it('should return product description', async () => {
      const product = { description: 'A great product' };
      (Product.findOne as jest.Mock).mockResolvedValue(product);
      const description = await getProductDescription('1234');
      expect(description).toBe('A great product');
    });

    it('should throw error if product not found', async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);
      await expect(getProductDescription('1234')).rejects.toThrow('ProductNotFound');
    });
  });

  describe('getProductPrice', () => {
    it('should return product price', async () => {
      const product = { price: 29.99 };
      (Product.findOne as jest.Mock).mockResolvedValue(product);
      const price = await getProductPrice('1234');
      expect(price).toBe(29.99);
    });

    it('should throw error if product not found', async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);
      await expect(getProductPrice('1234')).rejects.toThrow('ProductNotFound');
    });
  });

  describe('getProductShippingFee', () => {
    it('should return product shipping fee', async () => {
      const product = { shipping: '5.00' };
      (Product.findOne as jest.Mock).mockResolvedValue(product);
      const shipping = await getProductShippingFee('1234');
      expect(shipping).toBe('5.00');
    });

    it('should throw error if product not found', async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);
      await expect(getProductShippingFee('1234')).rejects.toThrow('ProductNotFound');
    });
  });

  describe('handleBuyProduct', () => {
    it('should handle buying a product', async () => {
      const productDetails = { name: 'Test Product', price: 29.99, shipping: '5.00' };
      const userProfile = { name: 'John Doe' };
      (Product.findOne as jest.Mock).mockResolvedValue(productDetails);
      (getUserProfile as jest.Mock).mockResolvedValue(userProfile);
      (sendEmail as jest.Mock).mockResolvedValue({}); // Providing an empty object as a resolved value

      const response = await handleBuyProduct('1234', '1234');
      expect(response).toBe('Thank you for your purchase! We will process your order shortly.');
    });

    it('should throw error if product not found', async () => {
      (Product.findOne as jest.Mock).mockResolvedValue(null);
      await expect(handleBuyProduct('1234', '1234')).rejects.toThrow('ProductNotFound');
    });
  });
});
