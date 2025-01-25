import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductCategoryAttributes extends ZygoteAttributes {
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

export const ProductCategoryModel = sequelize.define<ProductCategoryInstance>(
  'ProductCategory',
  {
    ...ZygoteModel,
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
