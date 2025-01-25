import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductImageAttributes extends ZygoteAttributes {
  productImageId: number
  productImageProductId: number
  productImageUrl: string
}

type ProductImageCreationAttributes = Optional<ProductImageAttributes, 'productImageId'>

export interface ProductImageInstance
  extends Model<ProductImageAttributes, ProductImageCreationAttributes>,
    ProductImageAttributes {}

export const ProductImageModel = sequelize.define<ProductImageInstance>(
  'ProductImages',
  {
    ...ZygoteModel,
    productImageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productImageProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productImageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'product_images',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
