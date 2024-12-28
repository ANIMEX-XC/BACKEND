import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductVariantAttributes extends ZygoteAttributes {
  variantId: number
  productId: number
  variantName: string
  variantPrice: number
  variantSize: string
  variantColor: string
  variantCategory: string
}

type ProductVariantCreationAttributes = Optional<
  ProductVariantAttributes,
  'createdAt' | 'updatedAt'
>

export interface ProductVariantInstance
  extends Model<ProductVariantAttributes, ProductVariantCreationAttributes>,
    ProductVariantAttributes {}

export const ProductVariantModel = sequelize.define<ProductVariantInstance>(
  'ProductVariant',
  {
    ...ZygoteModel,
    variantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      },
      onDelete: 'CASCADE'
    },
    variantName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    variantPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    variantSize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    variantColor: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    variantCategory: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  },
  {
    tableName: 'product_variants',
    timestamps: false,
    underscored: true,
    paranoid: true,
    freezeTableName: true
  }
)
