import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/dbService';

class Product extends Model {
  public id!: number;
  public sku!: number;
  public name!: string;
  public type!: string;
  public price!: number;
  public upc!: string;
  public category!: JSON;
  public shipping!: string;
  public description!: string;
  public manufacturer!: string;
  public model!: string;
  public url!: string;
  public image!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    upc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    shipping: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false,
  }
);

export default Product;
