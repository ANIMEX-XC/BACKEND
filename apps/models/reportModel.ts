import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

// Define ReportAttributes with new fields
export interface ReportAttributes extends ZygoteAttributes {
  reportId: number
  reportName: string
  reportSaldo: number // New field for saldo
  reportDescription: string // New field for description
}

// Define optional fields for creation
type ReportCreationAttributes = Optional<ReportAttributes, 'createdAt' | 'updatedAt'>

// Interface for the model instance
export interface ReportInstance
  extends Model<ReportAttributes, ReportCreationAttributes>,
    ReportAttributes {}

// Define the Report model
export const ReportModel = sequelize.define<ReportInstance>(
  'Report',
  {
    ...ZygoteModel,
    reportId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    reportName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportSaldo: {
      type: DataTypes.DECIMAL(10, 2), // Suitable for monetary values
      allowNull: false,
      defaultValue: 0.0 // Default saldo value
    },
    reportDescription: {
      type: DataTypes.TEXT,
      allowNull: true // Description can be optional
    }
  },
  {
    tableName: 'report', // Updated table name
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
