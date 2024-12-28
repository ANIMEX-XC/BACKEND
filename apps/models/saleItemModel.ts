import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { SaleModel } from './saleModel'
import { ProductModel } from './productModel'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface SaleItemAttributes extends ZygoteAttributes {
  saleItemId: number
  saleId: number
  productId: number
  saleItemQuantity: number
  saleItemPrice: number
  saleItemSubtotal?: number
}

type SaleItemCreationAttributes = Optional<SaleItemAttributes, 'createdAt' | 'updatedAt'>

export interface SaleItemInstance
  extends Model<SaleItemAttributes, SaleItemCreationAttributes>,
    SaleItemAttributes {}

export const SaleItemModel = sequelize.define<SaleItemInstance>(
  'SaleItem',
  {
    ...ZygoteModel,
    saleItemId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    saleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: SaleModel,
        key: 'saleId'
      }
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ProductModel,
        key: 'productId'
      }
    },
    saleItemQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saleItemPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    saleItemSubtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    tableName: 'sale_items',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)

SaleItemModel.belongsTo(ProductModel, {
  as: 'product',
  foreignKey: 'productId'
})
