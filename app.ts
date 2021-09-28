/**
 * Comandos usados para esta configuracion:
 * ./node_modules/.bin/tslint --init
 *  npm i typescript -S -D
 *  npm i tslint --save
 *  tsc 
 *  npm i --save --dev @types/express 
 * *  npm i --save --dev @types/cors
 *  
*/

import dotenv from 'dotenv'
import Server from './models/server'

// Dotenv
dotenv.config()

const server = new Server();

// server.routes();// no bueno
server.listen();


