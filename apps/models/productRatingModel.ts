import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ProductModel } from './productModel'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface ProductRatingAttributes extends ZygoteAttributes {
  productRattingId: number
  productRattingUserId: number
  productRattingProductId: number
  productRattingStart: number
  productRattingDescription: string
}

type ProductRatingCreationAttributes = Optional<
  ProductRatingAttributes,
  'productRattingId'
>

export interface ProductRatingInstance
  extends Model<ProductRatingAttributes, ProductRatingCreationAttributes>,
    ProductRatingAttributes {}

export const ProductRatingModel = sequelize.define<ProductRatingInstance>(
  'ProductRating',
  {
    ...ZygoteModel,
    productRattingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productRattingUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productRattingProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productRattingStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productRattingDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'product_ratings',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)

// Relationships
ProductRating.belongsTo(ProductModel, {
  foreignKey: 'productRattingProductId',
  as: 'product'
})
