import { DataTypes } from "sequelize";
import sequelizeConnection from "../config/config";

export const Categories = sequelizeConnection.define("category", {
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
 }, {});


 