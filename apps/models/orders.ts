/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { ProductModel } from './productModel'
import { UserModel } from './user'
import { MyAddressesModel } from './myAddress'

export interface OrdersAttributes extends ZygoteAttributes {
  orderId: string
  orderUserId: string
  orderProductId: string
  orderProductPrice: number
  orderTotalProductPrice: number
  orderOngkirPrice: number
  orderProductSizeSelected: string
  orderProductColorSelected: string
  orderTotalItem: number
  orderStatus: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel'
  orderTransferBankImage: number
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type OrdersCreationAttributes = Optional<OrdersAttributes, 'createdAt' | 'updatedAt'>

// We need to declare an interface for our model that is basically what our class would be

interface OrdersInstance
  extends Model<OrdersAttributes, OrdersCreationAttributes>,
    OrdersAttributes {}

export const OrdersModel = sequelize.define<OrdersInstance>(
  'orders',
  {
    ...ZygoteModel,
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    orderUserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderProductId: {
      type: DataTypes.STRING,
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
    orderProductSizeSelected: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    orderProductColorSelected: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    orderStatus: {
      type: DataTypes.ENUM('waiting', 'process', 'delivery', 'done', 'cancel'),
      allowNull: false,
      defaultValue: 'waiting'
    },
    orderTransferBankImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
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

OrdersModel.hasOne(UserModel, {
  sourceKey: 'orderUserId',
  foreignKey: 'userId'
})

OrdersModel.hasOne(MyAddressesModel, {
  sourceKey: 'orderUserId',
  foreignKey: 'addressUserId'
})
