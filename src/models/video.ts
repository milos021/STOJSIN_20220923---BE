import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/config";
import { Categories } from "./category";

export const Videos = sequelizeConnection.define("video", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Categories,
        key: 'id'
    }
    }
 });

 Categories.hasMany(Videos);
 Videos.belongsTo(Categories, { foreignKey: 'categoryId', onDelete: 'CASCADE' });