import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { UserModel } from './user'
import { ZygoteAttributes, ZygoteModel } from './zygote'
import { SaleItemModel } from './saleItemModel'

export interface SaleAttributes extends ZygoteAttributes {
  saleId: number
  userId: number
  saleTotalAmount: number
  saleTax: number
  saleDiscount: number
  saleDeliveryCost: number
  saleCode: string
  saleDeliverCompanyName: string
  saleDeliverCompanyAddress: string
  salePlatformName: string
  salePaymentMethod: 'cash' | 'credit_card'
  salePo: string
  saleOrderStatus: 'waiting' | 'process' | 'cancel' | 'done'
}

type SaleCreationAttributes = Optional<SaleAttributes, 'createdAt' | 'updatedAt'>

export interface SaleInstance
  extends Model<SaleAttributes, SaleCreationAttributes>,
    SaleAttributes {}

export const SaleModel = sequelize.define<SaleInstance>(
  'Sale',
  {
    ...ZygoteModel,
    saleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'userId'
      }
    },
    saleTotalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    saleTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    saleDiscount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    },
    saleDeliveryCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    saleCode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    salePlatformName: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    saleDeliverCompanyName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    saleDeliverCompanyAddress: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    salePaymentMethod: {
      type: DataTypes.ENUM('cash', 'credit_card'),
      allowNull: true
    },
    salePo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    saleOrderStatus: {
      type: DataTypes.ENUM('waiting', 'process', 'cancel', 'done'),
      allowNull: true,
      defaultValue: 'waiting'
    }
  },
  {
    tableName: 'sales',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)

SaleModel.hasMany(SaleItemModel, {
  as: 'saleItems',
  foreignKey: 'saleId'
})
