import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

// Dotenv
// dotenv.config()

const db = new Sequelize('node-mysql', 'root', 'GogE2885!!', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});
 
export default db;