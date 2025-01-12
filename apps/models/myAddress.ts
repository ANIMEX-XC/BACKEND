/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface MyAddressesAttributes extends ZygoteAttributes {
  myAddressId: string
  myAddressName: string
  myAddressKontak: string
  myAddressDetail: string
  myAddressPostalCode: string
  myAddressProvinsi: string
  myAddressKabupaten: string
  myAddressKecamatan: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type MyAddressesCreationAttributes = Optional<
  MyAddressesAttributes,
  'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface MyAddressesInstance
  extends Model<MyAddressesAttributes, MyAddressesCreationAttributes>,
    MyAddressesAttributes {}

export const MyAddressesModel = sequelize.define<MyAddressesInstance>(
  'my_addresses',
  {
    ...ZygoteModel,
    myAddressId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    myAddressName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressKontak: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressDetail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressPostalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressProvinsi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressKabupaten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    myAddressKecamatan: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'my_addresses',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
