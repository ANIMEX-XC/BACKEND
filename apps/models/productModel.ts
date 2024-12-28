import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'
import { ProductVariantModel } from './productVariantModel'

export interface ProductAttributes extends ZygoteAttributes {
  productId: number
  productName: string
  productCode: string
  productCategory: string
  productPrice: number
  productStockQuantity: number
  productImage: string
}

type ProductCreationAttributes = Optional<ProductAttributes, 'createdAt' | 'updatedAt'>

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
    productName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    productCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    productCategory: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    productImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    productStockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)

ProductModel.hasMany(ProductVariantModel, {
  foreignKey: 'productId',
  as: 'variants'
})

ProductVariantModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  as: 'product'
})
