import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ProductModel } from './productModel'

export interface ProductImageAttributes {
  productImageId: number
  productImageProductId: number
  productImageUrl: string
}

type ProductImageCreationAttributes = Optional<ProductImageAttributes, 'productImageId'>

export interface ProductImageInstance
  extends Model<ProductImageAttributes, ProductImageCreationAttributes>,
    ProductImageAttributes {}

export const ProductImageModel = sequelize.define<ProductImageInstance>(
  'ProductImage',
  {
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

// Relationships
ProductImage.belongsTo(ProductModel, {
  foreignKey: 'productImageProductId',
  as: 'product'
})
