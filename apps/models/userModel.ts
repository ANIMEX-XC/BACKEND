/* eslint-disable @typescript-eslint/indent */
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface UserAttributes extends ZygoteAttributes {
  userId: string
  userName: string
  userPassword: string
  userContact: string
  userRole: 'SuperAdmin' | 'Admin' | 'User'
  userLevel: 'Silver' | 'Gold' | 'Platinum'
}

// Specifying optional attributes for creation
type UserCreationAttributes = Optional<UserAttributes, 'createdAt' | 'updatedAt'>

// Extending Model with UserAttributes and UserCreationAttributes
export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

// Define the UserModel
export const UserModel = sequelize.define<UserInstance>(
  'Users',
  {
    ...ZygoteModel,
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userRole: {
      type: DataTypes.ENUM('SuperAdmin', 'Admin', 'User'),
      allowNull: false,
      defaultValue: 'user'
    },
    userLevel: {
      type: DataTypes.ENUM('Silver', 'Gold', 'Platinum'),
      allowNull: false,
      defaultValue: 'Silver'
    }
  },
  {
    tableName: 'users',
    timestamps: true, // Setting timestamps to true for createdAt and updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
    underscored: true, // Converts camelCase to snake_case for columns
    freezeTableName: true, // Disables plural table names
    engine: 'InnoDB'
  }
)
