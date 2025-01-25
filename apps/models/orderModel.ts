/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { ProductModel } from './productModel'

export interface OrdersAttributes extends ZygoteAttributes {
  orderId: number
  orderUserBuyerId: number
  orderUserOwnerId: number
  orderProductId: number
  orderProductPrice: number
  orderTotalProductPrice: number
  orderOngkirPrice: number
  orderTotalItem: number
  orderStatus: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel'
}

type OrdersCreationAttributes = Optional<OrdersAttributes, 'createdAt' | 'updatedAt'>

interface OrdersInstance
  extends Model<OrdersAttributes, OrdersCreationAttributes>,
    OrdersAttributes {}

export const OrdersModel = sequelize.define<OrdersInstance>(
  'orders',
  {
    ...ZygoteModel,
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    orderUserBuyerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    orderUserOwnerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    orderProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    orderProductPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    orderTotalProductPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    orderOngkirPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    orderTotalItem: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.ENUM('waiting', 'process', 'delivery', 'done', 'cancel'),
      allowNull: false,
      defaultValue: 'waiting'
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'orders',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)

OrdersModel.hasOne(ProductModel, {
  sourceKey: 'orderProductId',
  foreignKey: 'productId'
})
