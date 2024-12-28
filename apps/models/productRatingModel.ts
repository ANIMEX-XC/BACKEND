import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'
import { UserModel } from './user'

export interface ProductRatingAttributes extends ZygoteAttributes {
  productRatingId: number
  productRatingUserId: number
  productRatingProductId: number
  productRatingStart: number
  productRatingDescription: string
}

type ProductRatingCreationAttributes = Optional<
  ProductRatingAttributes,
  'productRatingId'
>

export interface ProductRatingInstance
  extends Model<ProductRatingAttributes, ProductRatingCreationAttributes>,
    ProductRatingAttributes {}

export const ProductRatingModel = sequelize.define<ProductRatingInstance>(
  'ProductRatings',
  {
    ...ZygoteModel,
    productRatingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    productRatingUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productRatingProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productRatingStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productRatingDescription: {
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

ProductRatingModel.belongsTo(UserModel, {
  foreignKey: 'productRatingUserId',
  as: 'user'
})

UserModel.hasOne(ProductRatingModel, {
  foreignKey: 'productRatingUserId',
  as: 'productRating'
})
