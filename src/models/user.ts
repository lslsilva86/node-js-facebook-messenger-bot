import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/dbService';

class User extends Model {
  public id!: number;
  public senderId!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
