import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'

export interface ProductCategoryAttributes {
  productCategoryId: number
  productCategoryName: string
}

type ProductCategoryCreationAttributes = Optional<
  ProductCategoryAttributes,
  'productCategoryId'
>

export interface ProductCategoryInstance
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>,
    ProductCategoryAttributes {}

export const ProductCategory = sequelize.define<ProductCategoryInstance>(
  'ProductCategory',
  {
    productCategoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productCategoryName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'product_categories',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
