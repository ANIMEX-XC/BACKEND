/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AddressAttributes extends ZygoteAttributes {
  addressId: number
  addressUserId: number
  addressName: string
  addressContact: string
  addressDetail: string
  addressPostalCode: string
  addressProvinsi: string
  addressKabupaten: string
  addressKecamatan: string
}

type AddressCreationAttributes = Optional<AddressAttributes, 'createdAt' | 'updatedAt'>

interface AddressInstance
  extends Model<AddressAttributes, AddressCreationAttributes>,
    AddressAttributes {}

export const AddressModel = sequelize.define<AddressInstance>(
  'addresses',
  {
    ...ZygoteModel,
    addressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    addressUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    addressName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressDetail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressPostalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressProvinsi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressKabupaten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressKecamatan: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'addresses',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
