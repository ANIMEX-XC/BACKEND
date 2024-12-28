import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface CompanyCategoryAttributes extends ZygoteAttributes {
  companyId: number
  companyName: string
  companyAddress: string
}

type CompanyCreationAttributes = Optional<
  CompanyCategoryAttributes,
  'createdAt' | 'updatedAt'
>

export interface CompanyInstance
  extends Model<CompanyCategoryAttributes, CompanyCreationAttributes>,
    CompanyCategoryAttributes {}

export const CompanyModel = sequelize.define<CompanyInstance>(
  'Company',
  {
    ...ZygoteModel,
    companyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'company',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
