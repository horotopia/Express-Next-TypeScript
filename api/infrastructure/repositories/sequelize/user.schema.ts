import { UserModel } from "./user.model";
import { User, UserRole } from "../../../domain";
import { DataTypes, Model, Sequelize, model } from "sequelize";


export class userSchema extends UserModel {
  readonly model: Model<UserModel>;

  constructor(sequelize: Sequelize) {
    super();
    this.model = model("users", userSchema);
    this.model.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: User.isValidPassword,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(UserRole),
        allowNull: false,
        defaultValue: UserRole.USER,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    });
  }
}