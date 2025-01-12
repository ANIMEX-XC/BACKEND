/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface NotificationAttributes extends ZygoteAttributes {
  notificationId: string
  notificationName: string
  notificationMessage: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface NotificationInstance
  extends Model<NotificationAttributes, NotificationCreationAttributes>,
    NotificationAttributes {}

export const NotificationModel = sequelize.define<NotificationInstance>(
  'notifications',
  {
    ...ZygoteModel,
    notificationId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
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
