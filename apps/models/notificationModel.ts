/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface NotificationAttributes extends ZygoteAttributes {
  notificationId: number
  notificationName: string
  notificationMessage: string
}

type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  'createdAt' | 'updatedAt'
>

interface NotificationInstance
  extends Model<NotificationAttributes, NotificationCreationAttributes>,
    NotificationAttributes {}

export const NotificationModel = sequelize.define<NotificationInstance>(
  'notifications',
  {
    ...ZygoteModel,
    notificationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    notificationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notificationMessage: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'notifications',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
