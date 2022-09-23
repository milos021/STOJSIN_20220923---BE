import { Sequelize } from "sequelize-typescript";

const sequelizeConnection = new Sequelize(
 'video-library',
 'root',
 'password',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

export default sequelizeConnection;

