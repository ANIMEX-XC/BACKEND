import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ProductTransactionCategory } from './transactionCategoryModel'
import { ProductImageModel } from './productImageModel'
import { ProductRatingModel } from './productRatingModel'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductAttributes extends ZygoteAttributes {
  productId: number
  productUserId: number
  productName: string
  productDescription: string
  productTransactionCategoryId: number
  productImages: string
  productPrice: number
  productWeight: number
  productColors: string
  productSizes: string
}

type ProductCreationAttributes = Optional<ProductAttributes, 'productId'>

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {}

export const ProductModel = sequelize.define<ProductInstance>(
  'Product',
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
    productTransactionCategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productImages: {
      type: DataTypes.STRING,
      allowNull: true
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
    }
  },
  {
    tableName: 'product',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)

// Relationships
ProductModel.belongsTo(ProductTransactionCategory, {
  foreignKey: 'productTransactionCategoryId',
  as: 'transactionCategory'
})
ProductModel.hasMany(ProductImageModel, {
  foreignKey: 'productImageProductId',
  as: 'images'
})
ProductModel.hasMany(ProductRatingModel, {
  foreignKey: 'productRattingProductId',
  as: 'ratings'
})
