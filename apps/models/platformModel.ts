import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface PlatformAttributes extends ZygoteAttributes {
  platformId: number
  platformName: string
}

type PlatformCreationAttributes = Optional<PlatformAttributes, 'createdAt' | 'updatedAt'>

export interface PlatformInstance
  extends Model<PlatformAttributes, PlatformCreationAttributes>,
    PlatformAttributes {}

export const PlatformModel = sequelize.define<PlatformInstance>(
  'Platform',
  {
    ...ZygoteModel,
    platformId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    platformName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'platform', // Updated table name
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
