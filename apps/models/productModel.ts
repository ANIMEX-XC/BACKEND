import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ProductImageModel } from './productImageModel'
import { ProductRatingModel } from './productRatingModel'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductAttributes extends ZygoteAttributes {
  productId: number
  productUserId: number
  productName: string
  productDescription: string
  productCategoryId: number
  productPrice: number
  productWeight: number
  productColors: string
  productSizes: string
  productTransactionType: 'Sell' | 'Auction' | 'Barter' | 'PurchaseOrder'
}

type ProductCreationAttributes = Optional<ProductAttributes, 'productId'>

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {}

export const ProductModel = sequelize.define<ProductInstance>(
  'Products',
  {
    ...ZygoteModel,
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    productCategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productColors: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productSizes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productTransactionType: {
      type: DataTypes.ENUM('Sell', 'Auction', 'Barter', 'PurchaseOrder'),
      allowNull: false,
      defaultValue: 'Sell'
    }
  },
  {
    tableName: 'products',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)

ProductModel.hasMany(ProductImageModel, {
  foreignKey: 'productImageProductId',
  as: 'images'
})

ProductModel.hasMany(ProductRatingModel, {
  foreignKey: 'productRatingProductId',
  as: 'ratings'
})
