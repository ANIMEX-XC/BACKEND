import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface UserKycAttributes extends ZygoteAttributes {
  userKycId: number
  userKycUserId: number
  userKycKtpImage: string
  userKycSelfieImage: string
  userKycRealName: string
  userKycAddress: string
  userKycDateOfBirth: Date
}

type UserKycCreationAttributes = Optional<UserKycAttributes, 'userKycId'>

export interface UserKycInstance
  extends Model<UserKycAttributes, UserKycCreationAttributes>,
    UserKycAttributes {}

export const UserKycModel = sequelize.define<UserKycInstance>(
  'UserKyc',
  {
    ...ZygoteModel,
    userKycId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    userKycUserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    userKycKtpImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userKycSelfieImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userKycRealName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userKycAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userKycDateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    tableName: 'user_kyc',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
