import express, { Application } from 'express';
// import * as userRoutes from '../routes/user'
import userRoutes from '../routes/user'
import cors from 'cors';

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();  
        this.port = process.env.PORT  || '6000'

        
        // Initial methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try{
            // await sequelize.authenticate();
            // console.log('Connection has been established successfully.');
            await db.authenticate();
            console.log('Database online!!')
        } catch( err) {
            throw new Error('Unable to connect to the database: ' + err);
        }
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port!!!!!!', this.port);
        });
    }

}

export default Server;  