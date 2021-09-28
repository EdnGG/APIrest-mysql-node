"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
// Dotenv
dotenv_1.default.config();
const server = new server_1.default();
// server.routes();// no bueno
server.listen();
//# sourceMappingURL=app.js.map